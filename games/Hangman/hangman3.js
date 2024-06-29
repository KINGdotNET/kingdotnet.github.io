const words = {
    animals: {
        easy: ["cat", "dog", "cow", "pig", "hen"],
        medium: ["elephant", "giraffe", "penguin", "leopard", "kangaroo"],
        hard: ["platypus", "chimpanzee", "hippopotamus", "rhinoceros", "chameleon"]
    },
    countries: {
        easy: ["usa", "china", "india", "brazil", "canada"],
        medium: ["australia", "germany", "nigeria", "argentina", "sweden"],
        hard: ["kazakhstan", "mozambique", "azerbaijan", "kyrgyzstan", "mauritius"]
    },
    fruits: {
        easy: ["apple", "banana", "orange", "grape", "mango"],
        medium: ["pineapple", "strawberry", "watermelon", "blueberry", "kiwi"],
        hard: ["dragonfruit", "passionfruit", "lychee", "rambutan", "durian"]
    }
};

const HANGMAN_PICS = [
    '<line x1="20" y1="180" x2="180" y2="180" stroke="black" />',
    '<line x1="40" y1="180" x2="40" y2="20" stroke="black" />',
    '<line x1="40" y1="20" x2="120" y2="20" stroke="black" />',
    '<line x1="120" y1="20" x2="120" y2="40" stroke="black" />',
    '<circle cx="120" cy="60" r="20" stroke="black" fill="none" />',
    '<line x1="120" y1="80" x2="120" y2="130" stroke="black" />',
    '<line x1="120" y1="90" x2="90" y2="120" stroke="black" />',
    '<line x1="120" y1="90" x2="150" y2="120" stroke="black" />',
    '<line x1="120" y1="130" x2="90" y2="160" stroke="black" />',
    '<line x1="120" y1="130" x2="150" y2="160" stroke="black" />'
];

let word, category, difficulty, guessedLetters, lives, startTime, guesses;

function startGame() {
    category = document.getElementById('category').value;
    difficulty = document.getElementById('difficulty').value;
    word = chooseWord(category, difficulty);
    guessedLetters = new Set();
    lives = difficulty === 'easy' ? 8 : (difficulty === 'medium' ? 6 : 4);
    startTime = Date.now();
    guesses = 0;

    document.getElementById('game-setup').style.display = 'none';
    document.getElementById('game-area').style.display = 'block';
    updateDisplay();
}

function chooseWord(category, difficulty) {
    const wordList = words[category][difficulty];
    return wordList[Math.floor(Math.random() * wordList.length)];
}

function updateDisplay() {
    // Update hangman SVG
    document.getElementById('hangman-svg').innerHTML = HANGMAN_PICS.slice(0, 10 - lives).join('');

    // Update word display
    const wordDisplay = word.split('').map(letter => guessedLetters.has(letter) ? letter : '_').join(' ');
    document.getElementById('word-display').textContent = wordDisplay;

    // Update guessed letters
    document.getElementById('guessed-letters').textContent = `Guessed letters: ${Array.from(guessedLetters).join(', ')}`;

    // Update message
    document.getElementById('message').textContent = `You have ${lives} lives left.`;
}

function makeGuess() {
    const guessInput = document.getElementById('guess-input');
    const guess = guessInput.value.toLowerCase();
    guessInput.value = '';

    if (guess.length !== 1 || !/[a-z]/.test(guess)) {
        alert('Please enter a single letter.');
        return;
    }

    guesses++;

    if (guessedLetters.has(guess)) {
        alert('You already guessed that letter.');
        return;
    }

    guessedLetters.add(guess);

    if (!word.includes(guess)) {
        lives--;
    }

    updateDisplay();

    if (lives === 0) {
        endGame(false);
    } else if (word.split('').every(letter => guessedLetters.has(letter))) {
        endGame(true);
    }
}

function endGame(won) {
    const timeTaken = Math.floor((Date.now() - startTime) / 1000);
    const score = calculateScore(difficulty, timeTaken, guesses, won);

    let message = won ? `Congratulations! You guessed the word "${word}"!` : `Game over. The word was "${word}".`;
    message += `\nYour score: ${score}`;

    document.getElementById('message').textContent = message;
    document.getElementById('guess-input').disabled = true;

    const playerName = prompt('Enter your name for the leaderboard:');
    updateLeaderboard(playerName, score);
    displayLeaderboard();

    shareResult(word, guesses, won);
}

function calculateScore(difficulty, timeTaken, guesses, won) {
    if (!won) return 0;

    const difficultyMultiplier = {easy: 1, medium: 1.5, hard: 2};
    const baseScore = 1000 * difficultyMultiplier[difficulty];
    const timePenalty = timeTaken * 5;
    const guessPenalty = guesses * 10;

    return Math.max(0, Math.floor(baseScore - timePenalty - guessPenalty));
}

function updateLeaderboard(playerName, score) {
    let leaderboard = JSON.parse(localStorage.getItem('hangmanLeaderboard') || '[]');
    leaderboard.push({name: playerName, score: score, date: new Date().toISOString()});
    leaderboard.sort((a, b) => b.score - a.score);
    leaderboard = leaderboard.slice(0, 10);  // Keep only top 10
    localStorage.setItem('hangmanLeaderboard', JSON.stringify(leaderboard));
}

function displayLeaderboard() {
    const leaderboard = JSON.parse(localStorage.getItem('hangmanLeaderboard') || '[]');
    const leaderboardHtml = leaderboard.map((entry, index) => 
        `<p>${index + 1}. ${entry.name}: ${entry.score} points (${new Date(entry.date).toLocaleString()})</p>`
    ).join('');
    document.getElementById('leaderboard').innerHTML = `<h2>Leaderboard</h2>${leaderboardHtml}`;
}

function shareResult(word, guesses, won) {
    const result = `I ${won ? 'won' : 'lost'} Hangman! The word was '${word}'. I made ${guesses} guesses.`;
    alert(`Share your result:\n\n${result}\n\nThis text has been copied to your clipboard.`);
    navigator.clipboard.writeText(result).catch(err => console.error('Could not copy text: ', err));
}

// Initialize leaderboard on page load
displayLeaderboard();