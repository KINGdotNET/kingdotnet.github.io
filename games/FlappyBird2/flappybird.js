const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const gameOverScreen = document.getElementById('gameOverScreen');
const finalScoreDisplay = document.getElementById('finalScore');

// Adjusted constants for ultra-smooth gliding physics
const GRAVITY = 0.08;           // Drastically reduced from 0.15
const JUMP_FORCE = -3;          // Reduced from -4.5
const MAX_VELOCITY = 2.5;       // Reduced from 4
const MIN_VELOCITY = -2;        // New constant to limit upward speed
const GLIDE_FACTOR = 0.98;      // New constant for horizontal gliding
const PIPE_SPEED = 1;           // Reduced from 1.2
const PIPE_SPAWN_INTERVAL = 3500; // Increased from 3000
const BIRD_SIZE = 30;
const PIPE_WIDTH = 50;
const GAP_SIZE = 200;           // Increased from 180
const ROTATION_SPEED = 1;       // Reduced from 2 for smoother rotation

// Game variables
let bird = {
    x: 50,
    y: canvas.height / 2,
    velocity: 0,
    horizontalVelocity: 0,      // New variable for horizontal movement
    rotation: 0,
    targetRotation: 0
};
let pipes = [];
let score = 0;
let gameStarted = false;
let gameOver = false;
let frameCount = 0;             // New variable for animation timing
let leaderboard = [
    { name: "Player 1 - QUE.COM", score: 15 },
    { name: "Player 2 - KING.NET", score: 12 },
    { name: "Player 3 - Retune.com", score: 8 }
];

// Event listeners
document.addEventListener('keydown', handleInput);
canvas.addEventListener('click', handleInput);

function handleInput(e) {
    if ((e.type === 'keydown' && e.code === 'Space') || e.type === 'click') {
        e.preventDefault();
        if (!gameStarted) {
            startGame();
        } else if (!gameOver) {
            bird.velocity = JUMP_FORCE;
            bird.horizontalVelocity = 0.5; // Add slight forward momentum on jump
            bird.targetRotation = -25;
        }
    }
}

function startGame() {
    gameStarted = true;
    gameLoop();
    setInterval(spawnPipe, PIPE_SPAWN_INTERVAL);
}

function resetGame() {
    bird = {
        x: 50,
        y: canvas.height / 2,
        velocity: 0,
        horizontalVelocity: 0,
        rotation: 0,
        targetRotation: 0
    };
    pipes = [];
    score = 0;
    gameOver = false;
    frameCount = 0;
    gameOverScreen.style.display = 'none';
    gameStarted = false;
    draw();
}

function gameLoop() {
    if (!gameOver) {
        update();
        draw();
        requestAnimationFrame(gameLoop);
    }
}

function update() {
    if (gameOver) return;
    frameCount++;

    // Update bird vertical movement
    bird.velocity += GRAVITY;
    bird.velocity = Math.max(MIN_VELOCITY, Math.min(bird.velocity, MAX_VELOCITY));
    bird.y += bird.velocity;

    // Update bird horizontal movement (gliding)
    bird.horizontalVelocity *= GLIDE_FACTOR;
    bird.x += bird.horizontalVelocity;
    bird.x = Math.max(50, Math.min(bird.x, 100)); // Keep bird within x bounds

    // Smooth rotation based on velocity
    let targetRotation;
    if (bird.velocity < 0) {
        targetRotation = -25;
    } else if (bird.velocity > MAX_VELOCITY / 2) {
        targetRotation = 25;
    } else {
        targetRotation = bird.velocity * 25 / (MAX_VELOCITY / 2);
    }
    
    bird.rotation += (targetRotation - bird.rotation) * 0.1;

    // Update pipes
    pipes.forEach(pipe => {
        pipe.x -= PIPE_SPEED;
        
        if (!pipe.passed && bird.x > pipe.x + PIPE_WIDTH) {
            score++;
            pipe.passed = true;
        }

        if (checkCollision(pipe)) {
            endGame();
        }
    });

    pipes = pipes.filter(pipe => pipe.x > -PIPE_WIDTH);

    if (bird.y > canvas.height - BIRD_SIZE || bird.y < 0) {
        endGame();
    }
}

