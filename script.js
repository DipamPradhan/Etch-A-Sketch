const container = document.getElementById("container");
const GRID_SIZE = 16; // 16 x 16 grid
const TOTAL_SQUARES = GRID_SIZE * GRID_SIZE;

for (let i = 0; i < TOTAL_SQUARES; i++) {
  const square = document.createElement("div");
  square.classList.add("square");
  container.appendChild(square);
}