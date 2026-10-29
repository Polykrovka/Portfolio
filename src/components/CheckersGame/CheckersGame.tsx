import { useEffect, useRef, useState } from 'react';
import { Button, Text } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import Field from './field/field';
import { ModeOverlay } from './ModeOverlay';
import actionButtonClasses from '../../styles/actionButton.module.css';
import styles from './CheckersGame.module.css';

export function CheckersGame() {
  const { t } = useTranslation();
  const [isWhiteTurn, setIsWhiteTurn] = useState(true);
  const [fullscreen, setFullscreen] = useState(false);
  const [modeOverlayOpen, setModeOverlayOpen] = useState(true);
  const rootRef = useRef<HTMLDivElement>(null);
  const side = t(isWhiteTurn ? 'home.checkersSideWhite' : 'home.checkersSideBlack');

  useEffect(() => {
    if (fullscreen) {
      rootRef.current?.focus();
    }
  }, [fullscreen]);

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
        <Field isWhiteTurn={isWhiteTurn} setIsWhiteTurn={setIsWhiteTurn} />
        {modeOverlayOpen && (
          <ModeOverlay
            onSolo={() => setModeOverlayOpen(false)}
            onMultiplayerConnected={() => setModeOverlayOpen(false)}
          />
        )}
      </div>
    </div>
  );
}
