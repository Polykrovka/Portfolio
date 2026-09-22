import { useState } from 'react';
import Field from './field/field';

export function CheckersGame() {
  const [isWhiteTurn, setIsWhiteTurn] = useState(true);

  return <Field isWhiteTurn={isWhiteTurn} setIsWhiteTurn={setIsWhiteTurn} />;
}
