import { data } from "../data";

export default function handleKing(e, color) {
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

  ifOk(`${+cell[0] + 1}${+cell[1] + 1}`)
  ifOk(`${+cell[0] + 1}${+cell[1] - 1}`)
  ifOk(`${+cell[0] + 1}${+cell[1]}`)
  ifOk(`${+cell[0]}${+cell[1] + 1}`)
  ifOk(`${+cell[0]}${+cell[1] - 1}`)
  ifOk(`${+cell[0] - 1}${+cell[1] + 1}`)
  ifOk(`${+cell[0] - 1}${+cell[1] - 1}`)
  ifOk(`${+cell[0] - 1}${+cell[1]}`)
}