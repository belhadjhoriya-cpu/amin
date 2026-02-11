// Pong Game Logic in JavaScript

const canvas = document.getElementById('pong');
const context = canvas.getContext('2d');

// Create the pong paddle
const paddleWidth = 10;
const paddleHeight = 100;
const playerPaddleX = 0;
const computerPaddleX = canvas.width - paddleWidth;
let playerPaddleY = (canvas.height - paddleHeight) / 2;
let computerPaddleY = (canvas.height - paddleHeight) / 2;

// Create the pong ball
const ballSize = 10;
let ballX = canvas.width / 2;
let ballY = canvas.height / 2;
let ballSpeedX = 5;
let ballSpeedY = 5;

let playerScore = 0;
let computerScore = 0;

function drawRect(x, y, w, h, color) {
    context.fillStyle = color;
    context.fillRect(x, y, w, h);
}

function drawBall(x, y, size, color) {
    context.fillStyle = color;
    context.beginPath();
    context.arc(x, y, size, 0, Math.PI * 2, false);
    context.fill();
}

function moveBall() {
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    // Wall collision
    if (ballY < 0 || ballY > canvas.height) {
        ballSpeedY = -ballSpeedY;
    }

    // Paddle collision
    if (ballX < playerPaddleX + paddleWidth && ballY > playerPaddleY && ballY < playerPaddleY + paddleHeight) {
        ballSpeedX = -ballSpeedX;
    }
    if (ballX > computerPaddleX && ballY > computerPaddleY && ballY < computerPaddleY + paddleHeight) {
        ballSpeedX = -ballSpeedX;
    }

    // Score update
    if (ballX < 0) {
        computerScore++;
        resetBall();
    } else if (ballX > canvas.width) {
        playerScore++;
        resetBall();
    }
}

function resetBall() {
    ballX = canvas.width / 2;
    ballY = canvas.height / 2;
    ballSpeedX = -ballSpeedX;
}

function moveComputerPaddle() {
    if (computerPaddleY + paddleHeight / 2 < ballY) {
        computerPaddleY += 4;
    } else {
        computerPaddleY -= 4;
    }
}

function draw() {
    drawRect(0, 0, canvas.width, canvas.height, 'black');
    drawRect(playerPaddleX, playerPaddleY, paddleWidth, paddleHeight, 'white');
    drawRect(computerPaddleX, computerPaddleY, paddleWidth, paddleHeight, 'white');
    drawBall(ballX, ballY, ballSize, 'white');
    context.fillStyle = 'white';
    context.font = '20px Arial';
    context.fillText('Player: ' + playerScore + ' Computer: ' + computerScore, 20, 20);
}

function gameLoop() {
    moveBall();
    moveComputerPaddle();
    draw();
    requestAnimationFrame(gameLoop);
}

document.addEventListener('mousemove', function(event) {
    const rect = canvas.getBoundingClientRect();
    playerPaddleY = event.clientY - rect.top - paddleHeight / 2;
});

// Start game
gameLoop();