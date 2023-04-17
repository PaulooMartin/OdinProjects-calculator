let numbers = [];
let operators = [];

const displayScreen = document.querySelector(".display-screen");
const digitBtns = document.querySelectorAll(".number");
const operatorBtns = document.querySelectorAll(".operator");
const eraseBtn = document.querySelector("button[data-operation = 'erase']");
const decimalBtn = document.querySelector("button[data-digit = '.']");

digitBtns.forEach(numListener);
operatorBtns.forEach(oprListener);
eraseListener();
decimalListener();

let equaled = false;

function operate(first, second, operator) {
  switch (true) {
    case operator === "+":
      return add(first, second);

    case operator === "-":
      return subtract(first, second);

    case operator === "*":
      return multiply(first, second);

    case operator === "/":
      return divide(first, second);

    default:
      console.log("Something went wrong, operate()");
  }
}

function add(x, y) {
  return x + y;
}

function subtract(x, y) {
  return x - y;
}

function multiply(x, y) {
  return x * y;
}

function divide(x, y) {
  return x / y;
}

function numListener(numBtn) {
  numBtn.addEventListener("click", () => {
    lettersHandler();
    let digit = numBtn.attributes["data-digit"].value;
    if (displayScreen.textContent == "0" || equaled == true) {
      displayScreen.textContent = digit;
      equaled = false;
    } else displayScreen.textContent += digit;
  });
}

function oprListener(oprBtn) {
  oprBtn.addEventListener("click", () => {
    equaled = false;
    lettersHandler();

    let operation = oprBtn.attributes["data-operation"].value;
    let displayLength = displayScreen.textContent.length;
    let displayDigits = displayScreen.textContent;
    const check = /\d\.$/;

    switch (true) {
      case check.test(displayDigits):
        return alert("ILLEGAL!");

      case displayLength == 0:
        if (numbers.length) {
          operators.pop();
          operators.push(operation);
          if (operation === "=") operateOnEqual();
        }
        return;

      default:
        numbers.push(+displayDigits);
        operators.push(operation);
        // needs clearing of everything if code below is true
        if (checkDivideByZero() === 1) return alert("NOT ALLOWED!")
        displayScreen.textContent = "";
        if (operation === "=") operateOnEqual();
    }
  });
}

function eraseListener() {
  eraseBtn.addEventListener("click", () => {
    lettersHandler();
    if (equaled == true) {
      displayScreen.textContent = "";
      equaled = false;
      return;
    }
    displayScreen.textContent = displayScreen.textContent.slice(
      0,
      displayScreen.textContent.length - 1
    );
  });
}

function decimalListener() {
  decimalBtn.addEventListener("click", () => {
    lettersHandler();
    let check = displayScreen.textContent.includes(".");
    let digits = displayScreen.textContent.length;
    let decimal = decimalBtn.attributes["data-digit"].value;

    switch (true) {
      case check == true:
        return;

      case digits == 0 || equaled == true:
        displayScreen.textContent = `0${decimal}`;
        equaled = false;
        break;

      default:
        displayScreen.textContent += decimal;
    }
  });
}

function operateOnEqual() {
  if (numbers.length === 1) {
    displayScreen.textContent = numbers[0];
    numbers = [];
    operators = [];
    equaled = true;
    return;
  }

  let finalResult = numbers.reduce((result, currentNumber, currentIndex) =>
    operate(result, currentNumber, operators[currentIndex - 1])
  );
  numbers = [];
  operators = [];
  equaled = true;

  displayScreen.textContent = finalResult;
  return;
}

function lettersHandler() {
  let check = /[a-zA-Z]/g;
  if (check.test(displayScreen.textContent)) displayScreen.textContent = "";
  return;
}
// Simulates a calculator that is able to do multiple operations with multiple numbers
// Inputs only taken from prompt()s, outputs result to the console
// No checksum for invalid inputs
function TEMP() {
  do {
    numbers.push(+prompt("Enter a number:"));
    operators.push(
      prompt("Enter an operator: ", "Enter '=' if you are finished.")
    );
  } while (operators[operators.length - 1] != "=");

  let finalResult = numbers.reduce((result, currentNumber, currentIndex) =>
    operate(result, currentNumber, operators[currentIndex - 1])
  );

  numbers = [];
  operators = [];

  console.log(finalResult);
}

function checkDivideByZero() {
  let AAAA = numbers.length;
  if (AAAA > 1 && numbers[AAAA - 1] === 0 && operators[AAAA - 2]) return 1;
}
