let menu = document.getElementById('game-menu');

let startBtn = document.getElementById('start-game');
startBtn.addEventListener('click', initializePlay);

function initializePlay() {
    let boardTiles = document.getElementById('board-game');
    boardTiles.style.display = 'block';
    menu.style.display = 'none';
  }