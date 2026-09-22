import { data } from "../data";

export default function handleBlackPawn(e) {
  const cell = e.target.parentElement.id;
  data[cell].isActive = true;
  const nextStep = `${cell[0] - 1}${cell[1]}`
  const doubleStep = `${cell[0] - 2}${cell[1]}`
  const canFightLeft = `${cell[0] - 1}${cell[1] - 1}`
  const canFightRight = `${cell[0] - 1}${+cell[1] + 1}`


  if (data[`${nextStep}`] && !data[`${nextStep}`].figure) {
    data[`${nextStep}`].canGo = true;
  }

  if (data[`${doubleStep}`] && !data[`${doubleStep}`].figure && cell[0] == 7) {
    data[`${doubleStep}`].canGo = true;
  }

  console.log(canFightLeft, data[`${canFightLeft}`])
  if (data[`${canFightLeft}`] && data[`${canFightLeft}`].figureColor === 'white') {
    data[`${canFightLeft}`].canGo = true;
  }
  // console.log(canFightRight)
  if (data[`${canFightRight}`] && data[`${canFightRight}`].figureColor === 'white') {
    data[`${canFightRight}`].canGo = true;
  }
}