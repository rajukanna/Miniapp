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
const cells = [...boardEl.querySelectorAll(".cell")];
let board = Array(9).fill(null);
let current = "X";
let over = false;
function winner() {
  for (const [a, b, c] of WIN_LINES) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { mark: board[a], line: [a, b, c] };
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
    cell.setAttribute("aria-label", mark ? `Cell ${i + 1}, ${mark}` : `Cell ${i + 1}, empty`);
  });
}
function setStatus(text) {
  statusEl.textContent = text;
}
function play(index) {
  if (over || board[index]) return;
  board[index] = current;
  const result = winner();
  if (result) {
    over = true;
    result.line.forEach((i) => cells[i].classList.add("win"));
    setStatus(`${result.mark} wins`);
  } else if (board.every(Boolean)) {
    over = true;
    setStatus("Draw");
  } else {
    current = current === "X" ? "O" : "X";
    setStatus(`${current}'s turn`);
  }
  render();
}
function reset() {
  board = Array(9).fill(null);
  current = "X";
  over = false;
  cells.forEach((cell) => cell.classList.remove("win"));
  setStatus("X's turn");
  render();
}
boardEl.addEventListener("click", (event) => {
  const cell = event.target.closest(".cell");
  if (!cell) return;
  play(Number(cell.dataset.index));
});
resetEl.addEventListener("click", reset);
render();
