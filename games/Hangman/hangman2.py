import random
import time
import json
from datetime import datetime

try:
    import pyperclip
except ImportError:
    print("pyperclip module not found. Install it for clipboard functionality.")
    pyperclip = None

# SVG graphics for hangman stages
HANGMAN_PICS = [
    '''
    <svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
        <line x1="20" y1="180" x2="180" y2="180" stroke="black" />
        <line x1="40" y1="180" x2="40" y2="20" stroke="black" />
        <line x1="40" y1="20" x2="120" y2="20" stroke="black" />
        <line x1="120" y1="20" x2="120" y2="40" stroke="black" />
    </svg>
    ''',
    '''
    <svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
        <line x1="20" y1="180" x2="180" y2="180" stroke="black" />
        <line x1="40" y1="180" x2="40" y2="20" stroke="black" />
        <line x1="40" y1="20" x2="120" y2="20" stroke="black" />
        <line x1="120" y1="20" x2="120" y2="40" stroke="black" />
        <circle cx="120" cy="60" r="20" stroke="black" fill="none" />
    </svg>
    ''',
    '''
    <svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
        <line x1="20" y1="180" x2="180" y2="180" stroke="black" />
        <line x1="40" y1="180" x2="40" y2="20" stroke="black" />
        <line x1="40" y1="20" x2="120" y2="20" stroke="black" />
        <line x1="120" y1="20" x2="120" y2="40" stroke="black" />
        <circle cx="120" cy="60" r="20" stroke="black" fill="none" />
        <line x1="120" y1="80" x2="120" y2="130" stroke="black" />
    </svg>
    ''',
    '''
    <svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
        <line x1="20" y1="180" x2="180" y2="180" stroke="black" />
        <line x1="40" y1="180" x2="40" y2="20" stroke="black" />
        <line x1="40" y1="20" x2="120" y2="20" stroke="black" />
        <line x1="120" y1="20" x2="120" y2="40" stroke="black" />
        <circle cx="120" cy="60" r="20" stroke="black" fill="none" />
        <line x1="120" y1="80" x2="120" y2="130" stroke="black" />
        <line x1="120" y1="90" x2="90" y2="120" stroke="black" />
    </svg>
    ''',
    '''
    <svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
        <line x1="20" y1="180" x2="180" y2="180" stroke="black" />
        <line x1="40" y1="180" x2="40" y2="20" stroke="black" />
        <line x1="40" y1="20" x2="120" y2="20" stroke="black" />
        <line x1="120" y1="20" x2="120" y2="40" stroke="black" />
        <circle cx="120" cy="60" r="20" stroke="black" fill="none" />
        <line x1="120" y1="80" x2="120" y2="130" stroke="black" />
        <line x1="120" y1="90" x2="90" y2="120" stroke="black" />
        <line x1="120" y1="90" x2="150" y2="120" stroke="black" />
    </svg>
    ''',
    '''
    <svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
        <line x1="20" y1="180" x2="180" y2="180" stroke="black" />
        <line x1="40" y1="180" x2="40" y2="20" stroke="black" />
        <line x1="40" y1="20" x2="120" y2="20" stroke="black" />
        <line x1="120" y1="20" x2="120" y2="40" stroke="black" />
        <circle cx="120" cy="60" r="20" stroke="black" fill="none" />
        <line x1="120" y1="80" x2="120" y2="130" stroke="black" />
        <line x1="120" y1="90" x2="90" y2="120" stroke="black" />
        <line x1="120" y1="90" x2="150" y2="120" stroke="black" />
        <line x1="120" y1="130" x2="90" y2="160" stroke="black" />
    </svg>
    ''',
    '''
    <svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
        <line x1="20" y1="180" x2="180" y2="180" stroke="black" />
        <line x1="40" y1="180" x2="40" y2="20" stroke="black" />
        <line x1="40" y1="20" x2="120" y2="20" stroke="black" />
        <line x1="120" y1="20" x2="120" y2="40" stroke="black" />
        <circle cx="120" cy="60" r="20" stroke="black" fill="none" />
        <line x1="120" y1="80" x2="120" y2="130" stroke="black" />
        <line x1="120" y1="90" x2="90" y2="120" stroke="black" />
        <line x1="120" y1="90" x2="150" y2="120" stroke="black" />
        <line x1="120" y1="130" x2="90" y2="160" stroke="black" />
        <line x1="120" y1="130" x2="150" y2="160" stroke="black" />
    </svg>
    '''
]

