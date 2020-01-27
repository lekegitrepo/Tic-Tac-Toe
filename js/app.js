const gameBoard = (() => {
    let board = ['', '', '', '', '', '', '', '', ''];
  
    const setBoardTile = (index, value) => {
      if (board[index] == ''){
        board[index] = value;
      }
    }
  
    const checkRows = () => {
      if (board[0] === board[1] && board[0] === board[2]) {
        return board[0];
      } else if (board[3] === board[4] && board[3] === board[5]) {
        return board[3];
      } else if (board[6] === board[7] && board[6] === board[8]) {
        return board[6];
      }
      return;
    }
  
    const checkColumns = () => {
      if (board[0] === board[3] && board[0] === board[6]) {
        return board[0];
      } else if (board[1] === board[4] && board[1] === board[7]) {
        return board[1];
      } else if (board[2] === board[5] && board[2] === board[8]) {
        return board[2];
      }
      return;
    }
  
    const checkDiagonals = () => {
      if (board[0] === board[4] && board[0] === board[8]) {
        return board[0];
      } else if (board[2] === board[4] && board[2] === board[6]) {
        return board[2];
      }
      return;
    }
  
    const checkWinPattern = () => {
      if(checkColumns()){
        return checkColumns();
      }else if(checkRows()){
        return checkRows();
      }else if(checkDiagonals()){
        return checkDiagonals()
      }
    }
  
    const resetBoard = () => {
      return board = ['', '', '', '', '', '', '', '', ''];
    }
  
    return {resetBoard, checkDiagonals, checkColumns, checkRows, checkWinPattern, setBoardTile};
  })();

let menu = document.getElementById('game-menu');

let startBtn = document.getElementById('start-game');
startBtn.addEventListener('click', initializePlay);

function initializePlay() {
    let boardTiles = document.getElementById('board-game');
    boardTiles.style.display = 'block';
    menu.style.display = 'none';
  }