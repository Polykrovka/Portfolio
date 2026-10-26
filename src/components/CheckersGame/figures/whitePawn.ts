import { setActive, setCanGo, store } from "../data";

export default function handleWhitePawn(e) {
  const data = store.getState().gameState;
  const cell = e.target.parentElement.id;
  const nextStep = `${+cell[0] + 1}${cell[1]}`
  const doubleStep = `${+cell[0] + 2}${cell[1]}`
  const canFightLeft = `${+cell[0] + 1}${cell[1] - 1}`
  const canFightRight = `${+cell[0] + 1}${+cell[1] + 1}`

  const canGoIds: string[] = [];

  if (data[`${nextStep}`] && !data[`${nextStep}`].figure) {
    canGoIds.push(nextStep);
  }

  if (data[`${doubleStep}`] && !data[`${doubleStep}`].figure && cell[0] == 2) {
    canGoIds.push(doubleStep);
  }

  if (data[`${canFightLeft}`] && data[`${canFightLeft}`].figureColor === 'black') {
    canGoIds.push(canFightLeft);
  }
  if (data[`${canFightRight}`] && data[`${canFightRight}`].figureColor === 'black') {
    canGoIds.push(canFightRight);
  }

  store.dispatch(setActive(cell));
  if (canGoIds.length) {
    store.dispatch(setCanGo(canGoIds));
  }
}
