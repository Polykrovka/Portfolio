import { useCallback, useEffect, useRef, useState } from 'react';
import { Peer, type DataConnection } from 'peerjs';

export type PeerStatus = 'idle' | 'hosting' | 'connecting' | 'connected' | 'error';

export function usePeerConnection() {
  const peerRef = useRef<Peer | null>(null);
  const connectionRef = useRef<DataConnection | null>(null);
  const [status, setStatus] = useState<PeerStatus>('idle');
  const [roomCode, setRoomCode] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const cleanup = useCallback(() => {
    connectionRef.current?.close();
    connectionRef.current = null;
    peerRef.current?.destroy();
    peerRef.current = null;
    setStatus('idle');
    setRoomCode(null);
    setError(null);
  }, []);

  useEffect(() => () => cleanup(), [cleanup]);

  const bindConnection = useCallback((connection: DataConnection) => {
    connectionRef.current = connection;

    connection.on('open', () => {
      setStatus('connected');
      setError(null);
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

  const createRoom = useCallback(() => {
    cleanup();
    setError(null);
    setStatus('hosting');

    const peer = new Peer();
    peerRef.current = peer;

    peer.on('open', (id) => {
      setRoomCode(id);
    });

    peer.on('connection', (connection) => {
      bindConnection(connection);
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
      bindConnection(connection);
    });

    peer.on('error', (peerError) => {
      setError(peerError.message);
      setStatus('error');
    });
  }, [bindConnection, cleanup]);

  return {
    status,
    roomCode,
    error,
    connectionRef,
    createRoom,
    joinRoom,
    cleanup,
  };
}
