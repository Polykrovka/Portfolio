import { setActive, setCanGo, store } from "../data";

export default function handleHorse(e, color) {
  const data = store.getState().gameState;
  const colorAganst = color === 'black' ? 'white' : 'black';
  const cell = e.target.parentElement.id;
  const canGoIds: string[] = [];

  function ifOk(cellId) {
    if (data[cellId]) {
      if (!data[cellId].figure) {
        canGoIds.push(cellId);
      } else if (data[cellId].figureColor === colorAganst) {
        canGoIds.push(cellId);
      }
    }
  }

  ifOk(`${+cell[0] + 2}${+cell[1] + 1}`)
  ifOk(`${+cell[0] + 2}${+cell[1] - 1}`)
  ifOk(`${+cell[0] - 2}${+cell[1] - 1}`)
  ifOk(`${+cell[0] - 2}${+cell[1] + 1}`)
  ifOk(`${+cell[0] + 1}${+cell[1] + 2}`)
  ifOk(`${+cell[0] + 1}${+cell[1] - 2}`)
  ifOk(`${+cell[0] - 1}${+cell[1] + 2}`)
  ifOk(`${+cell[0] - 1}${+cell[1] - 2}`)

  store.dispatch(setActive(cell));
  if (canGoIds.length) {
    store.dispatch(setCanGo(canGoIds));
  }
}
