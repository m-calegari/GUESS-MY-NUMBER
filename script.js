'use strict';

let rightNumber = Math.floor(Math.random() * 20) + 1;
let score = document.querySelector('.score');
let highScore = Number(document.querySelector('.highscore').textContent);
let message = document.querySelector('.message');
let userNumber = document.querySelector('.guess');
const checkButton = document.querySelector('.btn.check');
const againButton = document.querySelector('.btn.again');
const configObserver = { attributes: true, childList: true, subtree: true };

function youLose() {
  if (score == 0) {
    message.textContent = 'You Lose!';
    checkButton.disabled = true;
    userNumber.disabled = true;
    document.querySelector('body').style.backgroundColor = '#810000';
    document.querySelector('.highscore').textContent = '0';
  }
}

const observer = new MutationObserver(youLose);
observer.observe(score, configObserver);

score = Number(score.textContent);

userNumber.addEventListener('input', () => {
  userNumber.value = userNumber.value.replace(/[^0-9]/g, '');

  if (Number(userNumber.value) < 1 || Number(userNumber.value) > 20) {
    userNumber.value = '';
  }
});

againButton.addEventListener('click', function () {
  rightNumber = Math.floor(Math.random() * 20) + 1;
  score = 20;
  document.querySelector('.score').textContent = score;
  message.textContent = 'Start guessing...';
  document.querySelector('body').style.backgroundColor = '#222';
  checkButton.disabled = false;
  userNumber.disabled = false;
  userNumber.value = '';
  console.log(rightNumber);
  console.log(score);
  console.log(highScore);
});

checkButton.addEventListener('click', function () {
  if (userNumber.value == rightNumber) {
    message.textContent = 'Correct Number!';
    highScore = Math.max(highScore, score);
    document.querySelector('.highscore').textContent = highScore;
    document.querySelector('body').style.backgroundColor = '#60b347';
    checkButton.disabled = true;
    userNumber.disabled = true;
  } else if (userNumber.value > rightNumber) {
    message.textContent = 'Too high!';
    score--;
    document.querySelector('.score').textContent = score;
  } else if (userNumber.value < rightNumber) {
    message.textContent = 'Too low!';
    score--;
    document.querySelector('.score').textContent = score;
  }
  console.log(userNumber.value);
});

console.log(rightNumber);
console.log(score);
console.log(highScore);

//inserir nome de quem esta jogando
// fazer o between embalhar as letras
// quando a pagina carregar fazer animação de entrada do jogo
// colocar musiquinha em loop
