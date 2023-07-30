"use strict";

// Data
const account1 = {
  owner: "Jonas Schmedtmann",
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    "2019-11-18T21:31:17.178Z",
    "2019-12-23T07:42:02.383Z",
    "2020-01-28T09:15:04.904Z",
    "2020-04-01T10:17:24.185Z",
    "2020-05-08T14:11:59.604Z",
    "2020-05-27T17:01:17.194Z",
    "2020-07-11T23:36:17.929Z",
    "2020-07-12T10:51:36.790Z",
  ],
  locale: "pt-PT", // de-DE
};

const account2 = {
  owner: "Jessica Davis",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    "2019-11-01T13:15:33.035Z",
    "2019-11-30T09:48:16.867Z",
    "2019-12-25T06:04:23.907Z",
    "2020-01-25T14:18:46.235Z",
    "2020-02-05T16:33:06.386Z",
    "2020-04-10T14:43:26.374Z",
    "2020-06-25T18:49:59.371Z",
    "2020-07-26T12:01:20.894Z",
  ],
  locale: "en-US",
};

const accounts = [account1, account2];

// Elements
const labelWelcome = document.querySelector(".welcome");
const labelDate = document.querySelector(".date");
const labelBalance = document.querySelector(".balance__value");
const labelSumIn = document.querySelector(".summary__value--in");
const labelSumOut = document.querySelector(".summary__value--out");
const labelSumInterest = document.querySelector(".summary__value--interest");
const labelTimer = document.querySelector(".timer");

const containerApp = document.querySelector(".app");
const containerMovements = document.querySelector(".movements");

const btnLogin = document.querySelector(".login__btn");
const btnTransfer = document.querySelector(".form__btn--transfer");
const btnLoan = document.querySelector(".form__btn--loan");
const btnClose = document.querySelector(".form__btn--close");
const btnSort = document.querySelector(".btn--sort");

const inputLoginUsername = document.querySelector(".login__input--user");
const inputLoginPin = document.querySelector(".login__input--pin");
const inputTransferTo = document.querySelector(".form__input--to");
const inputTransferAmount = document.querySelector(".form__input--amount");
const inputLoanAmount = document.querySelector(".form__input--loan-amount");
const inputCloseUsername = document.querySelector(".form__input--user");
const inputClosePin = document.querySelector(".form__input--pin");

//make user by the first litter in every word in user name
const getUser = function (accounts) {
  accounts.forEach(function (account) {
    account.user = account.owner
      .toLowerCase()
      .split(" ")
      .map((fL) => fL[0])
      .join("");
  });
};
getUser(accounts);

const curDate = function () {
  const dateNow = new Date();
  const year = dateNow.getFullYear();
  const month = `${dateNow.getMonth() + 1}`.padStart(2, 0);
  const day = `${dateNow.getDate()}`.padStart(2, 0);
  const hours = `${dateNow.getHours()}`.padStart(2, 0);
  const min = `${dateNow.getMinutes()}`.padStart(2, 0);
  return `${day}/${month}/${year}   ${hours}:${min}`;
};

const showMovements = function (acc, s = false) {
  containerMovements.innerHTML = "";

  //if s is false mean we don't want to sort the array
  const movs = s ? acc.movements.slice().sort((a, b) => a - b) : acc.movements;

  movs.forEach(function (movement, i) {
    let stat = movement > 0 ? "deposit" : "withdrawal";

    //
    const dateNow = new Date(acc.movementsDates[i]);
    const year = dateNow.getFullYear();
    const month = `${dateNow.getMonth() + 1}`.padStart(2, 0);
    const day = `${dateNow.getDate()}`.padStart(2, 0);

    let movDate = `${day}/${month}/${year}`;

    let html = `        
    <div class="movements__row">
    <div class="movements__type movements__type--${stat}">${i + 1} ${stat}</div>
    <div class="movements__date">${movDate}</div>
    <div class="movements__value">${movement.toFixed(2)}€</div>
    </div>`;

    containerMovements.insertAdjacentHTML("afterbegin", html);
  });
};

const showBalance = function (account) {
  account.balance = account.movements.reduce((acc, mov) => acc + mov);
  labelBalance.textContent = `${account.balance.toFixed(2)}€`;
};

