const container = document.getElementById("container");
const userInput = document.getElementById("size");
const createGridBtn = document.getElementById("createGrid");
const inputDiv = document.querySelector(".actions");

userInput.addEventListener("input", () => {
  userInput.value = userInput.value.replace(/[^0-9]/g, "");
});


let GRID_SIZE = 16;
let mode = "none"; 
let drawBtn, clearBtn, eraseBtn;



function createButton(id, text) {
  const btn = document.createElement("button");
  btn.id = id;
  btn.textContent = text;
  return btn;
}

function getRandomColor(alpha) {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}


function buildGrid(size) {
  container.innerHTML = "";
  container.style.border = "2px solid black";
  container.style.width = `${size * 30}px`;
  container.style.height = `${size * 30}px`;

  for (let i = 0; i < size * size; i++) {
    const square = document.createElement("div");
    square.classList.add("square");

    square.style.width = "30px";
    square.style.height = "30px";
    square.style.border = "1px solid #ccc";

    square.dataset.opacity = 0;

    square.addEventListener("mouseover", () => {
      if (mode === "draw") {
        let opacity = Number(square.dataset.opacity);
        opacity = Math.min(opacity + 0.1, 1);
        square.dataset.opacity = opacity;
        square.style.backgroundColor = getRandomColor(opacity);
      } 
      else if (mode === "erase") {
        square.style.backgroundColor = "";
        square.dataset.opacity = 0;
      }
    });

    container.appendChild(square);
  }
}


function setupButtons() {
  drawBtn?.remove();
  clearBtn?.remove();
  eraseBtn?.remove();

  drawBtn = createButton("drawGrid", "Draw");
  clearBtn = createButton("clearGrid", "Clear");
  eraseBtn = createButton("eraseGrid", "Erase");

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
      square.dataset.opacity = 0;
    });
  });
}


createGridBtn.addEventListener("click", () => {
  const val = Number(userInput.value);
  userInput.value = ""
  if (val < 1 || val > 100 || isNaN(val)) {
    alert("Grid size must be between 1 and 100");
    return;
  }

  GRID_SIZE = val;
  mode = "none";
  container.style.cursor = "default";

  buildGrid(GRID_SIZE);
});


setupButtons();
buildGrid(GRID_SIZE);