function checkCollision(pipe) {
    const birdHitbox = {
        x: bird.x + 5,
        y: bird.y + 5,
        width: BIRD_SIZE - 10,
        height: BIRD_SIZE - 10
    };
    
    return (birdHitbox.x + birdHitbox.width > pipe.x && 
            birdHitbox.x < pipe.x + PIPE_WIDTH && 
            (birdHitbox.y < pipe.topHeight || 
             birdHitbox.y + birdHitbox.height > pipe.topHeight + GAP_SIZE));
}

function spawnPipe() {
    if (gameOver) return;

    const minHeight = 50;
    const maxHeight = canvas.height - GAP_SIZE - 50;
    const topHeight = Math.random() * (maxHeight - minHeight) + minHeight;
    
    pipes.push({
        x: canvas.width,
        topHeight: topHeight,
        passed: false
    });
}

function endGame() {
    gameOver = true;
    updateLeaderboard();
    gameOverScreen.style.display = 'flex';
    finalScoreDisplay.textContent = `Score: ${score}`;
}

function updateLeaderboard() {
    leaderboard.push({ name: "You", score: score });
    leaderboard.sort((a, b) => b.score - a.score);
    leaderboard = leaderboard.slice(0, 5);
    
    const leaderboardHTML = leaderboard.map(entry => 
        `<div class="player-score">
            <span>${entry.name}</span>
            <span>${entry.score}</span>
        </div>`
    ).join('');
    
    document.getElementById('leaderboardScores').innerHTML = leaderboardHTML;
}

function draw() {
    // Clear canvas
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, '#87CEEB');
    gradient.addColorStop(1, '#B0E0E6');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw bird with rotation
    ctx.save();
    ctx.translate(bird.x + BIRD_SIZE/2, bird.y + BIRD_SIZE/2);
    ctx.rotate(bird.rotation * Math.PI / 180);
    
    // Bird body with subtle animation
    const bodySize = BIRD_SIZE/2 + Math.sin(frameCount * 0.1) * 1;
    ctx.fillStyle = '#FFD700';
    ctx.beginPath();
    ctx.arc(0, 0, bodySize, 0, Math.PI * 2);
    ctx.fill();
    
    // Bird eye
    ctx.fillStyle = 'white';
    ctx.beginPath();
    ctx.arc(5, -5, 5, 0, Math.PI * 2);
    ctx.fill();
    
    // Bird beak
    ctx.fillStyle = '#FFA500';
    ctx.beginPath();
    ctx.moveTo(BIRD_SIZE/2 - 5, 0);
    ctx.lineTo(BIRD_SIZE/2 + 10, 0);
    ctx.lineTo(BIRD_SIZE/2 - 5, 5);
    ctx.closePath();
    ctx.fill();
    
    // Wing animation
    ctx.fillStyle = '#FFE700';
    ctx.beginPath();
    ctx.ellipse(-5, 5, 8, 4 + Math.sin(frameCount * 0.2) * 2, Math.PI / 4, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.restore();

    // Draw pipes
    pipes.forEach(pipe => {
        // Top pipe
        const pipeGradient = ctx.createLinearGradient(pipe.x, 0, pipe.x + PIPE_WIDTH, 0);
        pipeGradient.addColorStop(0, '#2ECC71');
        pipeGradient.addColorStop(1, '#27AE60');
        
        ctx.fillStyle = pipeGradient;
        ctx.fillRect(pipe.x, 0, PIPE_WIDTH, pipe.topHeight);
        ctx.fillRect(pipe.x, pipe.topHeight + GAP_SIZE, 
                    PIPE_WIDTH, canvas.height - pipe.topHeight - GAP_SIZE);
        
        // Pipe caps
        ctx.fillStyle = '#27AE60';
        ctx.fillRect(pipe.x - 5, pipe.topHeight - 20, PIPE_WIDTH + 10, 20);
        ctx.fillRect(pipe.x - 5, pipe.topHeight + GAP_SIZE, PIPE_WIDTH + 10, 20);
    });

    // Draw score
    ctx.fillStyle = 'white';
    ctx.font = 'bold 24px Arial';
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 4;
    ctx.strokeText(`Score: ${score}`, 10, 30);
    ctx.fillText(`Score: ${score}`, 10, 30);

    if (!gameStarted) {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'white';
        ctx.font = '24px Arial';
        ctx.textAlign = 'center';
        ctx.strokeText('Click or Press Space to Start', canvas.width/2, canvas.height/2);
        ctx.fillText('Click or Press Space to Start', canvas.width/2, canvas.height/2);
        ctx.textAlign = 'left';
    }
}

// Initial draw
updateLeaderboard();
draw();
