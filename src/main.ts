import { getHexByAxial, getNeighborOffset, type AxialCoords } from "./hexagon";
import { ger } from "./util";

const player = `<pre id='player'>@</pre>`;
let playerPosition: AxialCoords = { q: 3, r: 3 };

function renderPlayer(coords: AxialCoords): void {
  ger("player");
  const hex = getHexByAxial(coords);
  if (hex) hex.innerHTML = player;
}

function movePlayer(direction: string): void {
  const offset = getNeighborOffset(playerPosition.r, direction);
  const newPosition = {
    q: playerPosition.q + offset.dq,
    r: playerPosition.r + offset.dr,
  };

  if (getHexByAxial(newPosition)) {
    playerPosition = newPosition;
    renderPlayer(playerPosition);
  }
}

document.addEventListener("keydown", ({ key }) => {
  if (key === "q") movePlayer("nw");
  if (key === "e") movePlayer("ne");
  if (key === "d") movePlayer("e");
  if (key === "a") movePlayer("w");
  if (key === "z") movePlayer("sw");
  if (key === "c") movePlayer("se");
});

renderPlayer(playerPosition);
