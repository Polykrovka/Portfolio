import { useEffect, useRef, useState } from 'react';
import { Button, Text } from '@mantine/core';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import Field from './field/field';
import { ModeOverlay } from './ModeOverlay';
import { replaceGameState } from './data';
import {
  usePeerConnection,
  type PeerMessage,
  type PieceColor,
} from './usePeerConnection';
import actionButtonClasses from '../../styles/actionButton.module.css';
import styles from './CheckersGame.module.css';

export function CheckersGame() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [isWhiteTurn, setIsWhiteTurn] = useState(true);
  const [fullscreen, setFullscreen] = useState(false);
  const [modeOverlayOpen, setModeOverlayOpen] = useState(true);
  const [localColor, setLocalColor] = useState<PieceColor | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const {
    status,
    roomCode,
    error,
    createRoom,
    joinRoom,
    cleanup,
    sendGameState,
    setOnData,
  } = usePeerConnection();
  const side = t(isWhiteTurn ? 'home.checkersSideWhite' : 'home.checkersSideBlack');

  useEffect(() => {
    if (fullscreen) {
      rootRef.current?.focus();
    }
  }, [fullscreen]);

  useEffect(() => {
    setOnData((data) => {
      const message = data as PeerMessage;
      if (!message || !message.type) {
        return;
      }

      if (message.type === 'color') {
        setLocalColor(message.hostColor === 'white' ? 'black' : 'white');
        return;
      }

      if (message.type === 'state' && message.gameState) {
        dispatch(replaceGameState(message.gameState));
        setIsWhiteTurn((current) => !current);
      }
    });

    return () => setOnData(null);
  }, [dispatch, setOnData]);

  return (
    <div
      ref={rootRef}
      className={fullscreen ? styles.fullscreen : undefined}
      tabIndex={fullscreen ? -1 : undefined}
      onKeyDown={(event) => {
        if (fullscreen && event.key === 'Escape') {
          setFullscreen(false);
        }
      }}
    >
      <div className={styles.turn}>
        <Text className={styles.turnText}>
          {t('home.checkersTurn', { side })}
        </Text>
        <div className={styles.turnActions}>
          <Button
            className={actionButtonClasses.actionButton}
            onClick={() => setFullscreen((value) => !value)}
          >
            {fullscreen ? t('home.checkersExitFullscreen') : t('home.checkersFullscreen')}
          </Button>
        </div>
      </div>
      <div className={styles.board}>
        <Field
          isWhiteTurn={isWhiteTurn}
          setIsWhiteTurn={setIsWhiteTurn}
          localColor={status === 'connected' ? localColor : null}
          onLocalMove={status === 'connected' ? sendGameState : undefined}
        />
        {modeOverlayOpen && (
          <ModeOverlay
            status={status}
            roomCode={roomCode}
            error={error}
            onSolo={() => {
              cleanup();
              setLocalColor(null);
              setModeOverlayOpen(false);
            }}
            onCreateRoom={(hostColor) => {
              setLocalColor(hostColor);
              createRoom(hostColor);
            }}
            onJoinRoom={joinRoom}
            onCleanup={() => {
              cleanup();
              setLocalColor(null);
            }}
            onMultiplayerConnected={() => setModeOverlayOpen(false)}
          />
        )}
      </div>
    </div>
  );
}
