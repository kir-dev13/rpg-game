import './index.scss';
import personWalk from './assets/Male-3-Walk.png';
import grassBcg from './assets/background/grass-2.jpg';

const canvas = document.querySelector('#game');
canvas.style.background = `url(${grassBcg})`;

const canvasRect = canvas.getBoundingClientRect();

// console.log(canvasRect);
window.addEventListener('scroll', () => {
  // console.log('prokrutili: ', window.scrollY);
});

const gameAreaWidth = canvasRect.width;
const gameAreaHeight = canvasRect.height;

const ctx = canvas.getContext('2d');

const player = document.createElement('img');

player.src = personWalk;

const spriteW = 48;
const spriteH = 48;
const frames = 4;
let cycle = 0;

const arrowPressed = {
  up: false,
  down: false,
  left: false,
  right: false,
};
let targetY = null;
let targetX = null;
// console.log(targetX);

let framesCount = 0;
let pY = ((gameAreaHeight / 2 - spriteH) / 10).toFixed(0) * 10;
let pX = ((gameAreaWidth / 2 - spriteW / 2) / 10).toFixed(0) * 10;
let direction = 0;

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

function playerRender() {
  ctx.drawImage(player, cycle * spriteW, direction * spriteH, spriteW, spriteH, pX, pY, 48, 48);
  // console.log(pY);
  // console.log(targetY);
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

function drawTargetMove() {
  let radius = 5;
  let changeRadius = 1;

  // ctx.closePath();

  if (radius === 15 || radius === 5) {
    changeRadius *= -1;
  }
  ctx.strokeStyle = 'red';
  // ctx.beginPath();
  ctx.moveTo(targetX, targetY);
  ctx.arc(targetX, targetY, radius, 0, Math.PI * 2);
  ctx.stroke();

  radius += changeRadius;
  changeRadius += 1;

  if (pX > targetX - 30 && pX < targetX + 30 && pY > targetY - 30 && pY < targetY - 30) {
    ctx.clearRect(0, 0, 600, 600);
    playerRender();
    return;
  }
  // ctx.clearRect(0, 0, gameAreaWidth, gameAreaHeight);
  // playerRender();
  requestAnimationFrame(drawTargetMove);
}

document.addEventListener('keydown', keyDownHandler);
document.addEventListener('keyup', keyUpHandler);
canvas.addEventListener('click', (e) => {
  // targetX = ((e.clientX - (canvasRect.left + pageXOffset)) / 10).toFixed(0) * 10;
  // targetY = ((e.clientY - (canvasRect.top + pageYOffset)) / 10).toFixed(0) * 10;
  // drawTargetMove();

  targetX = ((e.pageX - window.scrollX - canvas.getBoundingClientRect().left) / 10).toFixed(0) * 10;

  targetY = ((e.pageY - window.scrollY - canvas.getBoundingClientRect().top) / 10).toFixed(0) * 10;
  drawTargetMove();
  // console.log(`e.pageY: ${e.pageY}`);
  // console.log(`pageYOffset: ${pageYOffset}`);
  // console.log(`canvasRect.top: ${canvas.getBoundingClientRect().top}`);

  // console.log(`targetY: ${targetY}`);

  // // console.log('e.clientX: ', e.clientX);
  // console.log('e.clientY: ', e.clientY);
  // // console.log('e.pageX: ', e.pageX);
  // console.log('e.pageY: ', e.pageY);
  // // console.log('targetX : ', targetX);
  // console.log('targetY: ', targetY);
  // console.log(
  //     'canvasRect.top + document.body.scrollTop: ',
  //     ((canvasRect.top + document.body.scrollTop) / 10).toFixed(0) * 10,
  // );
});

player.addEventListener('load', () => {
  // window.scrollTop;
  // console.log(window.scrollY);
  // console.log(document.documentElement.offsetHeight);
  // console.dir(document);
  document.querySelector('#loading-status').style.display = 'none';
  setInterval(() => {
    if (arrowPressed.down && pY < gameAreaHeight - spriteH) {
      direction = 0;
      pY += 10;
      playerMove();
    }

    if (arrowPressed.up && pY > 0) {
      direction = 3;
      pY -= 10;
      playerMove();
    }

    if (arrowPressed.left && pX > 0) {
      direction = 1;
      pX -= 10;
      playerMove();
    }
    if (arrowPressed.right && pX < gameAreaWidth - spriteW) {
      direction = 2;
      pX += 10;
      playerMove();
    }

    // Управление мышью

    if (targetY && pY > targetY - Math.round(spriteH / 10) * 10) {
      direction = 3;
      pY -= 10;
      playerMove();
    }
    if (targetY && pY < targetY - Math.round(spriteH / 10) * 10) {
      direction = 0;
      pY += 10;
      playerMove();
    }
    if (targetX && pX > targetX - Math.round(spriteW / 20) * 10) {
      direction = 1;
      pX -= 10;
      playerMove();
    }
    if (targetX && pX < targetX - Math.round(spriteW / 20) * 10) {
      direction = 2;
      pX += 10;
      playerMove();
    }

    ctx.clearRect(0, 0, gameAreaWidth, gameAreaHeight);

    playerRender();
  }, 120);
});
