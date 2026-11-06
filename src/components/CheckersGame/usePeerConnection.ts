import { useCallback, useEffect, useRef, useState } from 'react';
import { Peer, type DataConnection } from 'peerjs';

export type PeerStatus = 'idle' | 'hosting' | 'connecting' | 'connected' | 'error';
export type PieceColor = 'white' | 'black';

export type PeerStateMessage = {
  type: 'state';
  gameState: Record<string, unknown>;
};

export type PeerColorMessage = {
  type: 'color';
  hostColor: PieceColor;
};

export type PeerMessage = PeerStateMessage | PeerColorMessage;

export function usePeerConnection() {
  const peerRef = useRef<Peer | null>(null);
  const connectionRef = useRef<DataConnection | null>(null);
  const onDataRef = useRef<((data: unknown) => void) | null>(null);
  const hostColorRef = useRef<PieceColor | null>(null);
  const [status, setStatus] = useState<PeerStatus>('idle');
  const [roomCode, setRoomCode] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const cleanup = useCallback(() => {
    connectionRef.current?.close();
    connectionRef.current = null;
    peerRef.current?.destroy();
    peerRef.current = null;
    hostColorRef.current = null;
    setStatus('idle');
    setRoomCode(null);
    setError(null);
  }, []);

  useEffect(() => () => cleanup(), [cleanup]);

  const bindConnection = useCallback((connection: DataConnection, asHost: boolean) => {
    connectionRef.current = connection;

    connection.on('open', () => {
      setStatus('connected');
      setError(null);
      if (asHost && hostColorRef.current) {
        const message: PeerColorMessage = { type: 'color', hostColor: hostColorRef.current };
        connection.send(message);
      }
    });

    connection.on('data', (data) => {
      onDataRef.current?.(data);
    });

    connection.on('close', () => {
      connectionRef.current = null;
      setStatus('idle');
      setRoomCode(null);
    });

    connection.on('error', (connectionError) => {
      setError(connectionError.message);
      setStatus('error');
    });
  }, []);

  const createRoom = useCallback((hostColor: PieceColor) => {
    cleanup();
    setError(null);
    setStatus('hosting');
    hostColorRef.current = hostColor;

    const peer = new Peer();
    peerRef.current = peer;

    peer.on('open', (id) => {
      setRoomCode(id);
    });

    peer.on('connection', (connection) => {
      bindConnection(connection, true);
    });

    peer.on('error', (peerError) => {
      setError(peerError.message);
      setStatus('error');
    });
  }, [bindConnection, cleanup]);

  const joinRoom = useCallback((code: string) => {
    const trimmed = code.trim();
    if (!trimmed) {
      return;
    }

    cleanup();
    setError(null);
    setStatus('connecting');
    setRoomCode(trimmed);

    const peer = new Peer();
    peerRef.current = peer;

    peer.on('open', () => {
      const connection = peer.connect(trimmed);
      bindConnection(connection, false);
    });

    peer.on('error', (peerError) => {
      setError(peerError.message);
      setStatus('error');
    });
  }, [bindConnection, cleanup]);

  const sendGameState = useCallback((gameState: Record<string, unknown>) => {
    const message: PeerStateMessage = { type: 'state', gameState };
    connectionRef.current?.send(message);
  }, []);

  const setOnData = useCallback((handler: ((data: unknown) => void) | null) => {
    onDataRef.current = handler;
  }, []);

  return {
    status,
    roomCode,
    error,
    connectionRef,
    createRoom,
    joinRoom,
    cleanup,
    sendGameState,
    setOnData,
  };
}
