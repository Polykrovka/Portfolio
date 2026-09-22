import { data } from "../data";

export default function handleWhitePawn(e) {
  const cell = e.target.parentElement.id;
  data[cell].isActive = true;
  const nextStep = `${+cell[0] + 1}${cell[1]}`
  const doubleStep = `${+cell[0] + 2}${cell[1]}`
  const canFightLeft = `${+cell[0] + 1}${cell[1] - 1}`
  const canFightRight = `${+cell[0] + 1}${+cell[1] + 1}`
  // consolelog(cell , nextStep);


  if (data[`${nextStep}`] && !data[`${nextStep}`].figure) {
    data[`${nextStep}`].canGo = true;
  }

  if (data[`${doubleStep}`] && !data[`${doubleStep}`].figure && cell[0] == 2) {
    data[`${doubleStep}`].canGo = true;
  }

  if (data[`${canFightLeft}`] && data[`${canFightLeft}`].figureColor === 'black') {
    data[`${canFightLeft}`].canGo = true;
  }
  console.log(canFightRight)
  if (data[`${canFightRight}`] && data[`${canFightRight}`].figureColor === 'black') {
    data[`${canFightRight}`].canGo = true;
  }
}