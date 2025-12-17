const container = document.getElementById("container");
const button = document.getElementById("createGrid");
const userInput = document.getElementById("size");

let GRID_SIZE = 16;

function getRandomColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
}

button.addEventListener("click", () => {
  const val = Number(userInput.value);

  if (val < 1 || val > 100) {
    alert("Grid size must be between 1 and 100");
    return;
  }

  GRID_SIZE = val;

  // clear old grid
  container.innerHTML = "";

  // resize container
  container.style.width = `${GRID_SIZE * 30}px`;
  container.style.height = `${GRID_SIZE * 30}px`;

  const TOTAL_SQUARES = GRID_SIZE * GRID_SIZE;

  for (let i = 0; i < TOTAL_SQUARES; i++) {
    const square = document.createElement("div");
    square.classList.add("square");

    square.style.width = "30px";
    square.style.height = "30px";

    square.addEventListener("mouseover", () => {
      square.style.backgroundColor = getRandomColor();
    });

    container.appendChild(square);
  }
});
