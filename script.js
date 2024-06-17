'use strict';

// Creating variables
const score0El = document.getElementById('score--0'); // Player 1
const score1El = document.getElementById('score--1'); // PLayer 2
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

//Initial conditions of the game
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');
let activePlayer = 0;
const scores = [0, 0];
let playing = true; // this is a state variable

let currentScore = 0;

// Rolling dice functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    const dice = Math.trunc(Math.random() * 6) + 1;
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    if (dice !== 1) {
      currentScore = currentScore + dice; // currentScore += dice
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      document.getElementById(`current--${activePlayer}`).textContent = 0;
      activePlayer = activePlayer === 0 ? 1 : 0;
      currentScore = 0;
      player0El.classList.toggle('player--active');
      player1El.classList.toggle('player--active');
    }
  }
});

// When hold button is clicked

btnHold.addEventListener('click', function () {
  if (playing) {
    scores[activePlayer] += currentScore; //   scores[1] = scores[1] + currentScore

    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    if (scores[activePlayer] >= 20) {
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      //   document.getElementById(`name--${activePlayer}`).textContent =
      //     'Player Won';
    } else {
      document.getElementById(`current--${activePlayer}`).textContent = 0;
      activePlayer = activePlayer === 0 ? 1 : 0;
      currentScore = 0;
      player0El.classList.toggle('player--active');
      player1El.classList.toggle('player--active');
    }
  }
});

// Resetting the game  // Onhold

btnNew.addEventListener('click', function () {
  diceEl.classList.add('hidden');
  document.getElementById(`current--${activePlayer}`).textContent = 0;

  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--winner');

  document
    .querySelector(`.player--${activePlayer}`)
    .classList.add('player--active');
  document.getElementById(`score--${activePlayer}`).textContent = 0;
});
