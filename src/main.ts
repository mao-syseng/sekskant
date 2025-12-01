import "./style.css";

interface OffsetCoords {
  row: number;
  col: number;
}

interface AxialCoords {
  q: number;
  r: number;
}

const totalHexagons = 8 * 8 - 4; // 8 rows of 8 hexagons, minus 4 to account for the staggered layout

function addHexagons(count: number): void {
  const app = document.querySelector<HTMLDivElement>(".container");
  if (!app) throw new Error("Could not find app div");
  let html = "";
  for (let i = 0; i < count; i++) {
    html += document.createElement("div").outerHTML;
  }
  app.innerHTML = html;
}

addHexagons(totalHexagons);

// Offset coordinates: https://www.redblobgames.com/grids/hexagons/#coordinates-offset
function indexToHexOffset(index: number): OffsetCoords {
  const evenRowCols = 8; // rows 0,2,4,6
  const oddRowCols = 7; // rows 1,3,5,7

  let row = 0;
  let remaining = index;

  // Determine which row the index falls into
  while (true) {
    const colsInRow = row % 2 === 0 ? evenRowCols : oddRowCols;
    if (remaining < colsInRow) break;
    remaining -= colsInRow;
    row++;
  }

  const col = remaining;

  return { row, col };
}

// Axial coordinates: https://www.redblobgames.com/grids/hexagons/#coordinates-axial
function offsetToAxial({ row, col }: OffsetCoords): AxialCoords {
  const q = col - ((row - (row & 1)) >> 1);
  const r = row;
  return { q, r };
}
