const startButton = document.getElementById('start-button');
const gameScreen = document.getElementById('game-screen');
const guessInput = document.getElementById('guess-input');
const submitGuessButton = document.getElementById('submit-guess');
const feedback = document.getElementById('feedback');
const attemptsDisplay = document.getElementById('attempts');
const endScreen = document.getElementById('end-screen');
const finalMessage = document.getElementById('final-message');
const playAgainButton = document.getElementById('play-again');
let randomNumber;
let attempts;
startButton.addEventListener('click', () => {
    document.getElementById('start-screen').classList.add('hidden');
    gameScreen.classList.remove('hidden');
    resetGame();
});
submitGuessButton.addEventListener('click', () => {
    const guess = parseInt(guessInput.value);
    attempts++;
    attemptsDisplay.textContent = `Attempts: ${attempts}`;
    if (guess === randomNumber) {
        feedback.textContent = 'Correct!';
        endGame();
    } else if (guess > randomNumber) {
        feedback.textContent = 'Too high!';
    } else {
        feedback.textContent = 'Too low!';
    }
});
playAgainButton.addEventListener('click', () => {
    endScreen.classList.add('hidden');
    gameScreen.classList.remove('hidden');
    resetGame();
});
function resetGame() {
    randomNumber = Math.floor(Math.random() * 100) + 1;
    attempts = 0;
    feedback.textContent = '';
    attemptsDisplay.textContent = 'Attempts: 0';
    guessInput.value = '';
}
function endGame() {
    gameScreen.classList.add('hidden');
    endScreen.classList.remove('hidden');
    finalMessage.textContent = `You guessed the number in ${attempts} attempts.`;
}