// déclarations de variable et constante
const board = document.getElementById("board");
let forme;
let isPlayer1 = true;
let isFinish = false;
const input = document.getElementById("restartButton");
let squares = document.querySelectorAll(".square");

// déclaration de mon tableau de conditions de wictoire
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

// déclaration d'un tableau "vide", pour pouvoir calculer qui joue
const gameBoard = [0, 0, 0, 0, 0, 0, 0, 0, 0];

// déclaration de mon message de fin
const endMessage = document.createElement("h2");
endMessage.textContent = `Lemon's turn!`;
endMessage.style.marginTop = "30px";
endMessage.style.textAlign = "center";
board.after(endMessage);

//fonction de l'écran d'accueil, qui au click disparaît pour laisser place au jeu
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

// On créé une classe pour la première forme. avec une witdh, une height, des positions, une couleur et un border-radius
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

// création de la deuxième classe, qui est une extension de la première. Pour faire la deuxième forme avec les mêmes paramètres que la première forme.
class Circle extends Forme {
  constructor(width, height, positionX, positionY, color, radius) {
    super(width, height, positionX, positionY, color, radius);
  }

  display() {
    super.display();
    forme.style.borderRadius = this.radius;
  }
}

// installation d'un for each pour ajouter un addEventListener au click des div enfants du plateau de jeu. qui va jouer la fonction gamePlaying
squares.forEach((square) => {
  square.addEventListener("click", (e) => {
    gamePlaying(e, square);
  });
});

// fonction gamePlaying qui vérifie si le jeu est finis, sinon, il lance le tour des jours coup après coup, en posant les formes des joueurs et vérifie la fonction checkWinCombination.
// il y a une alert si jamais une case coché est de nouveau cliquée.
function gamePlaying(e, square) {
  if (!isFinish) {
    let number = parseInt(square.id.substring(6), 10);
    if (gameBoard[number] == 0) {
      if (isPlayer1 === true) {
        let cube = new Forme(50, 50, e.clientX, e.clientY, "yellow", "5px");
        cube.display();
        square.appendChild(forme);
        //si le joueur 1 clique, il change la valeur du tableau gameBoard, par un 1
        gameBoard[number] = 1;

        if (checkWinCombination() == false) {
          isPlayer1 = false;
          endMessage.innerText = `Orange's turn!`;
        }
      } else {
        let circle = new Circle(50, 50, e.clientX, e.clientY, "orange", "50px");
        circle.display();
        square.appendChild(forme);
        //Si le joueur 2 clique, il change la valeur du tableau gameBoard, par un 2
        gameBoard[number] = 2;

        if (checkWinCombination() == false) {
          isPlayer1 = true;
          endMessage.innerText = `Lemon's turn!`;
        }
      }
    } else {
      alert("This box is already checked");
    }

    // Fonction qui vérifie les conditions de victoire des joueurs. En vérifiant le tableau gameBoard pour voir le positionnement des joueurs. Ou si il y a un draw
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
        } else if (!gameBoard.includes(0)) {
          endMessage.innerText = `Draw !`;
          endGame();
          return true;
        }
      }
      return false;
    }
  }
}

//Ajout d'un EventListener au click pour l'input restart
input.addEventListener("click", restartButton);

// Fonction pour redémarrer le jeu au click, qui réinitialise les cases du jeu et redonne la main au joueur 1
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
}

//Fonction de fin du jeu, qui vérifie si un des trois messages de fin de jeu est écrit pour arrêter le jeu.
function endGame() {
  if (
    endMessage.innerText == "Lemon Won!" ||
    endMessage.innerText == "Orange Won!" ||
    endMessage.innerText == `Draw !`
  ) {
    isFinish = true;
  }
}
