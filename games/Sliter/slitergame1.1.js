// Initialize canvas and context
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const minimapCanvas = document.getElementById('minimapCanvas');
const minimapCtx = minimapCanvas.getContext('2d');

// Set canvas size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
minimapCanvas.width = 150;
minimapCanvas.height = 150;

// Game variables
const WORLD_SIZE = 5000;
const VIEW_SIZE = Math.min(canvas.width, canvas.height);
const SCALE = VIEW_SIZE / WORLD_SIZE;
let camera = { x: 0, y: 0 };
let player = { x: WORLD_SIZE/2, y: WORLD_SIZE/2, segments: [], angle: 0, length: 10 };
let food = [];
let ai = [];
let leaderboard = [];

// Generate initial food
function generateFood(amount) {
    for (let i = 0; i < amount; i++) {
        food.push({
            x: Math.random() * WORLD_SIZE,
            y: Math.random() * WORLD_SIZE,
            color: `hsl(${Math.random() * 360}, 100%, 50%)`
        });
    }
}

// Generate AI snakes
function generateAI(amount) {
    for (let i = 0; i < amount; i++) {
        ai.push({
            x: Math.random() * WORLD_SIZE,
            y: Math.random() * WORLD_SIZE,
            segments: [],
            angle: Math.random() * Math.PI * 2,
            length: 10 + Math.random() * 90,
            color: `hsl(${Math.random() * 360}, 100%, 50%)`
        });
    }
}

// Draw snake
function drawSnake(snake, isPlayer) {
    ctx.fillStyle = isPlayer ? 'green' : snake.color;
    ctx.beginPath();
    ctx.arc((snake.x - camera.x) * SCALE, (snake.y - camera.y) * SCALE, snake.length * SCALE / 2, 0, Math.PI * 2);
    ctx.fill();

    for (let segment of snake.segments) {
        ctx.beginPath();
        ctx.arc((segment.x - camera.x) * SCALE, (segment.y - camera.y) * SCALE, segment.radius * SCALE, 0, Math.PI * 2);
        ctx.fill();
    }
}

// Draw food
function drawFood() {
    for (let f of food) {
        ctx.fillStyle = f.color;
        ctx.beginPath();
        ctx.arc((f.x - camera.x) * SCALE, (f.y - camera.y) * SCALE, 5 * SCALE, 0, Math.PI * 2);
        ctx.fill();
    }
}

// Move snake
function moveSnake(snake, speed) {
    snake.x += Math.cos(snake.angle) * speed;
    snake.y += Math.sin(snake.angle) * speed;

    // Update segments
    if (snake.segments.length === 0) {
        snake.segments.push({x: snake.x, y: snake.y, radius: snake.length / 2});
    } else {
        let lastSegment = snake.segments[snake.segments.length - 1];
        let dx = snake.x - lastSegment.x;
        let dy = snake.y - lastSegment.y;
        let dist = Math.sqrt(dx * dx + dy * dy);

        if (dist > snake.length / 5) {
            snake.segments.unshift({x: snake.x, y: snake.y, radius: snake.length / 2});
            while (snake.segments.length > snake.length / 2) {
                snake.segments.pop();
            }
        }
    }
}

// Check collision with food
function checkFoodCollision(snake) {
    for (let i = food.length - 1; i >= 0; i--) {
        let f = food[i];
        let dx = snake.x - f.x;
        let dy = snake.y - f.y;
        if (dx * dx + dy * dy < snake.length * snake.length / 4) {
            food.splice(i, 1);
            snake.length += 1;
            generateFood(1);
            return true;
        }
    }
    return false;
}

// Check collision with other snakes
function checkSnakeCollision(snake1, snake2) {
    // Check collision between snake heads
    let dx = snake1.x - snake2.x;
    let dy = snake1.y - snake2.y;
    let distSquared = dx * dx + dy * dy;
    let minDist = (snake1.length + snake2.length) / 4;
    
    if (distSquared < minDist * minDist) {
        return true;
    }

    // Check collision between snake1's head and snake2's body
    for (let segment of snake2.segments) {
        dx = snake1.x - segment.x;
        dy = snake1.y - segment.y;
        distSquared = dx * dx + dy * dy;
        minDist = (snake1.length / 2 + segment.radius);
        
        if (distSquared < minDist * minDist) {
            return true;
        }
    }

    return false;
}

