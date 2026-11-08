import { setActive, setCanGo, store } from "../data";
import type { PieceClickEvent, PieceColor } from "./pieceTypes";

export default function handleKing(e: PieceClickEvent, color: PieceColor) {
  const data = store.getState().gameState;
  const colorAganst = color === 'black' ? 'white' : 'black';
  const cell = e.target.parentElement.id;
  const canGoIds: string[] = [];

  function ifOk(cellId: string) {
    if (data[cellId]) {
      if (!data[cellId].figure) {
        canGoIds.push(cellId);
      } else if (data[cellId].figureColor === colorAganst) {
        canGoIds.push(cellId);
      }
    }
  }

  ifOk(`${+cell[0] + 1}${+cell[1] + 1}`)
  ifOk(`${+cell[0] + 1}${+cell[1] - 1}`)
  ifOk(`${+cell[0] + 1}${+cell[1]}`)
  ifOk(`${+cell[0]}${+cell[1] + 1}`)
  ifOk(`${+cell[0]}${+cell[1] - 1}`)
  ifOk(`${+cell[0] - 1}${+cell[1] + 1}`)
  ifOk(`${+cell[0] - 1}${+cell[1] - 1}`)
  ifOk(`${+cell[0] - 1}${+cell[1]}`)

  store.dispatch(setActive(cell));
  if (canGoIds.length) {
    store.dispatch(setCanGo(canGoIds));
  }
}
