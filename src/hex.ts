
// Hexagon geometry constants for pointy-top orientation
// Based on a perfect regular hexagon with height = 100 pixels
export const hexGeometry = {
  // Basic dimensions
  height: 100, // Total height of hexagon (point to point vertically)
  width: 86.6, // Total width of hexagon (flat to flat horizontally) = √3 × size

  // Key measurements
  size: 50, // Circumradius (center to vertex) = height / 2
  inradius: 43.3, // Apothem (center to side) = width / 2 = √3/2 × size

  // Grid spacing for hexagon tiling
  horiz: 86.6, // Horizontal distance between adjacent hexagon centers = width
  vert: 75, // Vertical distance between adjacent hexagon centers = 3/4 × height = 3/2 × size
} as const;

// Mathematical relationships:
// - height = 2 × size
// - width = √3 × size = 2 × inradius
// - horiz = width = √3 × size
// - vert = 3/4 × height = 3/2 × size
