const squares = document.getElementsByClassName("square");
const players = ["player1", "player2"];
let currentPlayer = players[0];

const endMessage = document.createElement("h2");
endMessage.textContent = `Player1's turn!`;
endMessage.style.marginTop = "30px";
endMessage.style.textAlign = "center";
board.after(endMessage);

function restartButton() {
  for (let i = 0; i < squares.length; i++) {
    squares[i].textContent = "";
  }
  endMessage.textContent = `Player1's turn!`;
  currentPlayer = players[0];
}

class Forme {
  constructor(width, height, positionX, positionY, color) {
    this.width = width;
    this.height = height;
    this.positionX = positionX;
    this.positionY = positionY;
    this.color = color;
  }

  display() {
    const board = document.getElementById("board");
    let forme = document.createElement("div");
  }
}
