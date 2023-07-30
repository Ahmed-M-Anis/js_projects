"use strict";

let mystryNumber = Math.trunc(Math.random() * 20) + 1;
console.log(mystryNumber);
let score = 20;
let highest = 0;

function highstScore(curScore) {guess
  if (highest < curScore) {
    highest = curScore;
  }
  document.querySelector(".highscore").textContent = highest;
}

function losingRound() {
  if (score < 1) {
    document.querySelector(".message").textContent = "lost";
    return;
  }
  score--;
  document.querySelector(".score").textContent = score;
}

document.querySelector(".check").addEventListener("click", function () {
  const guess = Number(document.querySelector(".guess").value);

  if (!guess) {
    document.querySelector(".message").textContent = "unvalidValue";
  } else if (mystryNumber === guess) {
    document.querySelector(".message").textContent = "winner";
    document.querySelector(".number").textContent = guess;
    highstScore(score);
  } else if (mystryNumber < guess) {
    document.querySelector(".message").textContent = "high";
    losingRound();
  } else if (mystryNumber > guess) {
    document.querySelector(".message").textContent = "low";
    losingRound();
  }
});

document.querySelector(".again").addEventListener("click", function () {
  document.querySelector(".number").textContent = "?";
  score = 20;
  document.querySelector(".score").textContent = score;
  mystryNumber = Math.trunc(Math.random() * 20) + 1;
  document.querySelector(".message").textContent = "Start guessing...";
});
