const container = document.getElementById("container");
const userInput = document.getElementById("size");
const createGrid = document.getElementById("createGrid")
const eraseGrid = document.getElementById("eraseGrid")
const inputDiv = document.querySelector(".input")

let GRID_SIZE = 16;

function createButton(id, text) {
  const btn = document.createElement("button");
  btn.id = id;
  btn.textContent = text;
  return btn;
}


function getRandomColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
}


let drawBtn, clearBtn, eraseBtn;
let mode = "none"

createGrid.addEventListener("click", () => {
  const val = Number(userInput.value);

  if (val < 1 || val > 100) {
    alert("Grid size must be between 1 and 100");
    return;
  }

  GRID_SIZE = val;

  // clear old grid
  container.innerHTML = "";
  container.style.border = "2px solid black";

  drawBtn?.remove()
  clearBtn?.remove()
  eraseBtn?.remove()

  drawBtn = createButton("drawGrid", "Draw");
  clearBtn = createButton("clearGrid", "Clear");
  eraseBtn = createButton("eraseGrid", "Erase");
  // resize container
  container.style.width = `${GRID_SIZE * 30}px`;
  container.style.height = `${GRID_SIZE * 30}px`;
  inputDiv.append(drawBtn, clearBtn, eraseBtn);



  drawBtn.addEventListener("click", () => {
    mode = "draw";
    container.style.cursor = "crosshair";
  });

  eraseBtn.addEventListener("click", () => {
    mode = "erase";
    container.style.cursor = "grabbing";
  });

  clearBtn.addEventListener("click", () => {
    mode = "none";
    container.style.cursor = "default";

    container.querySelectorAll(".square").forEach(square => {
      square.style.backgroundColor = "";
    });
  });



  const TOTAL_SQUARES = GRID_SIZE * GRID_SIZE;

  for (let i = 0; i < TOTAL_SQUARES; i++) {
    const square = document.createElement("div");
    square.classList.add("square");

    square.style.width = "30px";
    square.style.height = "30px";
    square.style.border = "1px solid #ccc"
    square.addEventListener("mouseover", () => {
      if (mode === "draw") {
        square.style.backgroundColor = getRandomColor();
      }

      if (mode === "erase") {
        square.style.backgroundColor = "";
      }
    });

    container.appendChild(square);
  }
  
});



