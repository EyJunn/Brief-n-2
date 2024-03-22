const board = document.getElementById("board");
let forme;
let isPlayer1 = true;
let isfinish = true;
const win_combinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const gameBoard = [0, 0, 0, 0, 0, 0, 0, 0, 0];

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
    forme.style.borderTopLeftRadius = "25px solid transparent";
  }
}

class Circle extends Forme {
  constructor(width, height, positionX, positionY, color, radius) {
    super(width, height, positionX, positionY, color, radius);
    this.radius = radius;
  }

  display() {
    super.display();
    forme.style.borderRadius = this.radius;
  }
}

let squares = document.querySelectorAll(".square");
squares.forEach((square) => {
  square.addEventListener("click", (e) => {
    let number = parseInt(square.id.substring(6), 10);
    if (gameBoard[number] == 0) {
      if (isPlayer1 === true) {
        let cube = new Forme(50, 50, e.clientX, e.clientY, "purple");
        cube.display();
        square.appendChild(forme);

        gameBoard[number] = 1;
        if (checkWinCombination() == false) {
          isPlayer1 = false;
          endMessage.innerText = `Player 2's turn!`;
        }
      } else {
        let circle = new Circle(50, 50, e.clientX, e.clientY, "blue", "50px");
        circle.display();
        square.appendChild(forme);

        gameBoard[number] = 2;
        if (checkWinCombination() == false) {
          isPlayer1 = true;
          endMessage.innerText = `Player 1's turn!`;
        }
      }
    } else {
      alert("Cette case est déjà cochée");
    }

    function checkWinCombination() {
      console.log(gameBoard);
      for (let combi of win_combinations) {
        console.log(gameBoard[combi[0]], gameBoard[combi[1]]); // combi = [0,1,0]
        if (
          gameBoard[combi[0]] == gameBoard[combi[1]] &&
          gameBoard[combi[0]] == gameBoard[combi[2]] &&
          gameBoard[combi[0]] != 0
        ) {
          if (gameBoard[combi[0]] == 1) {
            endMessage.innerText = "Players 1 Won!";
          } else if (gameBoard[combi[0]] == 2) {
            endMessage.innerText = "Players 2 Won !";
          }
          return true;
        }
      }
      return false;
    }
  });
});

const input = document.getElementById("restartButton");
input.addEventListener("click", restartButton);

function restartButton() {
  for (let i = 0; i < squares.length; i++) {
    squares[i].textContent = "";
  }
  endMessage.textContent = `Player1's turn!`;
  for (let number = 0; number < gameBoard.length; number++) {
    gameBoard[number] = 0;
  }
  isPlayer1 = true;
}
