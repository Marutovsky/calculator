const currentDisplay = document.querySelector('.current-display');
const buttons = document.querySelectorAll('.buttons > button');
const _OPERATORS = ['+', '-', '*', '/'];
const _NUMBERS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
let firstNumber;
let operator;
let secondNumber;

buttons.forEach((button) => {
  button.addEventListener('click', () => {
    switch (button.value) {
      case 'AC':
        clearAll();
        break;
      case 'C':
        clearLastChar();
        break;
      case _OPERATORS.find(e => e === button.value):
        if (!firstNumber) {
          firstNumber = parseFloat(currentDisplay.textContent);
          console.log(firstNumber);
        } else if (firstNumber) {
          secondNumber = parseFloat(currentDisplay.textContent);
          console.log(secondNumber);
        }
        if (!operator) {
          operator = button.value;
          console.log(operator);
        } else if (operator) {
          let result = operate(firstNumber, operator, secondNumber);
          firstNumber = result;
          currentDisplay.textContent = result;
          secondNumber = null;
          operator = button.value;
        }
        break;
      case _NUMBERS.find(e => e === button.value):
        if (currentDisplay.textContent === '0' || currentDisplay.textContent == firstNumber) {
          currentDisplay.textContent = '';
        }
        currentDisplay.textContent += button.value;
        break;
      case '=':
        secondNumber = parseFloat(currentDisplay.textContent);
        console.log(secondNumber);
        if (firstNumber && operator && secondNumber) {
          let result = operate(firstNumber, operator, secondNumber);
          firstNumber = result;
          currentDisplay.textContent = result;
          secondNumber = null;
          operator = null;
        }
        break;
    }
  })
})

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

function clearAll() {
  currentDisplay.textContent = '0';
  firstNumber = null;
  secondNumber = null;
  operator = null;
}

function clearLastChar() {
  currentDisplay.textContent = currentDisplay.textContent.slice(0, currentDisplay.textContent.length - 1);
  if (currentDisplay.textContent.length === 0) {
    currentDisplay.textContent = '0';
  }
}