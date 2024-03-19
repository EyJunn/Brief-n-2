const board = document.getElementById("board");
const players = ["player1", "player2"];
let currentPlayer = players[0];
let forme;

const endMessage = document.createElement("h2");
endMessage.textContent = `Player1's turn!`;
endMessage.style.marginTop = "30px";
endMessage.style.textAlign = "center";
board.after(endMessage);

const para = document.querySelector(".p1");
const para2 = document.querySelector(".p2");

para.addEventListener("click", updateName);
para2.addEventListener("click", updateName2);

function updateName() {
  const name = prompt("Enter a new name");
  para.textContent = `Player 1: ${name}`;
}

function updateName2() {
  const name = prompt("Enter a new name");
  para2.textContent = `Player 2: ${name}`;
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
    forme = document.createElement("div");
    forme.style.width = `${this.width}px`;
    forme.style.height = `${this.height}px`;
    forme.style.backgroundColor = this.color;
  }
}
let squares = document.querySelectorAll(".square");
squares.forEach((square) => {
  square.addEventListener(
    "click",
    (e) => {
      let carre = new Forme(60, 60, e.clientX, e.clientY, "purple");
      carre.display();
      square.appendChild(forme);
    },
    { once: true }
  );
});

const input = document.getElementById("restartButton");
input.addEventListener("click", restartButton);

function restartButton() {
  for (let i = 0; i < squares.length; i++) {
    squares[i].textContent = "";
  }
  endMessage.textContent = `Player1's turn!`;
  currentPlayer = players[0];
}

class Circle extends Forme {
  constructor(width, height, positionX, positionY, color, radius) {
    super(width, height, positionX, positionY, color, radius);
  }

  display() {
    super.display();
    let forme = document.createElement("div");
    forme.style.borderRadius = `${this.radius}px`;
  }
}

class Players {
  constructor(name, color) {
    this.name = name;
    this.color = color;
  }

  currentPlayer() {}
}