// Update leaderboard
function updateLeaderboard() {
    leaderboard = [{ name: "You", length: player.length }];
    for (let i = 0; i < ai.length; i++) {
        leaderboard.push({ name: `AI ${i+1}`, length: ai[i].length });
    }
    leaderboard.sort((a, b) => b.length - a.length);
}

// Draw leaderboard
function drawLeaderboard() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    ctx.fillRect(10, 10, 200, 110);
    ctx.fillStyle = 'white';
    ctx.font = '20px Arial';
    ctx.fillText("Leaderboard", 20, 40);
    for (let i = 0; i < Math.min(5, leaderboard.length); i++) {
        ctx.fillText(`${i+1}. ${leaderboard[i].name}: ${leaderboard[i].length}`, 20, 70 + i * 20);
    }
}

// Draw minimap
function drawMinimap() {
    minimapCtx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    minimapCtx.fillRect(0, 0, minimapCanvas.width, minimapCanvas.height);
    
    let playerX = player.x / WORLD_SIZE * minimapCanvas.width;
    let playerY = player.y / WORLD_SIZE * minimapCanvas.height;
    minimapCtx.fillStyle = 'green';
    minimapCtx.beginPath();
    minimapCtx.arc(playerX, playerY, 3, 0, Math.PI * 2);
    minimapCtx.fill();

    for (let snake of ai) {
        let x = snake.x / WORLD_SIZE * minimapCanvas.width;
        let y = snake.y / WORLD_SIZE * minimapCanvas.height;
        minimapCtx.fillStyle = snake.color;
        minimapCtx.beginPath();
        minimapCtx.arc(x, y, 2, 0, Math.PI * 2);
        minimapCtx.fill();
    }
}

// Game loop
function gameLoop() {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Move player
    moveSnake(player, 3);

    // Check collisions and update player
    checkFoodCollision(player);

    // Move and update AI
    for (let snake of ai) {
        moveSnake(snake, 2);
        if (checkFoodCollision(snake)) {
            snake.length += 1;
        }
        
        // Simple AI: change direction randomly
        if (Math.random() < 0.02) {
            snake.angle += (Math.random() - 0.5) * Math.PI / 8;
        }
    }

    // Check collisions between snakes
    for (let i = ai.length - 1; i >= 0; i--) {
        if (checkSnakeCollision(player, ai[i])) {
            if (player.length > ai[i].length) {
                player.length += ai[i].length / 2;
                ai.splice(i, 1);
                generateAI(1); // Generate a new AI snake to replace the eaten one
            } else {
                alert("Game Over!");
                resetGame();
                return;
            }
        }
    }

    // Check collisions between AI snakes
    for (let i = 0; i < ai.length; i++) {
        for (let j = i + 1; j < ai.length; j++) {
            if (checkSnakeCollision(ai[i], ai[j])) {
                if (ai[i].length > ai[j].length) {
                    ai[i].length += ai[j].length / 2;
                    ai.splice(j, 1);
                    j--; // Adjust index after removal
                    generateAI(1); // Generate a new AI snake to replace the eaten one
                } else {
                    ai[j].length += ai[i].length / 2;
                    ai.splice(i, 1);
                    i--; // Adjust index after removal
                    generateAI(1); // Generate a new AI snake to replace the eaten one
                    break; // Break inner loop as i is no longer valid
                }
            }
        }
    }

    // Update camera position
    camera.x = player.x - canvas.width / (2 * SCALE);
    camera.y = player.y - canvas.height / (2 * SCALE);

    // Draw everything
    drawFood();
    for (let snake of ai) {
        drawSnake(snake, false);
    }
    drawSnake(player, true);

    // Update and draw leaderboard
    updateLeaderboard();
    drawLeaderboard();

    // Draw minimap
    drawMinimap();

    requestAnimationFrame(gameLoop);
}

// Handle mouse/touch movement
function handlePointerMove(e) {
    let rect = canvas.getBoundingClientRect();
    let x = (e.clientX - rect.left) / SCALE + camera.x;
    let y = (e.clientY - rect.top) / SCALE + camera.y;
    player.angle = Math.atan2(y - player.y, x - player.x);
}

// Reset game
function resetGame() {
    player = { x: WORLD_SIZE/2, y: WORLD_SIZE/2, segments: [], angle: 0, length: 10 };
    ai = [];
    generateAI(20);
    food = [];
    generateFood(1000);
}

// Event listeners
canvas.addEventListener('mousemove', handlePointerMove);
canvas.addEventListener('touchmove', (e) => {
    e.preventDefault();
    handlePointerMove(e.touches[0]);
});

// Start game
resetGame();
gameLoop();