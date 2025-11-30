import "./style.css";

const c1 = 'hotpink';
const c2 = 'black';
const c3 = 'FloralWhite';
const hexSvg = `<svg viewBox="0 0 86.6 100"><polygon fill="${c1}" points="43.3,0 86.6,25 86.6,75 43.3,100 0,75 0,25" /></svg>`;


function addHexagons(count: number): void {
  const app = document.querySelector<HTMLDivElement>("#app");
  if (!app) throw new Error("Could not find app div");
  let html = '';
  for (let i = 0; i < count; i++) {
    html += hexSvg;
  }
  app.innerHTML = html;
}

addHexagons(5);