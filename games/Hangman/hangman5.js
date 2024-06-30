const words = {
    animals: {
        easy: ["cat", "dog", "cow", "pig", "hen", "Mouse", "wolf", "sake", "horse", "whale", "Bear", "Deer", "Fish", "Worm", "Frog", "Gecko", "Wren", "Finch", "Hawk"],
        medium: ["elephant", "giraffe", "penguin", "leopard", "kangaroo", "Wombat", "Ferret", "Badger", "Coyote", "Panda", "Koala", "Dingo", "Tapir", "Lemur", "Viper", "Iguana", "Macaw", "Donkey", "Opossum", "Guinea Pig", "Warthog", "Jackal", "Coyote", "Vole", "Heron", "Buzzard", "Cougar", "Viper", "Ferret", "Weasel", "Mongoose", "Prairie Dog", "Marmot", "Shrew", "Stoat", "Beaver", "Rabbit", "Vixen", "Falcon", "Kestrel", "Thrush", "Blackbird", "Robin", "Finch", "Sparrow", "Parrot", "Condor", "Vulture", "Cassowary", "Echidna", "Axolotl", "Manatee"],
        hard: ["platypus", "chimpanzee", "hippopotamus", "rhinoceros", "chameleon", "Gorilla", "Hippopotamus", "Rhinoceros", "Butterfly", "Alligator", "Chameleon", "Gazelle", "Kangaroo", "Orangutan", "Salamander", "Walrus", "Wolverine", "Zebra", "Narwhal", "Peacock", "Porcupine", "Rattlesnake", "Seahorse", "Secretarybird", "Starfish", "Swordfish", "Tarantula", "Termite", "Vulture", "Waterbuffalo", "Pangolin", "Saola", "Komondor", "Tardigrade", "Shoebill Stork"]
    },
    countries: {
        easy: ["usa", "china", "india", "brazil", "canada", "Chad", "Chile", "China", "Cuba", "Egypt", "Fiji", "Ghana", "Haiti", "India", "Iran", "Iraq", "Italy", "Japan", "Kenya", "Laos", "Libya", "Mali", "Malta", "Nepal", "Niger", "Oman", "Peru", "Qatar", "Samoa", "Spain", "Sudan", "Syria", "Togo", "Tonga", "Yemen"],
        medium: ["australia", "germany", "nigeria", "argentina", "sweden", "Argentina", "Australia", "Azerbaijan", "Bangladesh", "Colombia", "Democratic Republic of the Congo", "Denmark", "Ethiopia", "Indonesia", "Malaysia", "Netherlands", "Nicaragua", "New Zealand", "Nigeria", "Pakistan", "Philippines", "Portugal", "Romania", "Switzerland", "Thailand", "Venezuela", "Vietnam", "Zimbabwe"],
        hard: ["kazakhstan", "mozambique", "azerbaijan", "kyrgyzstan", "mauritius", "United Kingdom", "South Africa", "United States", "Federated States of Micronesia", "Solomon Islands", "Marshall Islands", "Saint Vincent and the Grenadines", "Dominican Republic", "Saint Lucia", "Antigua and Barbuda", "Grenada", "Cook Islands", "Palau", "Tuvalu", "Kiribati", "Nauru", "Seychelles", "Madagascar", "Turkmenistan", "Bhutan", "Tajikistan", "Moldova", "Montenegro"]
    },
    fruits: {
        easy: ["apple", "banana", "orange", "grape", "mango", "Fig", "Kiwi", "Date", "Plum", "Pear", "Mango", "Grape", "Peach", "Lime", "Berry"],
        medium: ["pineapple", "strawberry", "watermelon", "blueberry", "kiwi", "Watermelon", "Grapefruit", "Pineapple", "Pomegranate", "Cantaloupe", "Honeydew", "Papaya", "Mangoesteen"],
        hard: ["dragonfruit", "passionfruit", "lychee", "rambutan", "durian", "Passionfruit", "Starfruit", "Dragonfruit", "Rambutan", "Mangosteen", "Guavaberry", "Blackberry", "Gooseberry", "Cranberry", "Durianfruit", "Passionfruit", "Starfruit", "Dragonfruit", "Physalis", "Cupuacu", "Cherimoya"]
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
    document.getElementById('guess-input').disabled = false;
    document.getElementById('restart-button').style.display = 'none';
    document.querySelector('.share-buttons').style.display = 'none';
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
    document.getElementById('restart-button').style.display = 'block';
    document.querySelector('.share-buttons').style.display = 'block';

    const playerName = prompt('Enter your name for the leaderboard:');
    updateLeaderboard(playerName, score);
    displayLeaderboard();
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

function restartGame() {
    document.getElementById('game-setup').style.display = 'block';
    document.getElementById('game-area').style.display = 'none';
    document.getElementById('restart-button').style.display = 'none';
    document.querySelector('.share-buttons').style.display = 'none';
}

function shareToTwitter() {
    const text = encodeURIComponent(`I ${lives > 0 ? 'won' : 'lost'} Hangman! The word was '${word}'. I made ${guesses} guesses. Play now!`);
    const url = `https://twitter.com/intent/tweet?text=${text}`;
    window.open(url, '_blank');
}

function shareToFacebook() {
    const text = encodeURIComponent(`I ${lives > 0 ? 'won' : 'lost'} Hangman! The word was '${word}'. I made ${guesses} guesses. Play now!`);
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}&quote=${text}`;
    window.open(url, '_blank');
}

// Initialize leaderboard on page load
displayLeaderboard();