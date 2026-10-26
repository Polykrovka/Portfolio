'use client'; 
import styles from './field.module.scss'
import { useState, type Dispatch, type SetStateAction } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import handleBlackPawn from '../figures/blackPawn';
import handleWhitePawn from '../figures/whitePawn';
import handleQueen from '../figures/queen';
import handleCastle from '../figures/castle';
import handleOfficer from '../figures/officer';
import handleKing from '../figures/king';
import handleHorse from '../figures/horse';
import { clearActive, removeCanGo, type RootState } from '../data';

type FieldProps = {
  isWhiteTurn: boolean;
  setIsWhiteTurn: Dispatch<SetStateAction<boolean>>;
};

export default function Field(props: FieldProps) {
  const { isWhiteTurn, setIsWhiteTurn } = props;
  console.log(isWhiteTurn)

  const dispatch = useDispatch();
  const gameState = useSelector((state: RootState) => state.gameState);
  
  const [activeElement, setActiveElement] = useState();
  const cellKeys = Object.keys(gameState);

  
  function handleClick(e) {
    const id = e.target.id || e.target.parentElement.id;

    if (gameState[id] && gameState[id].canGo) {
      gameState[id].figure = activeElement.figure
      gameState[id].figureColor = activeElement.figureColor
      activeElement.figure = null;
      activeElement.figureColor = null;
      dispatch(clearActive())
      dispatch(removeCanGo())
      setActiveElement(null);
      setIsWhiteTurn(!isWhiteTurn);
      return
    }

    if (activeElement) {
      setActiveElement(null);
      dispatch(clearActive())
      dispatch(removeCanGo())
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
