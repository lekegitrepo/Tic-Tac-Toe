const gameBoard = (() => {
  let arrayTiles = ['', '', '', '', '', '', '', '', ''];

  const setBoardTile = (index, value) => {
    if (arrayTiles[index] === '') {
      arrayTiles[index] = value;
    }
  };

  const checkRows = (board = arrayTiles) => {
    let rows = false;
    if ((board[0] !== '') &&
      (board[0] === board[1] && board[0] === board[2])) {
      rows = board[0];
    } else if ((board[3] !== '') &&
      (board[3] === board[4] && board[3] === board[5])) {
      rows = board[3];
    } else if ((board[6] !== '') &&
      (board[6] === board[7] && board[6] === board[8])) {
      rows = board[6];
    }
    return rows;
  };

  const checkColumns = (board = arrayTiles) => {
    let columns = false;
    if ((board[0] !== '') &&
      (board[0] === board[3] && board[0] === board[6])) {
      columns = board[0];
    } else if ((board[1] !== '') &&
      (board[1] === board[4] && board[1] === board[7])) {
      columns = board[1];
    } else if ((board[2] !== '') &&
      (board[2] === board[5] && board[2] === board[8])) {
      columns = board[2];
    }
    return columns;
  };

  const checkDiagonals = (board = arrayTiles) => {
    let diagonal = false;
    if ((board[0] !== '') &&
      (board[0] === board[4] && board[0] === board[8])) {
      diagonal = board[0];
    } else if ((board[2] !== '') &&
      (board[2] === board[4] && board[2] === board[6])) {
      diagonal = board[2];
    }
    return diagonal;
  };

  const checkWinPattern = () => {
    let checkWin;
    if (checkColumns()) {
      checkWin = checkColumns();
    } else if (checkRows()) {
      checkWin = checkRows();
    } else if (checkDiagonals()) {
      checkWin = checkDiagonals();
    } else if (!arrayTiles.includes('')) {
      checkWin = false;
    }
    return checkWin;
  };

  const resetBoard = () => {
    arrayTiles = ['', '', '', '', '', '', '', '', ''];
    return arrayTiles;
  };

  return {
    resetBoard,
    checkDiagonals,
    checkColumns,
    checkRows,
    checkWinPattern,
    setBoardTile,
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
    let playerWin;
    if (winToken) {
      if (winToken === player1.token) {
        playerWin = player1;
      } else if (winToken === player2.token) {
        playerWin = player2;
      }
    }
    return playerWin;
  };
  return { getCurrentPlayer, winner, roundSelector };
};

const ui = (() => {
  const tileMarker = (tile, token) => {
    if (tile.textContent === '') {
      tile.textContent = token;
    }
  };
  const clearBoard = tile => {
    tile.textContent = '';
  };
  return { tileMarker, clearBoard };
})();

const menu = document.getElementById('game-menu');
const boardTiles = document.getElementById('board-game');

const startBtn = document.getElementById('start-game');
const resetGameBtn = document.getElementById('resetGame');

function resetGame() {
  const tiles = document.getElementsByClassName('board-tile');
  [...tiles].forEach(tile => ui.clearBoard(tile));
  gameBoard.resetBoard();
  winner.textContent = "";
}

const displayPlayerName = () => {
  const playerXname = document.getElementById('playerX').value;
  const playerOname = document.getElementById('playerO').value;
  const playerX = () => player(playerXname, 'X');
  const playerO = () => player(playerOname, 'O');

  return { playerO, playerX };
};

function playersName(playerXname, playerOname) {
  const playerName = document.getElementById('playerName');
  playerName.style.display = 'block';
  const uiString = `<p>PlayerX(${playerXname})</p>
  <p>PlayerO(${playerOname})</p>`;
  playerName.innerHTML += uiString;
}

function setGameStatus() {
  resetGameBtn.style.display = 'block';
  resetGameBtn.addEventListener('click', resetGame);
}

function winnerMessage(mssg) {
  const message = document.getElementById('winner');
  message.style.display = 'block';
  message.innerHTML = mssg;
  setTimeout(() => {
    message.innerHTML = '';
  }, 3000);
}


function initializePlay() {
  const display = displayPlayerName();
  playersName(display.playerX().name, display.playerO().name);
  const gm = gameManager(display.playerX(), display.playerO());
  boardTiles.style.display = 'block';
  boardTiles.addEventListener('click', e => {
    if (
      gameBoard.checkWinPattern() === 'X'
      || gameBoard.checkWinPattern() === 'O'
    ) {
      boardTiles.removeEventListener('click', setGameStatus());
    } else {
      ui.tileMarker(e.target, gm.getCurrentPlayer().token);
      gameBoard.setBoardTile(
        parseInt(e.target.getAttribute('data-position'), 10),
        gm.getCurrentPlayer().token,
      );
      gm.roundSelector();
      if (gameBoard.checkWinPattern()) {
        const name = `congratulations ${gm.winner(gameBoard.checkWinPattern()).name} you have won the game!`;
        winnerMessage(name);
        boardTiles.removeEventListener('click', setGameStatus());
      } else if (gameBoard.checkWinPattern() === false) {
        boardTiles.removeEventListener('click', setGameStatus());
        winnerMessage("It's a tie");
      }
    }
  });
  menu.style.display = 'none';
}

startBtn.addEventListener('click', initializePlay);
