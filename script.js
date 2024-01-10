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
        setNumbers();
        setOperator(button);
        break;
      case _NUMBERS.find(e => e === button.value):
        inputNumber(button);
        break;
      case '.':
        inputPoint(button);
        break;
      case '=':
        if (!operator) {
          firstNumber = null;
          isFirstNumberSet = true;
        } else {
          setNumbers();
          evaluate();
        }
        break;
    }
  });
});

document.addEventListener('keydown', (event) => {
  switch (event.key) {
    case 'Delete':
      clearAll();
      break;
    case 'Backspace':
      clearLastChar();
      break;
    case 'Home':
      changeSign();
      break;
    case _OPERATORS.find(e => e == event.key):
      setNumbers();
      setOperator(event);
      break;
    case _NUMBERS.find(e => e == event.key):
      inputNumber(event);
      break;
    case ',':
      inputPoint();
      break;
    case 'Enter':
      event.preventDefault();
      if (!operator) {
        firstNumber = null;
        isFirstNumberSet = true;
      } else {
        setNumbers();
        evaluate();
      }
      break;
  }
});

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
  recentDisplay.innerText = '\u00A0';
  firstNumber = null;
  secondNumber = null;
  operator = null;
  isFirstNumberSet = false;
  buttons.forEach((button) => {
    button.classList.remove('active');
    button.disabled = false;
  });
}

function clearLastChar() {
  currentDisplay.textContent = currentDisplay.textContent.slice(0, currentDisplay.textContent.length - 1);
  if (currentDisplay.textContent.length === 0 || currentDisplay.textContent === '-') {
    currentDisplay.textContent = '0';
  }
}

function changeSign() {
  if (currentDisplay.textContent === '0') {
    currentDisplay.textContent = '-0';
  } else {
  currentDisplay.textContent = -Number(currentDisplay.textContent).toString();
  }
}

function roundLongDecimals(number) {
  number = number.toString();
  if (number.includes('.') && number.split('.')[1].length > 10) {
    result = Number(number).toFixed(10).toString();
    return Number(result);
  } else {
    return Number(number);
  }
}

function calculate() {
  if (operator === '/' && secondNumber === 0) {
    recentDisplay.textContent = `${firstNumber} ${operator} ${secondNumber}`;
    currentDisplay.textContent = 'Error';
    buttons.forEach((button) => button.disabled = true);
    setTimeout(clearAll, 2000);
  } else {
    recentDisplay.textContent = `${firstNumber} ${operator} ${secondNumber}`;
    let result = operate(firstNumber, operator, secondNumber);
    currentDisplay.textContent = roundLongDecimals(result);
    firstNumber = Number(currentDisplay.textContent);
    secondNumber = null;
    isFirstNumberSet = true;
    buttons.forEach((button) => button.classList.remove('active'));
  }
}

function setNumbers() {
  if (firstNumber || firstNumber === 0) {
  secondNumber = Number(currentDisplay.textContent);
  } else {
    firstNumber = Number(currentDisplay.textContent);
    isFirstNumberSet = true;
  }
}

function setOperator(button) {
  if (operator) {
    calculate();
  }
  firstNumber = Number(currentDisplay.textContent);
  operator = (button.value || button.key);
  if (button.key) {
    buttons.forEach((btn) => {
      if(btn.value === button.key) {
        btn.classList.add('active');
      }
    })
  } else {
    button.classList.add('active');
  }
}

function inputNumber(button) {
  if (currentDisplay.textContent === '0' || isFirstNumberSet) {
    currentDisplay.textContent = '';
    isFirstNumberSet = false;
  } else if (currentDisplay.textContent.charAt(0) === '-' && currentDisplay.textContent.charAt(1) === '0') {
    currentDisplay.textContent = '-';
  } 
  if (currentDisplay.textContent.length < 20) {
    currentDisplay.textContent += (button.value || button.key);
  }
}

function inputPoint() {
  if (isFirstNumberSet) {
    currentDisplay.textContent = '0';
    isFirstNumberSet = false;
  }
  if (currentDisplay.textContent.length < 20 && !currentDisplay.textContent.includes('.')) {
    currentDisplay.textContent += '.';
  }
}

function evaluate() {
  if ((firstNumber || firstNumber === 0) && operator && (secondNumber || secondNumber === 0)) {
    calculate();
    operator = null;
  }
}