const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let gameActive = true;
let difficulty = 'easy';
let rapidFireActive = false;
let lastShotTime = 0;
let level = 1;
let highScore = localStorage.getItem('highScore') || 0;

const player = {
    x: canvas.width / 2,
    y: canvas.height - 100,
    width: 64,
    height: 64,
    speed: 5,
    health: 100
};

const bullets = [];
const enemies = [];
const explosions = [];
const particles = [];
const powerUps = [];
let score = 0;

const playerImage = new Image();
playerImage.src = 'https://opengameart.org/sites/default/files/ship_0.png';

const enemyImage = new Image();
enemyImage.src = 'https://opengameart.org/sites/default/files/spaceship_enemy.png';

const bossImage = new Image();
bossImage.src = 'https://opengameart.org/sites/default/files/boss_ship.png';

const powerUpImage = new Image();
powerUpImage.src = 'https://opengameart.org/sites/default/files/powerup.png';

// Sound effects
const shootSound = new Audio('https://opengameart.org/sites/default/files/shoot.wav');
const explosionSound = new Audio('https://opengameart.org/sites/default/files/explosion.wav');
const powerUpSound = new Audio('https://opengameart.org/sites/default/files/powerup.wav');

function drawPlayer() {
    ctx.drawImage(playerImage, player.x, player.y, player.width, player.height);
}

function drawBullets() {
    ctx.fillStyle = 'yellow';
    bullets.forEach(bullet => {
        ctx.fillRect(bullet.x, bullet.y, 5, 15);
    });
}

function drawEnemies() {
    enemies.forEach(enemy => {
        if (enemy.isBoss) {
            ctx.drawImage(bossImage, enemy.x, enemy.y, 128, 128);
        } else {
            ctx.drawImage(enemyImage, enemy.x, enemy.y, 48, 48);
        }
    });
}

