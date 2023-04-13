let numberA = +prompt("Enter a number:")
let numberB = +prompt("Enter a second number:")
let operator = prompt("What do you want to do with these?", "add/subtract/multiply/divide")

function operate (first, second, operator){
    switch (true){
        case (operator === "add"):
            alert(`Result is ${add(first,second)}`)
            break;

        case (operator === "subtract"):
            alert(`Result is ${subtract(first,second)}`)
            break;

        case (operator === "multiply"):
            alert(`Result is ${multiply(first,second)}`)
            break;

        case (operator === "divide"):
            alert(`Result is ${divide(first,second)}`)
            break;

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