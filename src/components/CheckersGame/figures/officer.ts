import { data } from "../data";

export default function handleOfficer(e, color) {
  const colorAganst = color === 'black' ? 'white' : 'black';
  const cell = e.target.parentElement.id;
  data[cell].isActive = true;

  function ifOk(cell, key) {
    if (!keys[key]) {
      return;
    }

    if (data[cell]) {
      if (!data[cell].figure) {
        data[cell].canGo = true;
      }
      else if (data[cell].figureColor === color) {
        keys[key] = false;
      }
      else if (data[cell].figureColor === colorAganst) {
        data[cell].canGo = true;
        keys[key] = false;
      }

    }
  }

  const keys = { k1: true, k2: true, k3: true, k4: true}

  for (let i = 1; i <= 7; i++) {
    ifOk(`${+cell[0] + i}${+cell[1] + i}`, 'k1')
    ifOk(`${+cell[0] + i}${+cell[1] - i}`, 'k2')
    ifOk(`${+cell[0] - i}${+cell[1] + i}`, 'k3')
    ifOk(`${+cell[0] - i}${+cell[1] - i}`, 'k4')
  }
}