import { getHexByAxial, getNeighborOffset, type AxialCoords } from "./hexagon";

const playerSvg = `<svg class="player" viewBox="0 0 100 100"><circle cx="50" cy="50" r="40" /></svg>`
let playerPosition: AxialCoords = { q: 2, r: 2 };

function renderPlayer(coords: AxialCoords): void {
  // Clear previous player
  document.querySelectorAll('.player').forEach(el => el.remove());
  
  const hex = getHexByAxial(coords);
  if (hex) {
    hex.innerHTML = playerSvg;
  }
}

function movePlayer(direction: string): void {
  const offset = getNeighborOffset(playerPosition.r, direction);
  const newPosition = {
    q: playerPosition.q + offset.dq,
    r: playerPosition.r + offset.dr,
  };
  
  // Check if the new position exists
  if (getHexByAxial(newPosition)) {
    playerPosition = newPosition;
    renderPlayer(playerPosition);
  }
}

// Keyboard controls
document.addEventListener('keydown', (e) => {
  switch (e.key.toLowerCase()) {
    case 'w':
      movePlayer('nw');
      break;
    case 'e':
      movePlayer('ne');
      break;
    case 'd':
      movePlayer('e');
      break;
    case 'a':
      movePlayer('w');
      break;
    case 'z':
      movePlayer('sw');
      break;
    case 'x':
      movePlayer('se');
      break;
  }
});

renderPlayer(playerPosition);