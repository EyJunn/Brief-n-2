const board = document.getElementById("board");
let forme;
let isPlayer1 = true;
let isFinish = false;
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
endMessage.textContent = `Lemon's turn!`;
endMessage.style.marginTop = "30px";
endMessage.style.textAlign = "center";
board.after(endMessage);

function startGame() {
  let startScreen = document.querySelector(".startScreen");
  startScreen.addEventListener("click", () => {
    startScreen.style.transition = "1s";
    startScreen.style.opacity = 0;
    setTimeout(() => {
      startScreen.classList.add("hidden");
    }, 1000);
  });
}
startGame();
class Forme {
  constructor(width, height, positionX, positionY, color, radius) {
    this.width = width;
    this.height = height;
    this.positionX = positionX;
    this.positionY = positionY;
    this.color = color;
    this.radius = radius;
  }

  display() {
    forme = document.createElement("div");
    forme.style.width = `${this.width}px`;
    forme.style.height = `${this.height}px`;
    forme.style.backgroundColor = this.color;
    forme.style.borderTopLeftRadius = `30px`;
    forme.style.borderBottomRightRadius = `30px`;
  }
}

class Circle extends Forme {
  constructor(width, height, positionX, positionY, color, radius) {
    super(width, height, positionX, positionY, color, radius);
  }

  display() {
    super.display();
    forme.style.borderRadius = this.radius;
  }
}

let squares = document.querySelectorAll(".square");
squares.forEach((square) => {
  square.addEventListener("click", (e) => {
    gamePlaying(e, square);
  });
});

function gamePlaying(e, square) {
  if (!isFinish) {
    let number = parseInt(square.id.substring(6), 10);
    if (gameBoard[number] == 0) {
      if (isPlayer1 === true) {
        let cube = new Forme(50, 50, e.clientX, e.clientY, "yellow", "5px");
        cube.display();
        square.appendChild(forme);

        gameBoard[number] = 1;

        if (checkWinCombination() == false) {
          isPlayer1 = false;
          endMessage.innerText = `Orange's turn!`;
        }
      } else {
        let circle = new Circle(50, 50, e.clientX, e.clientY, "orange", "50px");
        circle.display();
        square.appendChild(forme);

        gameBoard[number] = 2;
        if (checkWinCombination() == false) {
          isPlayer1 = true;
          endMessage.innerText = `Lemon's turn!`;
        }
      }
    } else {
      alert("This box is already checked");
    }

    function checkWinCombination() {
      for (let combi of win_combinations) {
        // combi = [0,1,0]
        if (
          gameBoard[combi[0]] == gameBoard[combi[1]] &&
          gameBoard[combi[0]] == gameBoard[combi[2]] &&
          gameBoard[combi[0]] != 0
        ) {
          if (gameBoard[combi[0]] == 1) {
            endMessage.innerText = `Lemon Won!`;

            endGame();
          } else if (gameBoard[combi[0]] == 2) {
            endMessage.innerText = `Orange Won!`;
            endGame();
          }
          return true;
        }
      }
      return false;
    }
  }
}

const input = document.getElementById("restartButton");
input.addEventListener("click", restartButton);

function restartButton() {
  for (let i = 0; i < squares.length; i++) {
    squares[i].textContent = "";
  }
  endMessage.textContent = `Lemon's turn!`;
  for (let number = 0; number < gameBoard.length; number++) {
    gameBoard[number] = 0;
  }
  isPlayer1 = true;
  isFinish = false;
  ItsTie = 0;
}

function endGame() {
  if (
    endMessage.innerText == "Lemon Won!" ||
    endMessage.innerText == "Orange Won!"
  ) {
    isFinish = true;
  }
}
