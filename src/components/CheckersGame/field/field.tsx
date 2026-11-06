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

type FieldProps = {
  localColor?: 'white' | 'black' | null;
  onLocalMove?: (gameState: RootState['gameState'], isWhiteTurn: boolean) => void;
};

export default function Field(props: FieldProps) {
  const { localColor = null, onLocalMove } = props;
  const dispatch = useDispatch();
  const gameState = useSelector((state: RootState) => state.gameState);
  const isWhiteTurn = useSelector((state: RootState) => state.isWhiteTurn);
  
  const [activeElement, setActiveElement] = useState();
  const cellKeys = Object.keys(gameState);
  const isMyTurn =
    localColor === null ||
    (localColor === 'white' && isWhiteTurn) ||
    (localColor === 'black' && !isWhiteTurn);

  
  function handleClick(e) {
    const id = e.target.id || e.target.parentElement.id;

    if (gameState[id] && gameState[id].canGo) {
      if (!isMyTurn) {
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
    
    if (isWhiteTurn) {
      if (e.target.className.includes('figure_whitePawn')) {
        handleWhitePawn(e)
        setActiveElement(id);
      } else if (e.target.className.includes('figure_whiteQueen')) {
        handleQueen(e, 'white')
        setActiveElement(id);
      } else if (e.target.className.includes('figure_whiteCastle')) {
        handleCastle(e, 'white')
        setActiveElement(id);
      } else if (e.target.className.includes('figure_whiteKing')) {
        handleKing(e, 'white')
        setActiveElement(id);
      } else if (e.target.className.includes('figure_whiteHorse')) {
        handleHorse(e, 'white')
        setActiveElement(id);
      }
      else if (e.target.className.includes('figure_whiteOfficer')) {
        handleOfficer(e, 'white')
        setActiveElement(id);
      }
    } else {
      if (e.target.className.includes('figure_blackPawn')) {
        handleBlackPawn(e)
        setActiveElement(id);
      } else if (e.target.className.includes('figure_blackQueen')) {
        handleQueen(e, 'black')
        setActiveElement(id);
      } else if (e.target.className.includes('figure_blackCastle')) {
        handleCastle(e, 'black')
        setActiveElement(id);
      } else if (e.target.className.includes('figure_blackOfficer')) {
        handleOfficer(e, 'black')
        setActiveElement(id);
      } else if (e.target.className.includes('figure_blackKing')) {
        handleKing(e, 'black')
        setActiveElement(id);
      } else if (e.target.className.includes('figure_blackHorse')) {
        handleHorse(e, 'black')
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
