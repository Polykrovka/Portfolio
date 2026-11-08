'use client'; 
import styles from './field.module.scss'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import handleBlackPawn from '../figures/blackPawn';
import handleWhitePawn from '../figures/whitePawn';
import handleQueen from '../figures/queen';
import handleCastle from '../figures/castle';
import handleOfficer from '../figures/officer';
import handleKing from '../figures/king';
import handleHorse from '../figures/horse';
import { clearActive, movePiece, removeCanGo, setIsWhiteTurn, store, type RootState } from '../data';
import type { PieceClickEvent } from '../figures/pieceTypes';

type FieldProps = {
  localColor?: 'white' | 'black' | null;
  onLocalMove?: (gameState: RootState['gameState'], isWhiteTurn: boolean) => void;
};

export default function Field(props: FieldProps) {
  const { localColor = null, onLocalMove } = props;
  const dispatch = useDispatch();
  const gameState = useSelector((state: RootState) => state.gameState);
  const isWhiteTurn = useSelector((state: RootState) => state.isWhiteTurn);
  
  const [activeElement, setActiveElement] = useState<string | null>(null);
  const cellKeys = Object.keys(gameState);
  const isMyTurn =
    localColor === null ||
    (localColor === 'white' && isWhiteTurn) ||
    (localColor === 'black' && !isWhiteTurn);

  
  function handleClick(e: React.MouseEvent<HTMLDivElement>) {
    const target = e.target as HTMLElement;
    const id = target.id || target.parentElement?.id;
    if (!id) {
      return;
    }

    if (gameState[id] && gameState[id].canGo) {
      if (!isMyTurn || !activeElement) {
        return;
      }
      dispatch(movePiece({ from: activeElement, to: id }))
      dispatch(clearActive())
      dispatch(removeCanGo())
      const nextIsWhiteTurn = !isWhiteTurn;
      dispatch(setIsWhiteTurn(nextIsWhiteTurn));
      onLocalMove?.(store.getState().gameState, nextIsWhiteTurn);
      setActiveElement(null);
      return
    }

    if (!isMyTurn) {
      return;
    }

    if (activeElement) {
      setActiveElement(null);
      dispatch(clearActive())
      dispatch(removeCanGo())
    }
    
    const pieceEvent = { target } as PieceClickEvent;
    if (isWhiteTurn) {
      if (target.className.includes('figure_whitePawn')) {
        handleWhitePawn(pieceEvent)
        setActiveElement(id);
      } else if (target.className.includes('figure_whiteQueen')) {
        handleQueen(pieceEvent, 'white')
        setActiveElement(id);
      } else if (target.className.includes('figure_whiteCastle')) {
        handleCastle(pieceEvent, 'white')
        setActiveElement(id);
      } else if (target.className.includes('figure_whiteKing')) {
        handleKing(pieceEvent, 'white')
        setActiveElement(id);
      } else if (target.className.includes('figure_whiteHorse')) {
        handleHorse(pieceEvent, 'white')
        setActiveElement(id);
      }
      else if (target.className.includes('figure_whiteOfficer')) {
        handleOfficer(pieceEvent, 'white')
        setActiveElement(id);
      }
    } else {
      if (target.className.includes('figure_blackPawn')) {
        handleBlackPawn(pieceEvent)
        setActiveElement(id);
      } else if (target.className.includes('figure_blackQueen')) {
        handleQueen(pieceEvent, 'black')
        setActiveElement(id);
      } else if (target.className.includes('figure_blackCastle')) {
        handleCastle(pieceEvent, 'black')
        setActiveElement(id);
      } else if (target.className.includes('figure_blackOfficer')) {
        handleOfficer(pieceEvent, 'black')
        setActiveElement(id);
      } else if (target.className.includes('figure_blackKing')) {
        handleKing(pieceEvent, 'black')
        setActiveElement(id);
      } else if (target.className.includes('figure_blackHorse')) {
        handleHorse(pieceEvent, 'black')
        setActiveElement(id);
      } 
    }
    
    
  }

  return (
    <div className={styles.field} onClick={handleClick}>
      {cellKeys.map((key) => <div key={key} id={key} className={` ${styles.cell} ${styles[gameState[key].color]} ${gameState[key].isActive ? styles.activeFigure : ''} ${gameState[key].canGo ? styles.canGo : '' }`}>
        {gameState[key].figure && <div className={`${styles[`figure_${gameState[key].figure}`]} ${styles.figure}`}> </div> }
      </div>)}
    </div>
  )
}
