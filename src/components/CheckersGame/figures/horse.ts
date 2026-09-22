import { data } from "../data";

export default function handleHorse(e, color) {
  const colorAganst = color === 'black' ? 'white' : 'black';
  const cell = e.target.parentElement.id;
  data[cell].isActive = true;

  function ifOk(cell) {

    if (data[cell]) {
      if (!data[cell].figure) {
        data[cell].canGo = true;
      }
      else if (data[cell].figureColor === colorAganst) {
        data[cell].canGo = true;
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
}