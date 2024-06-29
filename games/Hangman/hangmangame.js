const words = ['javascript', 'hangman', 'developer', 'programming', 'computer', 'algorithm', 'database', 'internet'];
let word = '';
let guessedLetters = [];
let remainingGuesses = 6;

const wordDisplayEl = document.getElementById('word-display');
const guessInputEl = document.getElementById('guess-input');
const guessButtonEl = document.getElementById('guess-button');
const messageEl = document.getElementById('message');
const hangmanEl = document.getElementById('hangman');
const guessedLettersEl = document.getElementById('guessed-letters');

const hangmanStages = [
    '  +---+\n  |   |\n      |\n      |\n      |\n      |\n=========',
    '  +---+\n  |   |\n  O   |\n      |\n      |\n      |\n=========',
    '  +---+\n  |   |\n  O   |\n  |   |\n      |\n      |\n=========',
    '  +---+\n  |   |\n  O   |\n /|   |\n      |\n      |\n=========',
    '  +---+\n  |   |\n  O   |\n /|\\  |\n      |\n      |\n=========',
    '  +---+\n  |   |\n  O   |\n /|\\  |\n /    |\n      |\n=========',
    '  +---+\n  |   |\n  O   |\n /|\\  |\n / \\  |\n      |\n========='
];

function initGame() {
    word = words[Math.floor(Math.random() * words.length)];
    guessedLetters = [];
    remainingGuesses = 6;
    updateWordDisplay();
    updateHangman();
    updateGuessedLetters();
    messageEl.textContent = '';
    guessInputEl.value = '';
    guessInputEl.focus();
}

function updateWordDisplay() {
    wordDisplayEl.textContent = word
        .split('')
        .map(letter => guessedLetters.includes(letter) ? letter : '_')
        .join(' ');
}

function updateHangman() {
    hangmanEl.textContent = hangmanStages[6 - remainingGuesses];
}

function updateGuessedLetters() {
    guessedLettersEl.textContent = `Guessed letters: ${guessedLetters.join(', ')}`;
}

function makeGuess() {
    const guess = guessInputEl.value.toLowerCase();
    guessInputEl.value = '';

    if (guess.length !== 1 || !/[a-z]/.test(guess)) {
        messageEl.textContent = 'Please enter a single letter.';
        return;
    }

    if (guessedLetters.includes(guess)) {
        messageEl.textContent = 'You already guessed that letter.';
        return;
    }

    guessedLetters.push(guess);

    if (word.includes(guess)) {
        updateWordDisplay();
        messageEl.textContent = 'Good guess!';
    } else {
        remainingGuesses--;
        updateHangman();
        messageEl.textContent = 'Wrong guess!';
    }

    updateGuessedLetters();

    if (wordDisplayEl.textContent.replace(/ /g, '') === word) {
        messageEl.textContent = 'Congratulations! You won!';
        guessInputEl.disabled = true;
        guessButtonEl.disabled = true;
    } else if (remainingGuesses === 0) {
        messageEl.textContent = `Game over! The word was "${word}".`;
        guessInputEl.disabled = true;
        guessButtonEl.disabled = true;
    }
}

guessButtonEl.addEventListener('click', makeGuess);
guessInputEl.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
        makeGuess();
    }
});

initGame();