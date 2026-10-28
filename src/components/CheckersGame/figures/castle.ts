import { setActive, setCanGo, store } from "../data";

export default function handleCastle(e, color) {
  const data = store.getState().gameState;
  const colorAganst = color === 'black' ? 'white' : 'black';
  const cell = e.target.parentElement.id;
  const canGoIds: string[] = [];

  function ifOk(cellId, key) {
    if (!keys[key]) {
      return;
    }

    if (data[cellId]) {
      if (!data[cellId].figure) {
        canGoIds.push(cellId);
      } else if (data[cellId].figureColor === color) {
        keys[key] = false;
      } else if (data[cellId].figureColor === colorAganst) {
        canGoIds.push(cellId);
        keys[key] = false;
      }
    }
  }

  const keys = { k1: true, k2: true, k3: true, k4: true};
  for (let i = 1; i <= 7; i++) {
    ifOk(`${+cell[0] + i}${+cell[1]}`, 'k1')
    ifOk(`${+cell[0]}${+cell[1] + i}`, 'k2')
    ifOk(`${+cell[0]}${+cell[1] - i}`, 'k3')
    ifOk(`${+cell[0] - i}${+cell[1]}`, 'k4')
  }

  store.dispatch(setActive(cell));
  if (canGoIds.length) {
    store.dispatch(setCanGo(canGoIds));
  }
}
