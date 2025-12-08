import { getHexByAxial, getNeighborOffset, type AxialCoords } from "./hexagon";

const playerSvg = `<svg class="player" viewBox="0 0 100 100"><circle cx="50" cy="50" r="40" /></svg>`;
let playerPosition: AxialCoords = { q: 2, r: 2 };
let playerElement: SVGElement | null = null;
let playerCircle: SVGCircleElement | null = null;

function renderPlayer(coords: AxialCoords): void {
  const targetHex = getHexByAxial(coords);
  if (!targetHex) return;

  const container = document.querySelector<HTMLDivElement>(".container");
  if (!container) return;

  // If player doesn't exist yet, create it
  if (!playerElement) {
    container.insertAdjacentHTML("beforeend", playerSvg);
    playerElement = container.querySelector<SVGElement>(".player");
    playerCircle = playerElement?.querySelector<SVGCircleElement>("circle") || null;
  }

  if (!playerElement) return;

  // Get target hex center position relative to container
  const hexRect = targetHex.getBoundingClientRect();
  const containerRect = container.getBoundingClientRect();
  
  const centerX = hexRect.left - containerRect.left + hexRect.width / 2;
  const centerY = hexRect.top - containerRect.top + hexRect.height / 2;
  
  // Position player at hex center
  playerElement.style.left = `${centerX}px`;
  playerElement.style.top = `${centerY}px`;
  playerElement.style.transform = "translate(-50%, -50%)";
  
  // Update fill color based on hex
  if (playerCircle) {
    const hexColor = getComputedStyle(targetHex).getPropertyValue("--hex-color").trim();
    playerCircle.style.fill = hexColor || "hotpink";
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
document.addEventListener("keydown", (e) => {
  switch (e.key.toLowerCase()) {
    case "q":
      movePlayer("nw");
      break;
    case "e":
      movePlayer("ne");
      break;
    case "d":
      movePlayer("e");
      break;
    case "a":
      movePlayer("w");
      break;
    case "z":
      movePlayer("sw");
      break;
    case "c":
      movePlayer("se");
      break;
  }
});

renderPlayer(playerPosition);
