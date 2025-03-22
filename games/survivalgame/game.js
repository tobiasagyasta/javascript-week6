// Get DOM elements
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
canvas.width = 800;
canvas.height = 400;
document.body.appendChild(canvas);

// Game variables
const player = {
    y: canvas.height / 2,
    width: 30,
    height: 30,
    speed: 5
};

let obstacles = [];
let timeSurvived = 0;
let isGameOver = false;
let highScore = localStorage.getItem('survivalHighScore') || 0;

// Keyboard controls
let keys = {};
document.addEventListener('keydown', (e) => keys[e.key] = true);
document.addEventListener('keyup', (e) => keys[e.key] = false);

// Game functions
function movePlayer() {
    if (keys['ArrowUp'] && player.y > 0) {
        player.y -= player.speed;
    }
    if (keys['ArrowDown'] && player.y < canvas.height - player.height) {
        player.y += player.speed;
    }
}

function createObstacle() {
    if (Math.random() < 0.02) {
        obstacles.push({
            x: canvas.width,
            y: Math.random() * (canvas.height - 50),
            width: 20,
            height: 50,
            speed: 3
        });
    }
}

function moveObstacles() {
    obstacles = obstacles.filter(obstacle => {
        obstacle.x -= obstacle.speed;
        return obstacle.x + obstacle.width > 0;
    });
}

function checkCollision() {
    return obstacles.some(obstacle => {
        return player.y < obstacle.y + obstacle.height &&
               player.y + player.height > obstacle.y &&
               obstacle.x < player.width &&
               obstacle.x + obstacle.width > 0;
    });
}

function drawGame() {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw player
    ctx.fillStyle = 'blue';
    ctx.fillRect(0, player.y, player.width, player.height);

    // Draw obstacles
    ctx.fillStyle = 'red';
    obstacles.forEach(obstacle => {
        ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
    });

    // Draw score
    ctx.fillStyle = 'black';
    ctx.font = '20px Arial';
    ctx.fillText(`Time: ${Math.floor(timeSurvived)} seconds`, 10, 30);
    ctx.fillText(`High Score: ${Math.floor(highScore)} seconds`, 10, 60);
}

function gameLoop() {
    if (!isGameOver) {
        movePlayer();
        createObstacle();
        moveObstacles();
        
        if (checkCollision()) {
            isGameOver = true;
            if (timeSurvived > highScore) {
                highScore = timeSurvived;
                localStorage.setItem('survivalHighScore', highScore);
            }
            alert(checkSurvival(Math.floor(timeSurvived), true));
            location.reload();
            return;
        }

        timeSurvived += 1/60; // Assuming 60 FPS
        drawGame();
        requestAnimationFrame(gameLoop);
    }
}

// Start the game
gameLoop();