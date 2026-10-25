'use client'; 
import styles from './field.module.scss'
import { useState, type Dispatch, type SetStateAction } from 'react';
import { useSelector } from 'react-redux';
import handleBlackPawn from '../figures/blackPawn';
import handleWhitePawn from '../figures/whitePawn';
import handleQueen from '../figures/queen';
import handleCastle from '../figures/castle';
import handleOfficer from '../figures/officer';
import handleKing from '../figures/king';
import handleHorse from '../figures/horse';
import type { RootState } from '../data';

type FieldProps = {
  isWhiteTurn: boolean;
  setIsWhiteTurn: Dispatch<SetStateAction<boolean>>;
};

export default function Field(props: FieldProps) {
  const { isWhiteTurn, setIsWhiteTurn } = props;
  console.log(isWhiteTurn)

  const gameState = useSelector((state: RootState) => state.gameState);
  
  const [activeElement, setActiveElement] = useState();
  const cellKeys = Object.keys(gameState);

  function removeCanGo() {
    for (let i of cellKeys) {
      gameState[i].canGo = false;
    }
  }

  
  function handleClick(e) {
    const id = e.target.id || e.target.parentElement.id;

    if (gameState[id] && gameState[id].canGo) {
      gameState[id].figure = activeElement.figure
      gameState[id].figureColor = activeElement.figureColor
      activeElement.figure = null;
      activeElement.figureColor = null;
      removeCanGo()

      if (activeElement) {
        activeElement.isActive = false;
        setActiveElement(null);
      }
      setIsWhiteTurn(!isWhiteTurn);
      return
    }

    if (activeElement) {
      activeElement.isActive = false;
      setActiveElement(null);
      removeCanGo()
    }
    
    if (isWhiteTurn) {
      if (e.target.className.includes('figure_whitePawn')) {
        handleWhitePawn(e)
        setActiveElement(gameState[id]);
      } else if (e.target.className.includes('figure_whiteQueen')) {
        handleQueen(e, 'white')
        setActiveElement(gameState[id]);
      } else if (e.target.className.includes('figure_whiteCastle')) {
        handleCastle(e, 'white')
        setActiveElement(gameState[id]);
      } else if (e.target.className.includes('figure_whiteKing')) {
        handleKing(e, 'white')
        setActiveElement(gameState[id]);
      } else if (e.target.className.includes('figure_whiteHorse')) {
        handleHorse(e, 'white')
        setActiveElement(gameState[id]);
      }
      else if (e.target.className.includes('figure_whiteOfficer')) {
        handleOfficer(e, 'white')
        setActiveElement(gameState[id]);
      }
    } else {
      if (e.target.className.includes('figure_blackPawn')) {
        handleBlackPawn(e)
        setActiveElement(gameState[id]);
      } else if (e.target.className.includes('figure_blackQueen')) {
        handleQueen(e, 'black')
        setActiveElement(gameState[id]);
      } else if (e.target.className.includes('figure_blackCastle')) {
        handleCastle(e, 'black')
        setActiveElement(gameState[id]);
      } else if (e.target.className.includes('figure_blackOfficer')) {
        handleOfficer(e, 'black')
        setActiveElement(gameState[id]);
      } else if (e.target.className.includes('figure_blackKing')) {
        handleKing(e, 'black')
        setActiveElement(gameState[id]);
      } else if (e.target.className.includes('figure_blackHorse')) {
        handleHorse(e, 'black')
        setActiveElement(gameState[id]);
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