function drawExplosions() {
    explosions.forEach((explosion, index) => {
        ctx.beginPath();
        ctx.arc(explosion.x, explosion.y, explosion.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 100, 0, ${1 - explosion.time / 30})`;
        ctx.fill();
        explosion.time++;
        explosion.radius += 0.5;
        if (explosion.time >= 30) {
            explosions.splice(index, 1);
        }
    });
}

function drawParticles() {
    particles.forEach((particle, index) => {
        ctx.fillStyle = `rgba(255, 255, 255, ${1 - particle.life / 20})`;
        ctx.fillRect(particle.x, particle.y, 2, 2);
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.life--;
        if (particle.life <= 0) {
            particles.splice(index, 1);
        }
    });
}

function drawPowerUps() {
    powerUps.forEach(powerUp => {
        ctx.drawImage(powerUpImage, powerUp.x, powerUp.y, 30, 30);
    });
}

function drawBackground() {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < 100; i++) {
        ctx.fillStyle = 'white';
        ctx.fillRect(
            Math.random() * canvas.width,
            (Math.random() * canvas.height + canvas.height * 2 - (Date.now() / 50) % (canvas.height * 2)) % canvas.height,
            1,
            1
        );
    }
}

function updateHUD() {
    document.getElementById('scoreDisplay').textContent = score;
    document.getElementById('levelDisplay').textContent = level;
    document.getElementById('healthDisplay').textContent = player.health;
}

function movePlayer(direction) {
    if (direction === 'left' && player.x > 0) {
        player.x -= player.speed;
        createParticles(player.x + player.width, player.y + player.height / 2, 5, 1, 1);
    } else if (direction === 'right' && player.x < canvas.width - player.width) {
        player.x += player.speed;
        createParticles(player.x, player.y + player.height / 2, 5, -1, 1);
    }
}

function shoot() {
    const currentTime = Date.now();
    if (currentTime - lastShotTime > (rapidFireActive ? 100 : 300)) {
        bullets.push({
            x: player.x + player.width / 2 - 2.5,
            y: player.y,
            speed: 7
        });
        shootSound.play();
        lastShotTime = currentTime;
    }
}

function updateBullets() {
    for (let i = bullets.length - 1; i >= 0; i--) {
        bullets[i].y -= bullets[i].speed;
        if (bullets[i].y < 0) {
            bullets.splice(i, 1);
        }
    }
}

function updateEnemies() {
    const spawnRate = 0.02 + (level - 1) * 0.005;
    const enemySpeed = 2 + (level - 1) * 0.5;

    if (Math.random() < spawnRate) {
        if (level % 5 === 0 && enemies.filter(e => e.isBoss).length === 0) {
            // Spawn boss every 5 levels
            enemies.push({
                x: Math.random() * (canvas.width - 128),
                y: 0,
                speed: enemySpeed * 0.5,
                health: 100,
                isBoss: true
            });
        } else {
            enemies.push({
                x: Math.random() * (canvas.width - 48),
                y: 0,
                speed: enemySpeed,
                health: 10
            });
        }
    }

    for (let i = enemies.length - 1; i >= 0; i--) {
        enemies[i].y += enemies[i].speed;
        if (enemies[i].y > canvas.height) {
            enemies.splice(i, 1);
            player.health -= 10;
            if (player.health <= 0) {
                gameOver();
            }
        }
    }
}

function updatePowerUps() {
    if (Math.random() < 0.002) {
        powerUps.push({
            x: Math.random() * (canvas.width - 30),
            y: 0,
            speed: 2,
            type: Math.random() < 0.5 ? 'health' : 'rapidFire'
        });
    }

    for (let i = powerUps.length - 1; i >= 0; i--) {
        powerUps[i].y += powerUps[i].speed;
        if (powerUps[i].y > canvas.height) {
            powerUps.splice(i, 1);
        }
    }
}

function checkCollisions() {
    for (let i = enemies.length - 1; i >= 0; i--) {
        for (let j = bullets.length - 1; j >= 0; j--) {
            if (
                bullets[j].x < enemies[i].x + (enemies[i].isBoss ? 128 : 48) &&
                bullets[j].x + 5 > enemies[i].x &&
                bullets[j].y < enemies[i].y + (enemies[i].isBoss ? 128 : 48) &&
                bullets[j].y + 15 > enemies[i].y
            ) {
                createExplosion(enemies[i].x + (enemies[i].isBoss ? 64 : 24), enemies[i].y + (enemies[i].isBoss ? 64 : 24));
                explosionSound.play();
                bullets.splice(j, 1);
                enemies[i].health -= 10;
                if (enemies[i].health <= 0) {
                    score += enemies[i].isBoss ? 100 : 10;
                    enemies.splice(i, 1);
                }
                break;
            }
        }

        // Check player collision with enemies
        if (
            player.x < enemies[i].x + (enemies[i].isBoss ? 128 : 48) &&
            player.x + player.width > enemies[i].x &&
            player.y < enemies[i].y + (enemies[i].isBoss ? 128 : 48) &&
            player.y + player.height > enemies[i].y
        ) {
            createExplosion(player.x + player.width / 2, player.y + player.height / 2);
            explosionSound.play();
            player.health -= 20;
            enemies.splice(i, 1);
            if (player.health <= 0) {
                gameOver();
            }
        }
    }

    // Check player collision with power-ups
    for (let i = powerUps.length - 1; i >= 0; i--) {
        if (
            player.x < powerUps[i].x + 30 &&
            player.x + player.width > powerUps[i].x &&
            player.y < powerUps[i].y + 30 &&
            player.y + player.height > powerUps[i].y
        ) {
            powerUpSound.play();
            if (powerUps[i].type === 'health') {
                player.health = Math.min(player.health + 20, 100);
            } else if (powerUps[i].type === 'rapidFire') {
                rapidFireActive = true;
                setTimeout(() => { rapidFireActive = false; }, 5000);
            }
            powerUps.splice(i, 1);
        }
    }
}

function createExplosion(x, y) {
    explosions.push({
        x: x,
        y: y,
        radius: 5,
        time: 0
    });
}

function createParticles(x, y, count, vx, vy) {
    for (let i = 0; i < count; i++) {
        particles.push({
            x: x,
            y: y,
            vx: (Math.random() - 0.5) * 2 + vx,
            vy: (Math.random() - 0.5) * 2 + vy,
            life: 20
        });
    }
}

function gameLoop() {
    if (!gameActive) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    drawBackground();
    drawPlayer();
    drawBullets();
    drawEnemies();
    drawExplosions();
    drawParticles();
    drawPowerUps();
    
    updateBullets();
    updateEnemies();
    updatePowerUps();
    checkCollisions();
    updateHUD();
    
    if (score >= level * 100) {
        level++;
    }
    
    requestAnimationFrame(gameLoop);
}

function gameOver() {
    gameActive = false;
    document.getElementById('gameMenu').style.display = 'block';
    document.getElementById('finalScore').textContent = score;
    if (score > highScore) {
        highScore = score;
        localStorage.setItem('highScore', highScore);
    }
    document.getElementById('highScore').textContent = highScore;
}

function restartGame() {
    gameActive = true;
    score = 0;
    level = 1;
    player.health = 100;
    bullets.length = 0;
    enemies.length = 0;
    explosions.length = 0;
    particles.length = 0;
    powerUps.length = 0;
    player.x = canvas.width / 2;
    player.y = canvas.height - 100;
    document.getElementById('gameMenu').style.display = 'none';
    difficulty = document.getElementById('difficulty').value;
    gameLoop();
}

function shareScore(platform) {
    const text = `I scored ${score} points in Space Shooter Deluxe!`;
    const url = encodeURIComponent(window.location.href);
    let shareUrl;

    if (platform === 'twitter') {
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${url}`;
    } else if (platform === 'facebook') {
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${encodeURIComponent(text)}`;
    }

    if (shareUrl) {
        window.open(shareUrl, '_blank', 'width=600,height=400');
    }
}

// Add event listeners for share buttons
document.getElementById('shareTwitter').addEventListener('click', () => shareScore('twitter'));
document.getElementById('shareFacebook').addEventListener('click', () => shareScore('facebook'));

// Event listeners for game controls
document.getElementById('leftBtn').addEventListener('touchstart', () => movePlayer('left'));
document.getElementById('rightBtn').addEventListener('touchstart', () => movePlayer('right'));
document.getElementById('fireBtn').addEventListener('touchstart', () => { rapidFireActive = true; shoot(); });
document.getElementById('fireBtn').addEventListener('touchend', () => { rapidFireActive = false; });

// Event listener for restart button
document.getElementById('restartBtn').addEventListener('click', restartGame);

// Keyboard controls
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') movePlayer('left');
    if (e.key === 'ArrowRight') movePlayer('right');
    if (e.key === ' ') shoot();
});

// Resize event listener
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    player.y = canvas.height - 100;
});

// Start the game
gameLoop();

    
    