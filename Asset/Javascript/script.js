const board = document.getElementById("board");
const squares = document.getElementsByClassName("square");
const players = ["player1", "player2"];
let currentPlayer = players[0];

const endMessage = document.createElement("h2");
endMessage.textContent = `Player1's turn!`;
endMessage.style.marginTop = "30px";
endMessage.style.textAlign = "center";
board.after(endMessage);

const winning_combinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function restartButton() {
  for (let i = 0; i < squares.length; i++) {
    squares[i].textContent = "";
  }
  endMessage.textContent = `Player1's turn!`;
  currentPlayer = players[0];
}
