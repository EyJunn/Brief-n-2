const board = document.getElementById("board");
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
    const boardd = document.getElementById("board");
    let forme = document.createElement("div");
    forme.style.width = `${this.width}px`;
    forme.style.width = `${this.width}px`;
    forme.style.height = `${this.height}px`;
    forme.style.backgroundColor = this.color;
    forme.style.position = "absolute";
    forme.style.top = `${this.positionY - this.height / 2}px`;
    forme.style.left = `${this.positionX - this.width / 2}px`;
    boardd.appendChild(forme);
  }
}

let squares = document.querySelectorAll(".square");
squares.forEach((square) => {
  square.addEventListener(
    "click",
    (e) => {
      let carre = new Forme(60, 60, e.clientX, e.clientY, "purple");
      carre.display();
    },
    { once: true }
  );
});