def choose_word(category, difficulty):
    words = {
        "animals": {
            "easy": ["cat", "dog", "cow", "pig", "hen"],
            "medium": ["elephant", "giraffe", "penguin", "leopard", "kangaroo"],
            "hard": ["platypus", "chimpanzee", "hippopotamus", "rhinoceros", "chameleon"]
        },
        "countries": {
            "easy": ["usa", "china", "india", "brazil", "canada"],
            "medium": ["australia", "germany", "nigeria", "argentina", "sweden"],
            "hard": ["kazakhstan", "mozambique", "azerbaijan", "kyrgyzstan", "mauritius"]
        },
        "fruits": {
            "easy": ["apple", "banana", "orange", "grape", "mango"],
            "medium": ["pineapple", "strawberry", "watermelon", "blueberry", "kiwi"],
            "hard": ["dragonfruit", "passionfruit", "lychee", "rambutan", "durian"]
        }
    }
    return random.choice(words[category][difficulty])

def display_word(word, guessed_letters):
    return ' '.join(letter if letter in guessed_letters else '_' for letter in word)

def get_difficulty():
    while True:
        difficulty = input("Choose difficulty (easy/medium/hard): ").lower()
        if difficulty in ["easy", "medium", "hard"]:
            return difficulty
        print("Invalid difficulty. Please choose easy, medium, or hard.")

def get_category():
    categories = ["animals", "countries", "fruits"]
    while True:
        print("Available categories:", ', '.join(categories))
        category = input("Choose a category: ").lower()
        if category in categories:
            return category
        print("Invalid category. Please choose from the available options.")

def load_leaderboard():
    try:
        with open("leaderboard.json", "r") as f:
            return json.load(f)
    except FileNotFoundError:
        return []

def save_leaderboard(leaderboard):
    with open("leaderboard.json", "w") as f:
        json.dump(leaderboard, f)

def update_leaderboard(player_name, score):
    leaderboard = load_leaderboard()
    leaderboard.append({"name": player_name, "score": score, "date": datetime.now().strftime("%Y-%m-%d %H:%M:%S")})
    leaderboard.sort(key=lambda x: x["score"], reverse=True)
    leaderboard = leaderboard[:10]  # Keep only top 10
    save_leaderboard(leaderboard)

def display_leaderboard():
    leaderboard = load_leaderboard()
    print("\n--- LEADERBOARD ---")
    for i, entry in enumerate(leaderboard, 1):
        print(f"{i}. {entry['name']}: {entry['score']} points ({entry['date']})")
    print("-------------------\n")

def share_result(word, guesses, won):
    result = f"I {'won' if won else 'lost'} Hangman! The word was '{word}'. I made {guesses} guesses."
    print("\nShare your result:")
    print(f"Twitter: https://twitter.com/intent/tweet?text={result}")
    print(f"Facebook: https://www.facebook.com/sharer/sharer.php?u=&quote={result}")
    if pyperclip:
        pyperclip.copy(result)
        print("Result copied to clipboard!")

def calculate_score(difficulty, time_taken, guesses, won):
    if not won:
        return 0
    
    difficulty_multiplier = {"easy": 1, "medium": 1.5, "hard": 2}
    base_score = 1000 * difficulty_multiplier[difficulty]
    time_penalty = time_taken * 5
    guess_penalty = guesses * 10
    
    return max(0, int(base_score - time_penalty - guess_penalty))

def hangman():
    difficulty = get_difficulty()
    category = get_category()
    word = choose_word(category, difficulty)
    word_letters = set(word)
    alphabet = set('abcdefghijklmnopqrstuvwxyz')
    guessed_letters = set()

    lives = 8 if difficulty == "easy" else 6 if difficulty == "medium" else 4
    start_time = time.time()
    guesses = 0

    print(f"\nYou're playing {difficulty} mode with {lives} lives. Category: {category}")

    while len(word_letters) > 0 and lives > 0:
        print("\n" + HANGMAN_PICS[8 - lives])
        print("\nYou have", lives, "lives left and you have used these letters: ", ' '.join(guessed_letters))

        word_list = display_word(word, guessed_letters)
        print("Current word: ", word_list)

        guess = input("Guess a letter: ").lower()
        guesses += 1

        if guess in alphabet - guessed_letters:
            guessed_letters.add(guess)
            if guess in word_letters:
                word_letters.remove(guess)
                print("Good guess!")
            else:
                lives = lives - 1
                print("Wrong guess. You lose a life.")
        elif guess in guessed_letters:
            print("You have already guessed that letter. Please try again.")
        else:
            print("Invalid character. Please try again.")

    end_time = time.time()
    time_taken = int(end_time - start_time)

    if lives == 0:
        print("\n" + HANGMAN_PICS[-1])
        print("Sorry, you ran out of lives. The word was", word)
        won = False
    else:
        print("Congratulations! You guessed the word", word, "!!")
        won = True

    score = calculate_score(difficulty, time_taken, guesses, won)
    print(f"\nYour score: {score}")
    player_name = input("Enter your name for the leaderboard: ")
    update_leaderboard(player_name, score)
    share_result(word, guesses, won)

    return score

def play_game():
    while True:
        score = hangman()
        display_leaderboard()
        if input("Do you want to play again? (yes/no) ").lower() != 'yes':
            break
    print("Thanks for playing Hangman!")

if __name__ == "__main__":
    play_game()