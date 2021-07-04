import './index.scss';
import personWalk from './assets/Male-3-Walk.png';
import grassBcg from './assets/background/grass-2.jpg';

const canvas = document.querySelector('#game');

const canvasRect = canvas.getBoundingClientRect();

const gameAreaWidth = canvasRect.width;
const gameAreaHeight = canvasRect.height;

const ctx = canvas.getContext('2d');

// персонаж
const player = document.createElement('img');
player.src = personWalk;
const spriteW = 48;
const spriteH = 48;

// переменные для движения персонажа
const frames = 4;
let cycle = 0;
let framesCount = 0;
let pY = ((gameAreaHeight / 2 - spriteH) / 10).toFixed(0) * 10;
let pX = ((gameAreaWidth / 2 - spriteW / 2) / 10).toFixed(0) * 10;
let direction = 0;
let playerMoving = false;

// объект для управления клавиатурой
const arrowPressed = {
  up: false,
  down: false,
  left: false,
  right: false,
};

// переменные для управления мышью
let targetY = null;
let targetX = null;
let mouseClick = false;
let cursorClickRadius = null;
let deltaCursorClickRadius = null;

function playerMove() {
  framesCount += 1;
  if (framesCount !== 3) {
    cycle = framesCount;
  } else {
    cycle = 1;
  }
  cycle %= frames;
  if (framesCount === 4) {
    framesCount = 0;
  }
}
// отрисовка персонажа
function playerRender() {
  ctx.drawImage(player, cycle * spriteW, direction * spriteH, spriteW, spriteH, pX, pY, 48, 48);
}

// отрисовка карты
function mapRender() {
  canvas.style.background = `url(${grassBcg})`;

  const gradient = ctx.createLinearGradient(300, 0, 500, 0);
  gradient.addColorStop(0, 'rgb(223, 187, 0)');
  gradient.addColorStop(0.5, 'rgb(142, 139, 7)');
  gradient.addColorStop(1, 'rgb(206, 160, 23)');
  ctx.strokeStyle = gradient;
  ctx.lineWidth = 50;
  ctx.moveTo(400, -50);
  ctx.quadraticCurveTo(300, 50, 500, 700);
  ctx.filter = 'sepia(30%)';
  // ctx.arc(canvasRect.width / 5, canvasRect.height / 5, 100, 0, 2 * Math.PI);
  ctx.stroke();

  ctx.beginPath();
}

function mainRender() {
  mapRender();
  playerRender();
}

function keyDownHandler(e) {
  e.preventDefault();
  targetX = null;
  targetY = null;
  if (e.key === 'Down' || e.key === 'ArrowDown') {
    arrowPressed.down = true;
  }
  if (e.key === 'Up' || e.key === 'ArrowUp') {
    arrowPressed.up = true;
  }
  if (e.key === 'Left' || e.key === 'ArrowLeft') {
    arrowPressed.left = true;
  }
  if (e.key === 'Right' || e.key === 'ArrowRight') {
    arrowPressed.right = true;
  }
}

function keyUpHandler(e) {
  playerMoving = false;
  cycle = 1;
  if (e.key === 'Down' || e.key === 'ArrowDown') {
    arrowPressed.down = false;
  }
  if (e.key === 'Up' || e.key === 'ArrowUp') {
    arrowPressed.up = false;
  }
  if (e.key === 'Left' || e.key === 'ArrowLeft') {
    arrowPressed.left = false;
  }
  if (e.key === 'Right' || e.key === 'ArrowRight') {
    arrowPressed.right = false;
  }
}

function drawTargetCursorMove() {
  mouseClick = true;
  ctx.filter = 'none';
  ctx.clearRect(0, 0, gameAreaWidth, gameAreaHeight);
  ctx.beginPath();
  mainRender();

  cursorClickRadius += deltaCursorClickRadius;
  if (cursorClickRadius >= 15 || cursorClickRadius <= 5) {
    deltaCursorClickRadius *= -1;
  }
  ctx.strokeStyle = 'rgba(100, 50, 80, 0.5)';
  ctx.lineWidth = 5;

  ctx.arc(targetX, targetY, cursorClickRadius, 0, Math.PI * 2);
  ctx.stroke();

  if (pX <= targetX - 20 && pX >= targetX - 21 && pY <= targetY + 20 && pY >= targetY - 50) {
    ctx.clearRect(0, 0, gameAreaWidth, gameAreaHeight);
    ctx.beginPath();
    mainRender();
    mouseClick = false;

    playerMoving = false;
    cycle = 1;
    return;
  }

  requestAnimationFrame(drawTargetCursorMove);
}

function mouseLeftClickHandler(e) {
  playerMoving = true;
  cursorClickRadius = 5;
  deltaCursorClickRadius = 0.1;

  targetX = ((e.pageX - window.scrollX - canvas.getBoundingClientRect().left) / 10).toFixed(0) * 10;
  targetY = ((e.pageY - window.scrollY - canvas.getBoundingClientRect().top) / 10).toFixed(0) * 10;
  if (mouseClick === false) {
    drawTargetCursorMove(e);
  }
}

document.addEventListener('keydown', keyDownHandler);
document.addEventListener('keyup', keyUpHandler);

// Клик мышью
canvas.addEventListener('click', mouseLeftClickHandler);

player.addEventListener('load', () => {
  document.querySelector('#loading-status').style.display = 'none'; //! поменять

  // PlayGame -----------------------------------------------------------------------
  setInterval(() => {
    if (arrowPressed.down && pY < gameAreaHeight - spriteH) {
      direction = 0;
      pY += 10;
      playerMoving = true;
    }

    if (arrowPressed.up && pY > 0) {
      direction = 3;
      pY -= 10;
      playerMoving = true;
    }

    if (arrowPressed.left && pX > 0) {
      direction = 1;
      pX -= 10;
      playerMoving = true;
    }
    if (arrowPressed.right && pX < gameAreaWidth - spriteW) {
      direction = 2;
      pX += 10;
      playerMoving = true;
    }

    // Управление мышью

    if (targetY && pY > targetY - Math.round(spriteH / 10) * 10) {
      direction = 3;
      pY -= 10;
    }
    if (targetY && pY < targetY - Math.round(spriteH / 10) * 10) {
      direction = 0;
      pY += 10;
    }
    if (targetX && pX > targetX - Math.round(spriteW / 20) * 10) {
      direction = 1;
      pX -= 10;
    }
    if (targetX && pX < targetX - Math.round(spriteW / 20) * 10) {
      direction = 2;
      pX += 10;
    }

    // console.log(moving);
    if (playerMoving) {
      playerMove();
    }
    ctx.clearRect(0, 0, gameAreaWidth, gameAreaHeight);

    mainRender();
  }, 120);
});