const showInCome = function (movements) {
  const inCome = movements
    .filter((mov) => mov > 0)
    .reduce((acc, mov) => acc + mov);
  labelSumIn.textContent = `${inCome.toFixed(2)}€`;
};

const showOutCome = function (movements) {
  const outCome = movements
    .filter((mov) => mov < 0)
    .reduce((acc, mov) => acc + mov);
  labelSumOut.textContent = `${Math.abs(outCome.toFixed(2))}€`;
};

const showInterest = function (account) {
  const interest = account.movements
    .filter((mov) => mov > 0)
    .map((mov) => mov * (account.interestRate / 100))
    .reduce((acc, mov) => acc + mov);
  labelSumInterest.textContent = `${interest.toFixed(2)}€`;
};

const showUi = function (currentAccunt) {
  showMovements(currentAccunt);
  showBalance(currentAccunt);
  showInCome(currentAccunt.movements);
  showOutCome(currentAccunt.movements);
  showInterest(currentAccunt);
};

let currentAccunt, timer;

const logOutTimer = function () {
  let time = 5 * 60;
  const tik = function () {
    const min = String(Math.trunc(time / 60)).padStart(2, 0);
    const sec = String(time % 60).padStart(2, 0);
    labelTimer.textContent = `${min}:${sec}`;

    if (time === 0) {
      clearInterval(timer);
      containerApp.style.opacity = 0;
      labelWelcome.textContent = "Log in to get started";
    }
    time--;
  };
  tik();
  return (timer = setInterval(tik, 1000));
};

const resetTimer = function () {
  if (timer) clearInterval(timer);
  timer = logOutTimer();
};

btnLogin.addEventListener("click", function (e) {
  e.preventDefault();

  currentAccunt = accounts.find((acc) => acc.user === inputLoginUsername.value);

  if (currentAccunt?.pin === Number(inputLoginPin.value)) {
    containerApp.style.opacity = 100;
    resetTimer();

    showUi(currentAccunt);
    labelWelcome.textContent = `welcome ,${currentAccunt.owner}`;
    labelDate.textContent = curDate();
  } else alert("try again");
  inputLoginPin.value = "";
  inputLoginUsername.value = "";
  inputLoginPin.blur();
});

btnTransfer.addEventListener("click", function (e) {
  e.preventDefault();

  resetTimer();

  const transferTo = accounts.find(
    (account) => account.user === inputTransferTo.value
  );

  const money = Number(inputTransferAmount.value);

  if (
    money > 0 &&
    transferTo &&
    transferTo !== currentAccunt &&
    currentAccunt.balance >= money
  ) {
    transferTo.movements.push(money);
    transferTo.movementsDates.push(new Date().toISOString());
    currentAccunt.movements.push(-money);
    currentAccunt.movementsDates.push(new Date().toISOString());

    showUi(currentAccunt);
  } else alert("try again");

  inputTransferAmount.value = "";
  inputTransferTo.value = "";
  inputTransferAmount.blur();
});

btnLoan.addEventListener("click", function (e) {
  e.preventDefault();

  resetTimer();

  const money = Number(inputLoanAmount.value);

  if (money > 0 && currentAccunt.movements.some((mov) => mov >= money * 0.1)) {
    currentAccunt.movements.push(money);
    currentAccunt.movementsDates.push(new Date().toISOString());
    showUi(currentAccunt);
  }
  inputLoanAmount.value = "";
  inputLoanAmount.blur();
});

btnClose.addEventListener("click", function (e) {
  e.preventDefault();

  const closeCurrentUser = accounts.find(
    (acc) => acc.user === inputCloseUsername.value
  );

  if (
    closeCurrentUser &&
    closeCurrentUser.pin === Number(inputClosePin.value) &&
    currentAccunt.pin === Number(inputClosePin.value)
  ) {
    const idx = accounts.findIndex((acc) => acc === closeCurrentUser);
    accounts.splice(idx, 1);
    containerApp.style.opacity = 0;
  } else alert("try again");

  inputClosePin.value = "";
  inputCloseUsername.value = "";
  inputClosePin.blur();
});

let sorted = false;
btnSort.addEventListener("click", function (e) {
  e.preventDefault();

  sorted = !sorted;
  showMovements(currentAccunt, sorted);
});
