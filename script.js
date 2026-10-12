const WIN_LINES = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const boardEl = document.getElementById("board");
const statusEl = document.getElementById("status");
const resetEl = document.getElementById("reset");
const cells = [...document.querySelectorAll(".cell")];

let board = Array(9).fill(null);
let current = "X";
let over = false;

function winner() {
  for (const line of WIN_LINES) {
    const [a, b, c] = line;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { player: board[a], line };
    }
  }
  return null;
}

function render() {
  cells.forEach((cell, i) => {
    const mark = board[i];
    cell.textContent = mark ?? "";
    cell.classList.toggle("x", mark === "X");
    cell.classList.toggle("o", mark === "O");
    cell.disabled = over || Boolean(mark);
    cell.classList.remove("win");
  });

  const result = winner();
  if (result) {
    result.line.forEach((i) => cells[i].classList.add("win"));
    statusEl.textContent = `${result.player} wins`;
    return;
  }

  if (board.every(Boolean)) {
    statusEl.textContent = "Draw";
    return;
  }

  statusEl.textContent = `${current}'s turn`;
}

boardEl.addEventListener("click", (event) => {
  const cell = event.target.closest(".cell");
  if (!cell || over) return;

  const index = Number(cell.dataset.index);
  if (board[index]) return;

  board[index] = current;
  const result = winner();
  over = Boolean(result) || board.every(Boolean);
  if (!over) current = current === "X" ? "O" : "X";
  render();
});

resetEl.addEventListener("click", () => {
  board = Array(9).fill(null);
  current = "X";
  over = false;
  render();
});

render();
