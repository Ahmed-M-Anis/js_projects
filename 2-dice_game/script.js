"use strict";
const totalScorePlayer0 = document.querySelector("#score--0");
totalScorePlayer0.textContent = 0;
const totalScorePlayer1 = document.querySelector("#score--1");
totalScorePlayer1.textContent = 0;
const player0 = document.querySelector(`.player--0`);
const player1 = document.querySelector(`.player--1`);

const dice = document.querySelector(".dice");
dice.classList.add("hidden");
let curScore = 0;
let activePlayer = 0;
let totalScore0 = 0;
let totalScore1 = 0;

const newGameBtm = document.querySelector(".btn--new");
const holdBtm = document.querySelector(".btn--hold");
const rollDiceBtm = document.querySelector(".btn--roll");

function changePlayer() {
  curScore = 0;
  document.querySelector(`#current--${activePlayer}`).textContent = curScore;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0.classList.toggle("player--active");
  player1.classList.toggle("player--active");
}

rollDiceBtm.addEventListener("click", function () {
  const rolling = Math.trunc(Math.random() * 6) + 1;

  dice.classList.remove("hidden");
  dice.src = `dice-${rolling}.png`;

  if (rolling !== 1) {
    curScore += rolling;
    document.querySelector(`#current--${activePlayer}`).textContent = curScore;
  } else {
    changePlayer();
  }
});

holdBtm.addEventListener("click", function () {
  if (activePlayer === 0) {
    totalScore0 += curScore;
    totalScorePlayer0.textContent = totalScore0;
  } else {
    totalScore1 += curScore;
    totalScorePlayer1.textContent = totalScore1;
  }
  changePlayer();
});

newGameBtm.addEventListener("click", function () {
  totalScorePlayer0.textContent = 0;
  totalScorePlayer1.textContent = 0;
  curScore = 0;
  dice.classList.add("hidden");
  document.querySelector(`#current--0`).textContent = 0;
  document.querySelector(`#current--1`).textContent = 0;
  activePlayer === 1 ? changePlayer() : "";
});
