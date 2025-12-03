export interface AxialCoords {
  q: number;
  r: number;
}

// Hexagon neighbor directions for pointy-top, odd-r offset coordinates
// Reference: https://www.redblobgames.com/grids/hexagons/#neighbors-offset
export function getNeighborOffset(
  r: number,
  direction: string
): { dq: number; dr: number } {
  const isOddRow = r % 2 === 1;

  // For odd-r offset with pointy-top hexagons
  const directions: Record<string, { dq: number; dr: number }> = {
    e: { dq: 1, dr: 0 },
    w: { dq: -1, dr: 0 },
    ne: isOddRow ? { dq: 1, dr: -1 } : { dq: 0, dr: -1 },
    nw: isOddRow ? { dq: 0, dr: -1 } : { dq: -1, dr: -1 },
    se: isOddRow ? { dq: 1, dr: 1 } : { dq: 0, dr: 1 },
    sw: isOddRow ? { dq: 0, dr: 1 } : { dq: -1, dr: 1 },
  };

  return directions[direction];
}

export function getHexByAxial({ q, r }: AxialCoords): HTMLDivElement | null {
  return document.querySelector<HTMLDivElement>(
    `[data-q="${q}"][data-r="${r}"]`
  );
}
