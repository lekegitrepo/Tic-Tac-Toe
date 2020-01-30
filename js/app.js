const gameBoard = (() => {
  const board = ['', '', '', '', '', '', '', '', ''];

  const setBoardTile = (index, value) => {
    if (board[index] === '') {
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
    } else if (!board.includes('')) {
      return false;
    }
  };

  const resetBoard = () => {
    return (board = ['', '', '', '', '', '', '', '', '']);
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
        parseInt(e.target.getAttribute('data-position')),
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
