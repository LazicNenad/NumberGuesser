let min = 1;
let max = 10;
let winningNum = getRandomInt(min, max);
console.log(winningNum);
let attemptsLeft = 3;

// UI Elements
const gameWrapper = document.querySelector('#game');
const guessBtn = document.querySelector('#guess-btn');
const guessInput = document.querySelector('#guess-input');
const message = document.querySelector('.message');

guessBtn.addEventListener('click', () => {
  const guessNum = parseInt(guessInput.value);

  if (isNaN(guessNum) || guessNum < min || guessNum > max) {
    showMessage(`Please enter number between ${min} & ${max}`, 'red');
    guessInput.style.borderColor = 'red';
    return;
  }

  if (guessNum === winningNum) {
    gameOver(true, `${winningNum} is correct, u win`);
  } else {
    attemptsLeft--;
    if (attemptsLeft <= 0) {
      gameOver(false, `You Lost, Number was ${winningNum}`);
      return;
    }
    guessInput.style.borderColor = 'red';
    guessInput.value = '';
    showMessage(
      `${guessNum} is not correct, ${attemptsLeft} attempts left`,
      'red'
    );
  }
});

gameWrapper.addEventListener('mousedown', (e) => {
  if (e.target.classList.contains('play-again')) {
    window.location.reload();
  }
});

function showMessage(msg, color) {
  message.style.color = color;
  message.textContent = msg;
}

function gameOver(won, msg) {
  let color;
  won == true ? (color = 'green') : (color = 'red');

  guessInput.disabled = true;
  guessInput.style.borderColor = color;
  showMessage(msg, color);
  guessBtn.value = 'Play again';
  guessBtn.classList.add('play-again');
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
