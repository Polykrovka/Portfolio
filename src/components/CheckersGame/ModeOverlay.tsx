import { useEffect, useState } from 'react';
import { Button, Text, TextInput } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import actionButtonClasses from '../../styles/actionButton.module.css';
import styles from './CheckersGame.module.css';
import type { PeerStatus } from './usePeerConnection';

type OverlayScreen = 'menu' | 'multiplayer' | 'computer';

type ModeOverlayProps = {
  status: PeerStatus;
  roomCode: string | null;
  error: string | null;
  onSolo: () => void;
  onCreateRoom: () => void;
  onJoinRoom: (code: string) => void;
  onCleanup: () => void;
  onMultiplayerConnected: () => void;
};

export function ModeOverlay({
  status,
  roomCode,
  error,
  onSolo,
  onCreateRoom,
  onJoinRoom,
  onCleanup,
  onMultiplayerConnected,
}: ModeOverlayProps) {
  const { t } = useTranslation();
  const [screen, setScreen] = useState<OverlayScreen>('menu');
  const [joinCode, setJoinCode] = useState('');

  useEffect(() => {
    if (status === 'connected') {
      onMultiplayerConnected();
    }
  }, [status]); // overlay closes once when peer connects

  const openMultiplayer = () => {
    setScreen('multiplayer');
    onCreateRoom();
  };

  const goBackToMenu = () => {
    onCleanup();
    setJoinCode('');
    setScreen('menu');
  };

  const copyCode = async () => {
    if (!roomCode) {
      return;
    }
    await navigator.clipboard.writeText(roomCode);
  };

  return (
    <div className={styles.modeOverlay}>
      {screen === 'menu' && (
        <div className={styles.modeCard}>
          <Text className={styles.modeTitle}>{t('home.checkersModeTitle')}</Text>
          <Button className={actionButtonClasses.actionButton} onClick={onSolo}>
            {t('home.checkersModeSolo')}
          </Button>
          <Button className={actionButtonClasses.actionButton} onClick={openMultiplayer}>
            {t('home.checkersModeMultiplayer')}
          </Button>
          <Button className={actionButtonClasses.actionButton} onClick={() => setScreen('computer')}>
            {t('home.checkersModeComputer')}
          </Button>
        </div>
      )}

      {screen === 'multiplayer' && (
        <div className={styles.modeCard}>
          <Text className={styles.modeTitle}>{t('home.checkersModeMultiplayer')}</Text>
          <Text className={styles.modeMeta}>{t(`home.checkersPeerStatus.${status}`)}</Text>
          {roomCode && (
            <>
              <Text className={styles.modeCode}>{t('home.checkersRoomCode', { code: roomCode })}</Text>
              <Button className={actionButtonClasses.actionButton} onClick={copyCode}>
                {t('home.checkersCopyCode')}
              </Button>
            </>
          )}
          <TextInput
            value={joinCode}
            onChange={(event) => setJoinCode(event.currentTarget.value)}
            placeholder={t('home.checkersJoinPlaceholder')}
          />
          <Button
            className={actionButtonClasses.actionButton}
            onClick={() => onJoinRoom(joinCode)}
            disabled={!joinCode.trim()}
          >
            {t('home.checkersJoinRoom')}
          </Button>
          {error && <Text className={styles.modeError}>{error}</Text>}
          <Button className={actionButtonClasses.actionButton} onClick={goBackToMenu}>
            {t('home.checkersModeBack')}
          </Button>
        </div>
      )}

      {screen === 'computer' && (
        <div className={styles.modeCard}>
          <Text className={styles.modeTitle}>{t('home.checkersModeComputer')}</Text>
          <Text className={styles.modeMeta}>{t('home.checkersComputerSoon')}</Text>
          <Button className={actionButtonClasses.actionButton} onClick={() => setScreen('menu')}>
            {t('home.checkersModeBack')}
          </Button>
        </div>
      )}
    </div>
  );
}
