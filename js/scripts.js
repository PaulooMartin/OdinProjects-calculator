let numbers = [];
let operators = [];

const displayScreen = document.querySelector(".display-screen");
const digitBtns = document.querySelectorAll(".number");
const operatorBtns = document.querySelectorAll(".operator");
const eraseBtn = document.querySelector("button[data-operation = 'erase']");
const decimalBtn = document.querySelector("button[data-digit = '.']");

numListener();
operatorBtns.forEach(oprListener);
eraseListener();
decimalListener();

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

function numListener() {
  digitBtns.forEach((numBtn) => {
    numBtn.addEventListener("click", () => {
      if (displayScreen.textContent == "0")
        displayScreen.textContent = numBtn.attributes["data-digit"].value;
      else displayScreen.textContent += numBtn.attributes["data-digit"].value;
    });
  });
}

function oprListener(oprBtn) {
  oprBtn.addEventListener("click", () => {
    let operation = oprBtn.attributes["data-operation"].value;
    let displayLength = displayScreen.textContent.length;
    let displayDigits = displayScreen.textContent;
    const check = /\d\.$/;

    switch (true) {
      case displayLength == 0:
        return;

      case check.test(displayDigits):
        return alert("ILLEGAL!");

      default:
        numbers.push(+displayDigits);
        operators.push(operation);
        displayScreen.textContent = "";
    }
  });
}

function eraseListener() {
  eraseBtn.addEventListener("click", () => {
    displayScreen.textContent = displayScreen.textContent.slice(
      0,
      displayScreen.textContent.length - 1
    );
  });
}

function decimalListener() {
  decimalBtn.addEventListener("click", () => {
    let check = displayScreen.textContent.includes(".");
    let digits = displayScreen.textContent.length;
    let decimal = decimalBtn.attributes["data-digit"].value;

    switch (true) {
      case check == true:
        return;

      case digits >= 1:
        displayScreen.textContent += decimal;
        break;

      default:
        displayScreen.textContent = `0${decimal}`;
    }
  });
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
