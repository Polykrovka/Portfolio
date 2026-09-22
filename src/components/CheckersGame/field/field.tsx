'use client'; 
import styles from './field.module.scss'
import { data } from '../data'
import { useState } from 'react';
import handleBlackPawn from '../figures/blackPawn';
import handleWhitePawn from '../figures/whitePawn';
import handleQueen from '../figures/queen';
import handleCastle from '../figures/castle';
import handleOfficer from '../figures/officer';
import handleKing from '../figures/king';
import handleHorse from '../figures/horse';

export default function Field(props) {
  const { isWhiteTurn, setIsWhiteTurn } = props;
  console.log(isWhiteTurn)
  
  const [activeElement, setActiveElement] = useState();
  const cellKeys = Object.keys(data);

  function removeCanGo() {
    for (let i of cellKeys) {
      data[i].canGo = false;
    }
  }

  
  function handleClick(e) {
    const id = e.target.id || e.target.parentElement.id;

    if (data[id] && data[id].canGo) {
      data[id].figure = activeElement.figure
      data[id].figureColor = activeElement.figureColor
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
        setActiveElement(data[id]);
      } else if (e.target.className.includes('figure_whiteQueen')) {
        handleQueen(e, 'white')
        setActiveElement(data[id]);
      } else if (e.target.className.includes('figure_whiteCastle')) {
        handleCastle(e, 'white')
        setActiveElement(data[id]);
      } else if (e.target.className.includes('figure_whiteKing')) {
        handleKing(e, 'white')
        setActiveElement(data[id]);
      } else if (e.target.className.includes('figure_whiteHorse')) {
        handleHorse(e, 'white')
        setActiveElement(data[id]);
      }
      else if (e.target.className.includes('figure_whiteOfficer')) {
        handleOfficer(e, 'white')
        setActiveElement(data[id]);
      }
    } else {
      if (e.target.className.includes('figure_blackPawn')) {
        handleBlackPawn(e)
        setActiveElement(data[id]);
      } else if (e.target.className.includes('figure_blackQueen')) {
        handleQueen(e, 'black')
        setActiveElement(data[id]);
      } else if (e.target.className.includes('figure_blackCastle')) {
        handleCastle(e, 'black')
        setActiveElement(data[id]);
      } else if (e.target.className.includes('figure_blackOfficer')) {
        handleOfficer(e, 'black')
        setActiveElement(data[id]);
      } else if (e.target.className.includes('figure_blackKing')) {
        handleKing(e, 'black')
        setActiveElement(data[id]);
      } else if (e.target.className.includes('figure_blackHorse')) {
        handleHorse(e, 'black')
        setActiveElement(data[id]);
      } 
    }
    
    
  }

  return (
    <div className={styles.field} onClick={handleClick}>
      {cellKeys.map((key) => <div key={key} id={key} className={` ${styles.cell} ${styles[data[key].color]} ${data[key].isActive ? styles.activeFigure : ''} ${data[key].canGo ? styles.canGo : '' }`}>
        {data[key].figure && <div className={`${styles[`figure_${data[key].figure}`]} ${styles.figure}`}> </div> }
      </div>)}
    </div>
  )
}
