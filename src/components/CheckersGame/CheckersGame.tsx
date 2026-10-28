import { useState } from 'react';
import { Text } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import Field from './field/field';
import styles from './CheckersGame.module.css';

export function CheckersGame() {
  const { t } = useTranslation();
  const [isWhiteTurn, setIsWhiteTurn] = useState(true);
  const side = t(isWhiteTurn ? 'home.checkersSideWhite' : 'home.checkersSideBlack');

  return (
    <>
      <div className={styles.turn}>
        <Text className={styles.turnText} ta="center">
          {t('home.checkersTurn', { side })}
        </Text>
      </div>
      <Field isWhiteTurn={isWhiteTurn} setIsWhiteTurn={setIsWhiteTurn} />
    </>
  );
}
