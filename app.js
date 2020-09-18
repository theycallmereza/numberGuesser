// Game values
let min = 1, max = 10, winningNum = getRandomNumber(min, max), guessesLeft = 3;

// UI Elements
const game = document.querySelector("#game");
const minNum = document.querySelector('.min-num');
const maxNum = document.querySelector('.max-num');
const guessBtn = document.querySelector("#guess-btn");
const guessInput = document.querySelector('#guess-input');
const message = document.querySelector(".message");

// Assign min and max
minNum.textContent = min;
maxNum.textContent = max;

// Play again
game.addEventListener('mousedown', function (e) {
    if (e.target.className === "play-again") {
        window.location.reload();
    }
});

// Listen for guess
guessBtn.addEventListener('click', function (e) {
    let guess = parseInt(guessInput.value);

    // Validate
    if (isNaN(guess) || guess < min || guess > max) {
        setMessage(`Please enter a number between ${min} and ${max}`, 'red');
    }

    // check if won
    if (guess === winningNum) {
        // Game Over - Won
        gameOver(true, `${winningNum} is correct, YOU WIN!`)
    } else {
        // Wrong number
        guessesLeft -= 1;
        if (guessesLeft === 0) {
            // Game Over - Lost
            gameOver(false, `Game Over, YOU LOST! the correct number was ${winningNum}`)
        } else {
            // Game Continues - answer wrong
            guessInput.value = '';
            guessInput.style.borderColor = 'red';
            setMessage(`${guess} is not correct, ${guessesLeft} guesses left`, 'red');
        }
    }
});

// Game over
function gameOver(won, msg) {
    color = won ? 'green' : 'red';
    // Disable Input
    guessInput.disabled = true;
    // Change border color
    guessInput.style.borderColor = color;
    // set message
    setMessage(msg, color);

    // Play again
    guessBtn.value = "Play Again?";
    guessBtn.className += "play-again"
}

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

// Set Message
function setMessage(msg, color) {
    message.style.color = color;
    message.textContent = msg;
}
