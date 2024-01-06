const currentDisplay = document.querySelector('.current-display');
const buttons = document.querySelectorAll('.buttons > button');
const recentDisplay = document.querySelector('.recent-display');
const _OPERATORS = ['+', '-', '*', '/'];
const _NUMBERS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
let firstNumber;
let operator;
let secondNumber;
let isFirstNumberSet = false;

buttons.forEach((button) => {
  button.addEventListener('click', () => {
    switch (button.value) {
      case 'AC':
        clearAll();
        break;
      case 'C':
        clearLastChar();
        break;
      case '+/-':
        changeSign();
        break;
      case _OPERATORS.find(e => e === button.value):
        if (!firstNumber) {
          firstNumber = parseFloat(currentDisplay.textContent);
          isFirstNumberSet = true;
        } else if (firstNumber) {
          secondNumber = parseFloat(currentDisplay.textContent);
        }
        if (!operator) {
          operator = button.value;
        } else if (operator) {
          calculate();
          operator = button.value;
        }
        break;
      case _NUMBERS.find(e => e === button.value):
        if (currentDisplay.textContent === '0' || isFirstNumberSet) {
          currentDisplay.textContent = '';
          isFirstNumberSet = false;
        }
        currentDisplay.textContent += button.value;
        break;
      case '.':
        if (isFirstNumberSet) {
          currentDisplay.textContent = '0';
          isFirstNumberSet = false;
        }
        currentDisplay.textContent += button.value;
        break;
      case '=':
        secondNumber = parseFloat(currentDisplay.textContent);
        if (firstNumber && operator && secondNumber) {
          calculate();
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
  recentDisplay.textContent = '';
  firstNumber = null;
  secondNumber = null;
  operator = null;
  isFirstNumberSet = false;
}

function clearLastChar() {
  currentDisplay.textContent = currentDisplay.textContent.slice(0, currentDisplay.textContent.length - 1);
  if (currentDisplay.textContent.length === 0 || currentDisplay.textContent === '-') {
    currentDisplay.textContent = '0';
  }
}

function changeSign() {
  if (currentDisplay.textContent.charAt(0) === '-') {
    currentDisplay.textContent = currentDisplay.textContent.slice(1, currentDisplay.textContent.length);
  } else {
    currentDisplay.textContent = `-${currentDisplay.textContent}`;
  }
}

function roundLongDecimals(number) {
  number = number.toString();
  if (number.includes('.') && number.split('.')[1].length > 10) {
    return parseFloat(number).toFixed(10);
  } else {
    return parseFloat(number);
  }
}

function calculate() {
  recentDisplay.textContent = `${firstNumber} ${operator} ${secondNumber}`;
  let result = operate(firstNumber, operator, secondNumber);
  firstNumber = roundLongDecimals(result);
  currentDisplay.textContent = firstNumber;
  secondNumber = null;
  isFirstNumberSet = true;
}