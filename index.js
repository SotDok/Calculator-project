const body = document.querySelector('body');
body.style.cssText = 'display: flex; justify-content: center; align-items: center; height: 100vh; background-color: #f0f0f0;';
const container = document.createElement('div');
container.div = 'container';
container.style.cssText = 'display: flex; flex-direction: column; align-items: center; background-color: #fff; padding: 20px; border-radius: 10px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);';
body.appendChild(container);

const activeNumbersContainer = document.createElement('div');
activeNumbersContainer.textContent = '0';
activeNumbersContainer.style.cssText = 'width: 100%; height: 50px; background-color: #e0e0e0; display: flex; align-items: center; justify-content: flex-end; padding: 10px; font-size: 24px; border-radius: 5px; margin-bottom: 20px;';
container.appendChild(activeNumbersContainer);


const numbersContainer = document.createElement('div');
container.appendChild(numbersContainer);

const number1 = document.createElement('button');
number1.textContent = '1';
numbersContainer.appendChild(number1);

const number2 = document.createElement('button');
number2.textContent = '2';
numbersContainer.appendChild(number2);

const number3 = document.createElement('button');
number3.textContent = '3';
numbersContainer.appendChild(number3);

const number4 = document.createElement('button');
number4.textContent = '4';
numbersContainer.appendChild(number4);

const number5 = document.createElement('button');
number5.textContent = '5';
numbersContainer.appendChild(number5);

const number6 = document.createElement('button');
number6.textContent = '6';
numbersContainer.appendChild(number6);

const number7 = document.createElement('button');
number7.textContent = '7';
numbersContainer.appendChild(number7);

const number8 = document.createElement('button');
number8.textContent = '8';
numbersContainer.appendChild(number8);

const number9 = document.createElement('button');
number9.textContent = '9';
numbersContainer.appendChild(number9);

const number0 = document.createElement('button');
number0.textContent = '0';
numbersContainer.appendChild(number0);

const decimalButton = document.createElement('button');
decimalButton.textContent = '.';
numbersContainer.appendChild(decimalButton);

const clearButton = document.createElement('button');
clearButton.textContent = 'Clear';
numbersContainer.appendChild(clearButton);

const deleteLastNumberButton = document.createElement('button');
deleteLastNumberButton.textContent = 'X';
numbersContainer.appendChild(deleteLastNumberButton);

const addButton = document.createElement('button');
addButton.textContent = '+';
numbersContainer.appendChild(addButton);

const subtractButton = document.createElement('button');
subtractButton.textContent = '-';
numbersContainer.appendChild(subtractButton);

const multiplyButton = document.createElement('button');
multiplyButton.textContent = '*';
numbersContainer.appendChild(multiplyButton);

const divideButton = document.createElement('button');
divideButton.textContent = '/';
numbersContainer.appendChild(divideButton);

const equalsButton = document.createElement('button');
equalsButton.textContent = '=';
numbersContainer.appendChild(equalsButton);



//State 
let currentNumber = '0';
let previousNumber = null;
let operation = null;
let shouldResetDisplay = false;

function updateDisplay() {
    activeNumbersContainer.textContent = currentNumber;
}

updateDisplay();

//Function to append digit to the current number
function appendDigit(digit) {
    if (shouldResetDisplay){
        currentValue = digit;
        shouldResetDisplay = false;
    } else {
        if (currentNumber === '0') {
            currentNumber = digit;
        } else {
            currentNumber += digit;
        }
    }
    updateDisplay();
}

//Function to add event listeners to number buttons if key clicked or pressed from keyboard
document.addEventListener('keydown', (event) => {
    if (event.key >= '0' && event.key <= '9') {
        appendDigit(event.key);
    }
});

number1.addEventListener('click', () => appendDigit('1'));
number2.addEventListener('click', () => appendDigit('2'));
number3.addEventListener('click', () => appendDigit('3'));
number4.addEventListener('click', () => appendDigit('4'));
number5.addEventListener('click', () => appendDigit('5'));
number6.addEventListener('click', () => appendDigit('6'));
number7.addEventListener('click', () => appendDigit('7'));
number8.addEventListener('click', () => appendDigit('8'));
number9.addEventListener('click', () => appendDigit('9'));
number0.addEventListener('click', () => appendDigit('0'));

function chooseOperation(op) {
    if (operator !== null) {
        calculate();
    }
    previousNumber = currentNumber;
    operator = op;
    shouldResetDisplay = true;
}