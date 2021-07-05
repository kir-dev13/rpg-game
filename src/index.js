import './index.scss';
import personWalk from './assets/Male-3-Walk.png';
import grassBcg from './assets/background/grass-2.jpg';

const canvas = /** @type {HTMLCanvasElement} */ (document.getElementById('game'));

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

function playerMoveAnimation() {
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

let colorCircle = [160, 157, 157, 1];
let i = 0;
let delta = 1;
function getColor(colorArray) {
  const r = colorArray[0];
  const g = colorArray[1];
  const b = colorArray[2];
  const a = colorArray[3];

  // console.log(res);
  return `rgba(${r},${g},${b},${a})`;
}
// отрисовка карты
function mapRender() {
  i += 0.3 * delta;
  if (+i.toFixed(2) >= 10 || +i.toFixed(2) <= -10) {
    delta *= -1;
  }

  i = +i.toFixed(1);

  const coordsWaves = {
    x0: -50,
    y0: 490 + i,
  };

  canvas.style.background = `url(${grassBcg})`;

  // дорога
  let gradient = ctx.createLinearGradient(300, 0, 500, 0);
  gradient.addColorStop(0, 'rgb(223, 187, 0)');
  gradient.addColorStop(0.5, 'rgb(142, 139, 7)');
  gradient.addColorStop(1, 'rgb(206, 160, 23)');
  ctx.strokeStyle = gradient;
  ctx.lineWidth = 50;
  ctx.moveTo(400, -50);
  ctx.quadraticCurveTo(300, 50, 500, 700);
  ctx.stroke();
  ctx.beginPath();

  // круг

  ctx.lineWidth = 10;
  ctx.fillStyle = getColor(colorCircle);
  // ctx.fillStyle = 'grey';
  ctx.arc(200, 200, 30, 0, 2 * Math.PI);
  ctx.fill();
  ctx.beginPath();

  // песок
  ctx.lineWidth = 84;
  ctx.fillStyle = 'rgb(223, 187, 0)';
  ctx.strokeStyle = gradient;
  ctx.moveTo(-50, 520);
  ctx.quadraticCurveTo(150, 460, 300, 500);
  ctx.moveTo(250, 500);
  ctx.quadraticCurveTo(350, 500, 650, 530);
  ctx.stroke();
  ctx.beginPath();

  // вода
  gradient = ctx.createLinearGradient(0, 500, 0, 550);
  gradient.addColorStop(0, 'rgba(0, 120, 205, 0.7)');
  gradient.addColorStop(0.5, 'rgba(0, 90, 235, 0.9)');
  gradient.addColorStop(1, 'rgba(0, 0, 255, 1)');
  ctx.fillStyle = 'blue';
  ctx.strokeStyle = gradient;
  ctx.lineWidth = 64;
  ctx.fillRect(0, 530, 600, 90);
  ctx.moveTo(-50, 500 + i * 2);
  ctx.bezierCurveTo(150 + i * 30, 550 + i * 1.5, 300 + i * 30, 500 + i * 1.2, 630, 530 + i);
  ctx.stroke();
  ctx.beginPath();

  ctx.lineWidth = 6;
  ctx.strokeStyle = `rgba(255, 255, 255, ${0.1 - i * 0.03})`;
  ctx.moveTo(-50, 470 + i * 2);
  // prettier-ignore
  ctx.bezierCurveTo(
    150 + i * 30,
    520 + i * 1.5,
    300 + i * 30, 470 + i * 1.2,
    630,
    500 + i,
  );
  ctx.stroke();
  ctx.beginPath();

  ctx.lineWidth = 2;
  for (let j = 0; j <= 180; j += 10) {
    // coordsWaves.x0 += j;
    coordsWaves.y0 += j * 0.1;
    ctx.strokeStyle = `rgba(${150 - j}, ${150 - j}, 255 , ${0.1 + j * 0.005 + i * 0.005})`;
    ctx.moveTo(coordsWaves.x0, coordsWaves.y0 + j + i * 2 + i * j * 0.02);

    // prettier-ignore
    ctx.bezierCurveTo(
      coordsWaves.x0 + 200 + i * 30 + j,
      coordsWaves.y0 + 45 + i * 1.5 + j + i * j * 0.04,
      coordsWaves.x0 + 250 + i * 30 + j,
      coordsWaves.y0 - 5 + i * 1.2 + j + i * j * 0.05,
      coordsWaves.x0 + 680 + j,
      coordsWaves.y0 + 25 + i + j + i * j * 0.02,
    );
    ctx.stroke();
    ctx.beginPath();
  }
  // ctx.moveTo(-50, 475 + i * 1.8);
  // ctx.lineWidth = 3;
  // ctx.strokeStyle = 'rgba(150, 225, 255, 0.5)';
  // ctx.bezierCurveTo(150 + i * 30, 550 + i * 0.2 + i, 300 + i * 30, 460 + i, 630, 500 + i);
  // ctx.stroke();
  // ctx.beginPath();
}

function keyDownHandler(e) {
  // e.preventDefault();
  targetX = null;
  targetY = null;
  switch (e.key) {
    case 'Down':
    case 'ArrowDown':
      arrowPressed.down = true;
      break;
    case 'ArrowUp':
    case 'Up':
      arrowPressed.up = true;
      break;
    case 'ArrowRight':
    case 'Right':
      arrowPressed.right = true;
      break;
    case 'ArrowLeft':
    case 'Left':
      arrowPressed.left = true;
      break;
    default:
      break;
  }
  if (Object.values(arrowPressed).some((value) => value === true)) {
    e.preventDefault();
  }
}

function keyUpHandler(e) {
  playerMoving = false;
  cycle = 1;
  switch (e.key) {
    case 'Down':
    case 'ArrowDown':
      arrowPressed.down = false;
      break;
    case 'ArrowUp':
    case 'Up':
      arrowPressed.up = false;
      break;
    case 'ArrowRight':
    case 'Right':
      arrowPressed.right = false;
      break;
    case 'ArrowLeft':
    case 'Left':
      arrowPressed.left = false;
      break;
    default:
      break;
  }
}

function drawTargetCursorMove() {
  mouseClick = true;
  // ctx.filter = 'none';

  cursorClickRadius += deltaCursorClickRadius;
  if (cursorClickRadius >= 10 || cursorClickRadius <= 5) {
    deltaCursorClickRadius *= -1;
  }
  ctx.strokeStyle = 'rgba(100, 50, 80, 0.5)';
  ctx.lineWidth = 5;

  ctx.arc(targetX, targetY, cursorClickRadius, 0, Math.PI * 2);
  ctx.stroke();
  ctx.beginPath();

  if (pX <= targetX - 20 && pX >= targetX - 21 && pY <= targetY + 20 && pY >= targetY - 50) {
    mouseClick = false;

    playerMoving = false;
    cycle = 1;
  }
}

function mainRender() {
  mapRender();
  playerRender();
  if (mouseClick) {
    drawTargetCursorMove();
  }
}

function mouseLeftClickHandler(e) {
  playerMoving = true;
  cursorClickRadius = 5;
  deltaCursorClickRadius = 1;

  targetX = ((e.pageX - window.scrollX - canvas.getBoundingClientRect().left) / 10).toFixed(0) * 10;
  targetY = ((e.pageY - window.scrollY - canvas.getBoundingClientRect().top) / 10).toFixed(0) * 10;
  if (mouseClick === false) {
    drawTargetCursorMove(e);
  }
}

function playerControlKeyboardListener() {
  if (arrowPressed.down && pY < gameAreaHeight - spriteH && pY < 460) {
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
}

function playerControlMouseListener() {
  let lastPY = pY;
  let lastPX = pX;
  // вверх
  if (targetY && pY > targetY - Math.round(spriteH / 10) * 10) {
    direction = 3;
    pY -= 10;
  }
  // вниз
  if (targetY && pY < targetY - Math.round(spriteH / 10) * 10 && pY < 460) {
    direction = 0;
    pY += 10;
  }
  // влево
  if (targetX && pX > targetX - Math.round(spriteW / 20) * 10) {
    direction = 1;
    pX -= 10;
  }
  // вправо
  if (targetX && pX < targetX - Math.round(spriteW / 20) * 10) {
    direction = 2;
    pX += 10;
  }
  // console.log(pY);

  // проверяем не бежит ли на месте
  if (lastPY === pY && lastPX === pX) {
    playerMoving = false;
    cycle = 1;
    mouseClick = false;
    lastPY = null;
    lastPX = null;
  }
}

document.addEventListener('keydown', keyDownHandler);
document.addEventListener('keyup', keyUpHandler);

// Клик мышью
canvas.addEventListener('click', mouseLeftClickHandler);

player.addEventListener('load', () => {
  // document.querySelector('#loading-status').style.display = 'none'; //! поменять

  // PlayGame -----------------------------------------------------------------------
  setInterval(() => {
    // Управление мышью

    playerControlMouseListener();

    playerControlKeyboardListener();

    if (pY > 170 - spriteH && pY < 230 - spriteH && pX > 170 - spriteW && pX < 230) {
      colorCircle[0] += 1;
      colorCircle[1] += 1;
    } else {
      colorCircle = [160, 157, 157, 1];
    }

    // console.log(moving);
    if (playerMoving) {
      playerMoveAnimation();
    }
    ctx.clearRect(0, 0, gameAreaWidth, gameAreaHeight);

    mainRender();
    // console.log(pX);
  }, 120);
});
