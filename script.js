const cells = document.querySelectorAll('.cell'); 
const message = document.getElementById('message');
const resetBtn = document.getElementById('reset');
const themeSelector = document.getElementById('theme');

let currentPlayer = 'X';
let board = Array(9).fill(null);
let gameOver = false;

// Sounds
const moveSound = new Audio('assets/images/sounds/move.mp3');
const winSound = new Audio('assets/images/sounds/win.mp3');
const drawSound = new Audio('assets/images/sounds/draw.mp3');

// Icons
const themeIcons = {
  nature: { X: 'assets/images/leaf.png', O: 'assets/images/flower.png' },
  candy: { X: 'assets/images/candy_x.png', O: 'assets/images/candy_o.png' },
  clay:  { X: 'assets/images/clay_x.png',  O: 'assets/images/clay_o.png'  },
};

let currentTheme = themeSelector.value;
document.body.className = currentTheme;

themeSelector.addEventListener('change', () => {
  currentTheme = themeSelector.value;
  document.body.className = currentTheme;
  updateBoardImages();
});

function updateBoardImages() {
  cells.forEach((cell, index) => {
    const val = board[index];
    if (val) {
      cell.style.backgroundImage = `url(${themeIcons[currentTheme][val]})`;
    } else {
      cell.style.backgroundImage = '';
    }
  });
}

function checkWin(player) {
  const wins = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
  ];
  for (let combo of wins) {
    if (combo.every(i => board[i] === player)) {
      return combo;
    }
  }
  return null;
}

function checkDraw() {
  return board.every(cell => cell !== null);
}

cells.forEach(cell => {
  cell.addEventListener('click', () => {
    const index = cell.dataset.index;

    if (board[index] || gameOver) return;

    board[index] = currentPlayer;
    cell.style.backgroundImage = `url(${themeIcons[currentTheme][currentPlayer]})`;

    moveSound.play().catch(() => {});

    const winCombo = checkWin(currentPlayer);
    if (winCombo) {
      message.textContent = `${currentPlayer} wins!`;
      winSound.play().catch(() => {});
      // Removed winning line effect
      gameOver = true;
    } else if (checkDraw()) {
      message.textContent = `It's a draw!`;
      drawSound.play().catch(() => {});
      gameOver = true;
    } else {
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
  });
});

resetBtn.addEventListener('click', () => {
  board = Array(9).fill(null);
  cells.forEach(cell => cell.style.backgroundImage = '');
  message.textContent = '';
  currentPlayer = 'X';
  gameOver = false;
});
