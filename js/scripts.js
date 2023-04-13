let numbers = []
let operators = []

function operate (first, second, operator){
    switch (true){
        case (operator === "+"):
            return add(first,second)

        case (operator === "-"):
            return subtract(first,second)

        case (operator === "*"):
            return multiply(first,second)

        case (operator === "/"):
            return divide(first,second)

        default:
            console.log("Something went wrong, operate()")
        }
}

function add (x,y){
    return x + y;
}

function subtract (x,y){
    return x - y;
}

function multiply (x,y){
    return x * y;
}

function divide (x,y){
    return x / y;
}

// Simulates a calculator that is able to do multiple operations with multiple numbers
// Inputs only taken from prompt()s, outputs result to the console
// No checksum for invalid inputs
function TEMP(){
    do{
    numbers.push(+prompt("Enter a number:"));
    operators.push(prompt("Enter an operator: ", "Enter '=' if you are finished."));
    } while (operators[operators.length - 1] != "=")

    let finalResult = numbers.reduce((result, currentNumber, currentIndex) => operate(result, currentNumber, operators[currentIndex-1])
    );

    numbers = [];
    operators = [];

    console.log(finalResult)
}