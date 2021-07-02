import './index.scss';
import personWalk from './assets/Male-3-Walk.png';
import grassBcg from './assets/background/grass-2.jpg';

const canvas = document.querySelector('#game');
canvas.style.background = `url(${grassBcg})`;

const canvasRect = canvas.getBoundingClientRect();
const gameAreaWidth = canvasRect.width;
const gameAreaHeight = canvasRect.height;
console.log(canvasRect);

const ctx = canvas.getContext('2d');

const player = document.createElement('img');

player.src = personWalk;

const spriteW = 48,
    spriteH = 48,
    frames = 4;
let cycle = 0;

let arrowPressed = {
    up: false,
    down: false,
    left: false,
    right: false,
};
let targetY = null;
let targetX = null;

let framesCount = 0;
let pY = ((gameAreaHeight / 2 - spriteH) / 10).toFixed(0) * 10;
// let pY = 0;
let pX = ((gameAreaWidth / 2 - spriteW / 2) / 10).toFixed(0) * 10;
let direction = 0;

function playerMove() {
    framesCount++;
    if (framesCount != 3) {
        cycle = framesCount;
    } else {
        cycle = 1;
    }
    cycle = cycle % frames;
    framesCount === 4 ? (framesCount = 0) : framesCount;
}

function playerRender() {
    ctx.drawImage(player, cycle * spriteW, direction * spriteH, spriteW, spriteH, pX, pY, 48, 48);
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

document.addEventListener('keydown', keyDownHandler);
document.addEventListener('keyup', keyUpHandler);
canvas.addEventListener('click', (e) => {
    // console.log(e.target);
    // console.log(e.clientX);
    targetX = ((e.pageX - canvasRect.left) / 10).toFixed(0) * 10;
    targetY = ((e.pageY - canvasRect.top) / 10).toFixed(0) * 10;
});

player.addEventListener('load', () => {
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

        //Управление мышью
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

        ctx.clearRect(0, 0, 600, 600);

        playerRender();
    }, 120);
});
