'use strict';

let secretNumber = Math.trunc(Math.random() * 20) + 1;
let score = 20;
let highScore = 0;
const configObserver = { attributes: true, childList: true, subtree: true };
const between = document.querySelector('.between');
const callElement = function (element) {
  return document.querySelector(element);
};
const displayMessage = function (element, message) {
  callElement(element).textContent = message;
};
const changeColor = function (element, color) {
  callElement(element).style.backgroundColor = color;
};

//Observe changes in the score element to trigger the youLost function when the score reaches 0
const observer = new MutationObserver(youLost);
observer.observe(callElement('.score'), configObserver);

//Function to handle the "You Lost!" message and disable buttons when the score reaches 0
function youLost() {
  if (score === 0) {
    displayMessage('.message', 'You Lost!');
    displayMessage('.highscore', '0');
    callElement('.btn.check').disabled = true;
    callElement('.guess').disabled = true;
    changeColor('body', '#810000');
  }
}

// Variable to store the animation frame ID for the scramble effect
let animationId = null;

// Function to scramble the text content of an element with a random sequence of characters
function scrambleText(text) {
  const letters =
    '*¹²³£¢¬§¶•ªº–≠≤≥÷≈∞≡∑∏√∆∫∂∇∈∉∪∩⊂⊃⊆⊇⊕⊗⊥⋅⋆⋄⋆⋈⋉⋊⋋⋌⋍⋎⋏abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?/~`';
  const finalText = text.textContent;
  let iteration = 0;
  const originalText = text.dataset.original;

  // If an animation is already running, cancel it and reset the text content to the original text
  if (animationId !== null) {
    cancelAnimationFrame(animationId);
    animationId = null;
    text.textContent = originalText;
    animationId = requestAnimationFrame(update);
    return;
  }

  // Function to update the text content with a scrambled version of the original text
  function update() {
    // Generate a new scrambled text by replacing each character with a random character from the letters array
    text.textContent = finalText
      .split('')
      .map(char => {
        if (char === ' ') return ' ';
        return letters[Math.floor(Math.random() * letters.length)];
      })
      .join('');

    iteration += 1;
    // If the iteration count is less than 100, request the next animation frame to continue scrambling
    if (iteration < 100) {
      animationId = requestAnimationFrame(update);
    } else {
      text.textContent = originalText;
      animationId = null;
    }
  }
  animationId = requestAnimationFrame(update);
}

// Add an event listener to the userNumber input field to validate the input and scramble the text if the input is invalid
callElement('.guess').addEventListener('input', () => {
  callElement('.guess').value = callElement('.guess').value.replace(
    /[^0-9]/g,
    '',
  );

  if (
    Number(callElement('.guess').value) < 1 ||
    Number(callElement('.guess').value) > 20
  ) {
    callElement('.guess').value = '';
    scrambleText(between);
  }
});

// Add an event listener to the "Again" button to reset the game state and generate a new random number
callElement('.btn.again').addEventListener('click', function () {
  secretNumber = Math.floor(Math.random() * 20) + 1;
  score = 20;
  displayMessage('.score', score);
  displayMessage('.message', 'Start guessing...');
  changeColor('body', '#222');
  callElement('.btn.check').disabled = false;
  callElement('.guess').disabled = false;
  callElement('.guess').value = '';
  console.log(secretNumber);
  console.log(score);
  console.log(highScore);
});

// Add an event listener to the "Check" button to handle the user's guess and update the game state accordingly
callElement('.btn.check').addEventListener('click', function () {
  const guess = Number(callElement('.guess').value);
  // Check if the user has entered a number
  if (callElement('.guess').value === '') {
    // If the input is empty, scramble the text
    scrambleText(between);
  }
  // Check if the user's guess is correct
  else if (guess === secretNumber) {
    if (score >= highScore) {
      callElement('.highscore-container').insertAdjacentHTML(
        'beforeend',
        `<p class="label-highscore">${callElement('.yourName').value || 'Anonymous'}:<span class="previous-highscore"> ${score} </span></p>`,
      );
    }
    displayMessage('.message', 'Correct Number!');
    highScore = Math.max(highScore, score);
    // displayMessage('.highscore', highScore);
    changeColor('body', '#60b347');
    callElement('.btn.check').disabled = true;
    callElement('.guess').disabled = true;
  }
  // Check if the user's guess is too high or too low and update the score accordingly
  else if (guess !== secretNumber) {
    displayMessage('.message', guess > secretNumber ? 'Too high!' : 'Too low!');
    score--;
    displayMessage('.score', score);
  }

  callElement('.guess').value = '';
  console.log(callElement('.guess').value);
});

console.log(secretNumber);
console.log(score);
console.log(highScore);

//inserir nome de quem esta jogando, fazer ser obrigatorio - logica: contar elementos com a mesma classe, se nao houver armazenar ate 3 nomes, depois apenas substituir quando o score for maior que algum highscore armazenado
// quando a pagina carregar fazer animação de entrada do jogo
// colocar musiquinha em loop
