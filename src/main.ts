import "./style.css";

const gridSize = 8;
const totalHexagons = gridSize * gridSize;

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
