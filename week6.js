// Event Handling Demo
const clickBtn = document.getElementById("click-btn");
const eventOutput = document.getElementById("event-output");
let clickCount = 0;

function handleButtonClick() {
  clickCount++;
  eventOutput.textContent = `Button clicked ${clickCount} time${
    clickCount === 1 ? "" : "s"
  }!`;
}

clickBtn.addEventListener("click", handleButtonClick);

//To do list
const addBtn = document.getElementById("add-btn");
const newItemInput = document.getElementById("new-item");
const itemList = document.getElementById("item-list");

function handleAddItem() {
  const text = newItemInput.value.trim();
  if (text) {
    const li = document.createElement("li");
    li.textContent = text;

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.className = "delete-btn";
    deleteBtn.addEventListener("click", handleDeleteItem);

    li.appendChild(deleteBtn);
    itemList.appendChild(li);
    newItemInput.value = "";
  }
}

function handleDeleteItem() {
  this.parentElement.remove();
}

function handleKeyPress(e) {
  if (e.key === "Enter") {
    addBtn.click();
  }
}

addBtn.addEventListener("click", handleAddItem);
newItemInput.addEventListener("keypress", handleKeyPress);

// Conditional Event Handling Demo
const interactiveBox = document.getElementById("interactive-box");
const conditionalOutput = document.getElementById("conditional-output");
let isShiftPressed = false;
let isCtrlPressed = false;

function handleKeyDown(e) {
  if (e.key === "Shift") isShiftPressed = true;
  if (e.key === "Control") isCtrlPressed = true;
  updateInteractiveState();
}

function handleKeyUp(e) {
  if (e.key === "Shift") isShiftPressed = false;
  if (e.key === "Control") isCtrlPressed = false;
  updateInteractiveState();
}

function handleMouseMove(e) {
  const rect = interactiveBox.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  const isLeft = x < rect.width / 2;
  const isTop = y < rect.height / 2;

  interactiveBox.style.backgroundColor = isLeft ? "#ffeb3b" : "#4caf50";
  interactiveBox.style.color = isTop ? "#000" : "#fff";

  updateInteractiveState();
}

function handleMouseLeave() {
  interactiveBox.style.backgroundColor = "";
  interactiveBox.style.color = "";
}

document.addEventListener("keydown", handleKeyDown);
document.addEventListener("keyup", handleKeyUp);
interactiveBox.addEventListener("mousemove", handleMouseMove);
interactiveBox.addEventListener("mouseleave", handleMouseLeave);

// Track key states
document.addEventListener("keydown", (e) => {
  if (e.key === "Shift") isShiftPressed = true;
  if (e.key === "Control") isCtrlPressed = true;
  updateInteractiveState();
});

document.addEventListener("keyup", (e) => {
  if (e.key === "Shift") isShiftPressed = false;
  if (e.key === "Control") isCtrlPressed = false;
  updateInteractiveState();
});

// Track mouse position relative to the box
interactiveBox.addEventListener("mousemove", (e) => {
  const rect = interactiveBox.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  // Calculate position zones
  const isLeft = x < rect.width / 2;
  const isTop = y < rect.height / 2;

  // Update box appearance based on mouse position
  interactiveBox.style.backgroundColor = isLeft ? "#ffeb3b" : "#4caf50";
  interactiveBox.style.color = isTop ? "#000" : "#fff";

  updateInteractiveState();
});

// Update the display based on current state
function updateInteractiveState() {
  const states = [];
  if (isShiftPressed) states.push("Shift is pressed");
  if (isCtrlPressed) states.push("Ctrl is pressed");

  const message =
    states.length > 0
      ? `Current state: ${states.join(" and ")}`
      : "Try moving your mouse and pressing Shift or Ctrl keys";

  conditionalOutput.textContent = message;
}

// Reset box state when mouse leaves
interactiveBox.addEventListener("mouseleave", () => {
  interactiveBox.style.backgroundColor = "";
  interactiveBox.style.color = "";
});

//TIC TAC TOE GAME

// Game state variables
let currentPlayer = "X";
let gameBoard = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;

// All possible winning combinations
const winningCombinations = [
  // Row combinations
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  // Columns combinations
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  // Diagonals
  [0, 4, 8],
  [2, 4, 6],
];

// Get DOM elements
const statusDisplay = document.getElementById("game-status");
const cells = [];
// Create an array of cell elements using a simple for loop
for (let i = 0; i < 9; i++) {
  cells[i] = document.getElementById(`cell-${i}`);
}

// Handle player moves
function handleCellClick(clickedCellIndex) {
  // Check if the cell is already taken or if game is over
  if (gameBoard[clickedCellIndex] !== "" || !gameActive) {
    return;
  }

  // Update the game board and display
  gameBoard[clickedCellIndex] = currentPlayer;
  cells[clickedCellIndex].textContent = currentPlayer;
  cells[clickedCellIndex].classList.add(currentPlayer.toLowerCase());
  console.log(gameBoard);

  // Check if current player has won
  if (checkWin()) {
    statusDisplay.textContent = `Player ${currentPlayer} wins!`;
    statusDisplay.style.color = "green";
    gameActive = false;
    return;
  }

  // Check if game is a draw
  if (checkDraw()) {
    statusDisplay.textContent = "Game ended in a draw!";
    statusDisplay.style.color = "grey";
    gameActive = false;
    return;
  }

  // Switch to the next player
  // if (currentPlayer === "X") {
  //   currentPlayer = "O";
  // } else {
  //   currentPlayer = "X";
  // }
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusDisplay.textContent = `Player ${currentPlayer}'s turn`;
}

// Check if the current player has won
function checkWin() {
  // Loop through all winning combinations
  for (let i = 0; i < winningCombinations.length; i++) {
    const [a, b, c] = winningCombinations[i];
    // Check if current player has all three positions in any winning combination
    if (
      gameBoard[a] === currentPlayer &&
      gameBoard[b] === currentPlayer &&
      gameBoard[c] === currentPlayer
    ) {
      return true;
    }
  }
  return false;
}

// Check if the game is a draw
function checkDraw() {
  // Loop through all cells to check if any are empty
  for (let i = 0; i < gameBoard.length; i++) {
    if (gameBoard[i] === "") {
      return false; // Found an empty cell, game is not a draw
    }
  }
  return true; // No empty cells found, game is a draw
}

// Reset the game to initial state
function resetGame() {
  currentPlayer = "X";
  gameActive = true;

  // Clear the game board array
  for (let i = 0; i < gameBoard.length; i++) {
    gameBoard[i] = "";
  }

  // Reset the display and cell styles
  statusDisplay.textContent = `Player ${currentPlayer}'s turn`;
  statusDisplay.style.color = "";

  // Clear all cell contents and remove X/O classes
  for (let i = 0; i < cells.length; i++) {
    cells[i].textContent = "";
    cells[i].classList.remove("x", "o");
  }
}

// Add click event listeners to all cells
for (let i = 0; i < cells.length; i++) {
  cells[i].addEventListener("click", function () {
    handleCellClick(i);
  });
}

// Add reset button functionality
const resetButton = document.getElementById("reset-game");
if (resetButton) {
  resetButton.addEventListener("click", resetGame);
}

// Set initial game status
statusDisplay.textContent = `Player ${currentPlayer}'s turn`;
