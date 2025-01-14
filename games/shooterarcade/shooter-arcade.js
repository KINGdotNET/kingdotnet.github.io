// Start of Game - EM@KING.NET 
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreDisplay = document.getElementById('score');
const highScoreDisplay = document.getElementById('highScore');
const gameOverScreen = document.getElementById('gameOver');
const finalScoreDisplay = document.getElementById('finalScore');

// Game state
let gameState = {
    score: 0,
    highScore: localStorage.getItem('highScore') || 0,
    isGameOver: false,
    player: {
        x: canvas.width / 2,
        y: canvas.height - 30,
        width: 30,
        height: 30,
        speed: 5,
        bullets: []
    },
    enemies: [],
    keys: {
        left: false,
        right: false,
        space: false
    },
    lastShot: 0
};

// Initialize high score display
highScoreDisplay.textContent = `High Score: ${gameState.highScore}`;

// Create enemies
function createEnemies() {
    const rows = 3;
    const enemiesPerRow = 8;
    const padding = 40;

    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < enemiesPerRow; col++) {
            gameState.enemies.push({
                x: col * padding + 50,
                y: row * padding + 50,
                width: 25,
                height: 25,
                direction: 1,
                speed: 1
            });
        }
    }
}

// Draw functions
function drawPlayer() {
    ctx.fillStyle = '#0F0';
    ctx.fillRect(
        gameState.player.x - gameState.player.width / 2,
        gameState.player.y,
        gameState.player.width,
        gameState.player.height
    );
}

function drawEnemies() {
    gameState.enemies.forEach(enemy => {
        ctx.fillStyle = '#F00';
        ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);
    });
}

function drawBullets() {
    ctx.fillStyle = '#FFF';
    gameState.player.bullets.forEach(bullet => {
        ctx.fillRect(bullet.x, bullet.y, 2, 10);
    });
}

// Update game state
function update() {
    if (gameState.isGameOver) return;

    // Move player
    if (gameState.keys.left && gameState.player.x > gameState.player.width/2) {
        gameState.player.x -= gameState.player.speed;
    }
    if (gameState.keys.right && gameState.player.x < canvas.width - gameState.player.width/2) {
        gameState.player.x += gameState.player.speed;
    }

    // Update bullets
    gameState.player.bullets.forEach(bullet => {
        bullet.y -= 7;
    });
    gameState.player.bullets = gameState.player.bullets.filter(bullet => bullet.y > 0);

    // Move enemies
    let hitEdge = false;
    gameState.enemies.forEach(enemy => {
        enemy.x += enemy.speed * enemy.direction;
        if (enemy.x <= 0 || enemy.x + enemy.width >= canvas.width) {
            hitEdge = true;
        }
    });

    if (hitEdge) {
        gameState.enemies.forEach(enemy => {
            enemy.direction *= -1;
            enemy.y += 20;
        });
    }

    // Check collisions
    gameState.player.bullets.forEach((bullet, bulletIndex) => {
        gameState.enemies.forEach((enemy, enemyIndex) => {
            if (bullet.x >= enemy.x && bullet.x <= enemy.x + enemy.width &&
                bullet.y >= enemy.y && bullet.y <= enemy.y + enemy.height) {
                // Remove bullet and enemy
                gameState.player.bullets.splice(bulletIndex, 1);
                gameState.enemies.splice(enemyIndex, 1);
                // Update score
                gameState.score += 100;
                updateScore();
            }
        });
    });

    // Check game over conditions
    gameState.enemies.forEach(enemy => {
        if (enemy.y + enemy.height >= gameState.player.y) {
            endGame();
        }
    });

    // Check win condition
    if (gameState.enemies.length === 0) {
        createEnemies(); // Start new level
    }
}

function updateScore() {
    scoreDisplay.textContent = `Score: ${gameState.score}`;
    if (gameState.score > gameState.highScore) {
        gameState.highScore = gameState.score;
        localStorage.setItem('highScore', gameState.highScore);
        highScoreDisplay.textContent = `High Score: ${gameState.highScore}`;
    }
}

function endGame() {
    gameState.isGameOver = true;
    gameOverScreen.style.display = 'block';
    finalScoreDisplay.textContent = `Final Score: ${gameState.score}`;
}

function restartGame() {
    gameState.score = 0;
    gameState.isGameOver = false;
    gameState.player.bullets = [];
    gameState.enemies = [];
    gameState.player.x = canvas.width / 2;
    createEnemies();
    gameOverScreen.style.display = 'none';
    updateScore();
}

// Game loop
function gameLoop() {
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    update();
    drawPlayer();
    drawEnemies();
    drawBullets();
    
    requestAnimationFrame(gameLoop);
}

// Event listeners
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') gameState.keys.left = true;
    if (e.key === 'ArrowRight') gameState.keys.right = true;
    if (e.key === ' ') {
        if (!gameState.keys.space && !gameState.isGameOver) {
            gameState.player.bullets.push({
                x: gameState.player.x,
                y: gameState.player.y
            });
        }
        gameState.keys.space = true;
    }
});

document.addEventListener('keyup', (e) => {
    if (e.key === 'ArrowLeft') gameState.keys.left = false;
    if (e.key === 'ArrowRight') gameState.keys.right = false;
    if (e.key === ' ') gameState.keys.space = false;
});

// Social sharing
function shareScore(platform) {
    const text = `I scored ${gameState.score} points in Galaga! Can you beat my score?`;
    const url = window.location.href;
    
    if (platform === 'twitter') {
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`);
    } else if (platform === 'facebook') {
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`);
    }
}

// Start game
createEnemies();
gameLoop();

