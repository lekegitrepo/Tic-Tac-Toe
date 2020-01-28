const gameBoard = (() => {
  let board = ["", "", "", "", "", "", "", "", ""];

  const setBoardTile = (index, value) => {
    if (board[index] == "") {
      board[index] = value;
    }
  };

  const checkRows = () => {
    if (board[0] === board[1] && board[0] === board[2]) {
      return board[0];
    } else if (board[3] === board[4] && board[3] === board[5]) {
      return board[3];
    } else if (board[6] === board[7] && board[6] === board[8]) {
      return board[6];
    }
    return;
  };

  const checkColumns = () => {
    if (board[0] === board[3] && board[0] === board[6]) {
      return board[0];
    } else if (board[1] === board[4] && board[1] === board[7]) {
      return board[1];
    } else if (board[2] === board[5] && board[2] === board[8]) {
      return board[2];
    }
    return;
  };

  const checkDiagonals = () => {
    if (board[0] === board[4] && board[0] === board[8]) {
      return board[0];
    } else if (board[2] === board[4] && board[2] === board[6]) {
      return board[2];
    }
    return;
  };

  const checkWinPattern = () => {
    if (checkColumns()) {
      return checkColumns();
    } else if (checkRows()) {
      return checkRows();
    } else if (checkDiagonals()) {
      return checkDiagonals();
    }
  };

  const resetBoard = () => {
    return (board = ["", "", "", "", "", "", "", "", ""]);
  };

  return {
    resetBoard,
    checkDiagonals,
    checkColumns,
    checkRows,
    checkWinPattern,
    setBoardTile
  };
})();

const player = (name, token) => {
  const score = 0;
  return { name, token, score };
};

const gameManager = (player1, player2) => {
  let currentPlayer = player1;

  const roundSelector = () => {
    currentPlayer = currentPlayer === player1 ? player2 : player1;
    return currentPlayer;
  };

  const getCurrentPlayer = () => currentPlayer;

  const winner = winToken => {
    if (winToken) {
      if (winToken == player1.token) {
        console.log(
          `player1 has won ${player1.name} score: ${player1.playerScore}`
        );
        return player1.countScore();
      } else if (winToken == player2.token) {
        console.log(
          `player2 has won ${player2.name} score: ${player2.playerScore}`
        );
        return player2.countScore();
      }
    }
  };
  return { getCurrentPlayer, winner, roundSelector };
};

const ui = (() => {
  const tileMarker = (tile, token) => {
    if (tile.textContent == "") {
      tile.textContent = token;
    }
  };
  const clearBoard = tile => {
    tile.textContent = "";
  };
  return { tileMarker, clearBoard };
})();

function handleGame() {
  console.log("activate new buttons");
}

let player1 = document.getElementById("playerX");
let player2 = document.getElementById("playerO");
if (player1 == "" && player2 == "") {
  player1 = "playerX";
  player2 = "playerO";
} else if (player1 == "") {
  player1 = "playerX";
} else if (player2 == "") {
  player2 = "playerO";
}

function resetGame() {
  let tiles = document.getElementsByClassName("board-tile");
  [...tiles].forEach(tile => ui.clearBoard(tile));
  gameBoard.resetBoard();
  console.log("we have a winner we need to reset");
}
let menu = document.getElementById("game-menu");
let boardTiles = document.getElementById("board-game");
let playerName = document.getElementById("playerName");
let startBtn = document.getElementById("start-game");
let resetGameBtn = document.getElementById("resetGame");

let playerX = player(player1, "X");
let playerO = player(player2, "O");
let gm = gameManager(playerO, playerX);

startBtn.addEventListener("click", initializePlay);

function initializePlay() {
  playerName.style.display = "block";
  let uiString = `<p>PlayerX(${document.getElementById("playerX").value})</p>
  <p>PlayerO(${document.getElementById("playerO").value})</p>`;
  playerName.innerHTML += uiString;
  boardTiles.style.display = "block";
  boardTiles.addEventListener("click", e => {
    if (
      gameBoard.checkWinPattern() == "X" ||
      gameBoard.checkWinPattern() == "O"
    ) {
      boardTiles.removeEventListener("click", handleGame);
    } else {
      ui.tileMarker(e.target, gm.getCurrentPlayer().token);
      gameBoard.setBoardTile(
        parseInt(e.target.getAttribute("data-position")),
        gm.getCurrentPlayer().token
      );
      gm.roundSelector();
      if (gameBoard.checkWinPattern()) {
        console.log("we have a winner");
        if (gameBoard.checkWinPattern() == playerX.token) {
          winner.style.display = "block";
          winner.textContent = playerX.name;
          console.log(playerX.name);
        } else {
          winner.style.display = "block";
          winner.textContent = playerO.name;
          console.log(playerO.name);
        }
        resetGameBtn.style.display = "block";
        resetGameBtn.addEventListener("click", resetGame);
        boardTiles.removeEventListener("click", handleGame);
      }
    }
  });
  menu.style.display = "none";
}
