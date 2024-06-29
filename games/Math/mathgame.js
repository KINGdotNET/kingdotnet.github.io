const questionEl = document.getElementById('question');
const answerEl = document.getElementById('answer');
const submitBtn = document.getElementById('submit');
const scoreEl = document.getElementById('score');
const timerEl = document.getElementById('timer');
const difficultyBtns = document.querySelectorAll('#difficulty button');
const shareButtons = document.getElementById('share-buttons');
const twitterShareBtn = document.getElementById('twitter-share');
const facebookShareBtn = document.getElementById('facebook-share');
const correctSound = document.getElementById('correct-sound');
const wrongSound = document.getElementById('wrong-sound');

let score = 0;
let timeLeft = 60;
let currentQuestion = {};
let difficulty = 'medium';
let timerInterval;

function setDifficulty(level) {
    difficulty = level;
    resetGame();
}

difficultyBtns.forEach(btn => {
    btn.addEventListener('click', () => setDifficulty(btn.id));
});

function generateQuestion() {
    const operations = ['+', '-', '*', '/'];
    const operation = operations[Math.floor(Math.random() * operations.length)];
    let num1, num2;

    switch (difficulty) {
        case 'easy':
            num1 = Math.floor(Math.random() * 10) + 1;
            num2 = Math.floor(Math.random() * 10) + 1;
            break;
        case 'medium':
            num1 = Math.floor(Math.random() * 50) + 1;
            num2 = Math.floor(Math.random() * 50) + 1;
            break;
        case 'hard':
            num1 = Math.floor(Math.random() * 100) + 1;
            num2 = Math.floor(Math.random() * 100) + 1;
            break;
    }

    let question, answer;

    switch (operation) {
        case '+':
            question = `${num1} + ${num2}`;
            answer = num1 + num2;
            break;
        case '-':
            question = `${num1} - ${num2}`;
            answer = num1 - num2;
            break;
        case '*':
            question = `${num1} × ${num2}`;
            answer = num1 * num2;
            break;
        case '/':
            answer = num1;
            num1 = num1 * num2;
            question = `${num1} ÷ ${num2}`;
            break;
    }

    if (difficulty === 'hard') {
        const complexOperations = ['√', '^2', '%'];
        const complexOp = complexOperations[Math.floor(Math.random() * complexOperations.length)];
        switch (complexOp) {
            case '√':
                question = `√(${answer})`;
                answer = Math.sqrt(answer);
                break;
            case '^2':
                question = `(${answer})^2`;
                answer = Math.pow(answer, 2);
                break;
            case '%':
                question = `${answer}% of 100`;
                break;
        }
    }

    return { question, answer: Math.round(answer * 100) / 100 };
}

function updateQuestion() {
    currentQuestion = generateQuestion();
    questionEl.textContent = currentQuestion.question;
    answerEl.value = '';
    answerEl.focus();
}

function checkAnswer() {
    const userAnswer = parseFloat(answerEl.value);
    if (Math.abs(userAnswer - currentQuestion.answer) < 0.01) {
        score++;
        scoreEl.textContent = `Score: ${score}`;
        correctSound.play();
        updateQuestion();
    } else {
        wrongSound.play();
        answerEl.value = '';
        answerEl.focus();
    }
}

function updateTimer() {
    timeLeft--;
    timerEl.textContent = `Time: ${timeLeft}`;

    if (timeLeft === 0) {
        endGame();
    }
}

function endGame() {
    clearInterval(timerInterval);
    questionEl.textContent = 'Game Over!';
    answerEl.style.display = 'none';
    submitBtn.style.display = 'none';
    timerEl.textContent = `Final Score: ${score}`;
    shareButtons.style.display = 'block';
}

function resetGame() {
    clearInterval(timerInterval);
    score = 0;
    timeLeft = 60;
    scoreEl.textContent = `Score: ${score}`;
    timerEl.textContent = `Time: ${timeLeft}`;
    answerEl.style.display = 'inline';
    submitBtn.style.display = 'inline';
    shareButtons.style.display = 'none';
    updateQuestion();
    timerInterval = setInterval(updateTimer, 1000);
}

function shareOnTwitter() {
    const text = `I scored ${score} points in the Advanced Math Challenge (${difficulty} mode)! Can you beat my score? Play now!`;
    const url = 'https://king.net/games/Math/math.html';
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
}

function shareOnFacebook() {
    const url = 'https://king.net/games/Math/math.html';
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
}

submitBtn.addEventListener('click', checkAnswer);
answerEl.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
        checkAnswer();
    }
});

twitterShareBtn.addEventListener('click', shareOnTwitter);
facebookShareBtn.addEventListener('click', shareOnFacebook);

resetGame();