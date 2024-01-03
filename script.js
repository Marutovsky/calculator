let firstNumber;
let operator;
let secondNumber;

function operate(firstNumber, operator, secondNumber) {
  let result;
  switch (operator) {
    case '+':
      result = addNumbers(firstNumber, secondNumber);
      break;
    case '-':
      result = subtractNumbers(firstNumber, secondNumber);
      break;
    case '*':
      result = multiplyNumbers(firstNumber, secondNumber);
      break;
    case '/':
      result = divideNumbers(firstNumber, secondNumber);
      break;
  }
  return result;
}

function addNumbers(a, b) {
  return a + b;
}

function subtractNumbers(a, b) {
  return a - b;
}

function multiplyNumbers(a, b) {
  return a * b;
}

function divideNumbers(a, b) {
  return a / b;
}