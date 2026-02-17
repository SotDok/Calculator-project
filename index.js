const body = document.querySelector('body');
body.style.cssText = 'display: flex; justify-content: center; align-items: center; height: 100vh; background-color: #f0f0f0;';

const title = document.createElement('h1');
title.textContent = 'Calculator';
title.style.cssText = 'position: absolute; top: 20px; left: 50%; transform: translateX(-50%); font-family: Arial, sans-serif; color: #333;';
body.appendChild(title);

const container = document.createElement('div');
container.id = 'container';
container.style.cssText = 'display: flex; flex-direction: column; align-items: center; background-color: #fff; padding: 20px; border-radius: 10px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);';
body.appendChild(container);


// Create display for active numbers and formula
const activeNumbersContainer = document.createElement('div');
activeNumbersContainer.style.cssText = `
    width: 100%;
    height: 60px;
    background-color: black;
    color: white;
    font-size: 28px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding: 10px;
    box-sizing: border-box;
    border-radius: 10px;
`;
container.appendChild(activeNumbersContainer);

// Create container for number and operator buttons
const numbersContainer = document.createElement('div');
numbersContainer.style.cssText = `
    display: grid;
    grid-template-columns: repeat(4, 70px);
    gap: 10px;
    margin-top: 20px;
`;
container.appendChild(numbersContainer);

//Hardcoding number buttons and operator buttons, appending them to the numbers container. Probably could be done
// more efficiently with a loop but this is fine for now and I want to move on to the logic of the calculator
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


//Declare variables to hold the current number, previous number, operator, and a flag to reset the display
let currentNumber = '0';
let previousNumber = null;
let operator = null;
let shouldResetDisplay = false;
let formula = ''; //Need the formula as a placeholder in display for the previous operation

//Function to update the display with the current number
function updateDisplay() {
   if (formula.includes('=')) {
        const parts = formula.split('=');
        const previous = parts[0].trim(); 
        const result = parts[1].trim();   
        activeNumbersContainer.innerHTML = `
            <span style="font-size: 18px; color: #f0f0f0;"> ${previous} </span>
            <br>
            <span style="font-size: 28px; color: white; margin-left: 5px"> = ${result}</span>
        `;
    } else {
        activeNumbersContainer.textContent = formula || currentNumber;
    }
}

updateDisplay();

//Function to append digit to the current number
function appendDigit(digit) {
    if (shouldResetDisplay) {
        currentNumber = digit;
        shouldResetDisplay = false;
    } else {
        currentNumber = currentNumber === '0' ? digit : currentNumber + digit;
    }

    formula = operator ? `${previousNumber} ${operator} ${currentNumber}` : currentNumber;
    updateDisplay();
}

//Function to add event listeners to number buttons if key clicked or pressed from keyboard

[number0, number1, number2, number3, number4, number5, number6, number7, number8, number9, decimalButton]
.forEach((button, index) => {
    button.addEventListener('click', () => {
        // If the button is the decimal button, check if the current number already contains a decimal point before appending it
        if (button === decimalButton) {
            if (!currentNumber.includes('.')) {
                appendDigit('.');
            }
        } else {
            appendDigit(index.toString());
        }
    });
});

// Operator buttons
addButton.addEventListener('click', () => chooseOperation('+'));
subtractButton.addEventListener('click', () => chooseOperation('-'));
multiplyButton.addEventListener('click', () => chooseOperation('*'));
divideButton.addEventListener('click', () => chooseOperation('/'));

// Equals button
equalsButton.addEventListener('click', calculate);

// Clear button
clearButton.addEventListener('click', () => {
    currentNumber = '0';
    previousNumber = null;
    operator = null;
    shouldResetDisplay = false;
    updateDisplay();
});

// Delete last number button
deleteLastNumberButton.addEventListener('click', () => {
    if (currentNumber.length > 1) {
        currentNumber = currentNumber.slice(0, -1);
    } else {
        currentNumber = '0';
    }
    updateDisplay();
});


//Keyboard event listener for digits, operators, enter, backspace, and escape
document.addEventListener('keydown', (event) => {
    if (event.key >= '0' && event.key <= '9'){
     appendDigit(event.key);
     return;
    }
     if (event.key === '.') {
        if (!currentNumber.includes('.')) appendDigit('.');
        return;
    }
    if (['+', '-', '*', '/'].includes(event.key)) {
        chooseOperation(event.key);
        return;
    }
    if (event.key === 'Enter' || event.key === '=') {
             calculate();
             return;
    }
    if (event.key === 'Backspace') {
        if (currentNumber.length > 1) {
            currentNumber = currentNumber.slice(0, -1);
        } else {
            currentNumber = '0';
        }
        formula = operator ? `${previousNumber} ${operator} ${currentNumber}` : currentNumber;
        updateDisplay();
        return;
    }
    if (event.key === "Escape") {
        currentNumber = '0';
        previousNumber = null; 
        operator = null;
        shouldResetDisplay = false;
        formula = currentNumber;
        updateDisplay();
        return;
    }
});



//Function to choose operation
function chooseOperation(op) {
    if (operator !== null && !shouldResetDisplay) {
        calculate();
    }

    previousNumber = currentNumber;
    operator = op;
    shouldResetDisplay = true;
    formula = `${previousNumber} ${operator}`;

    updateDisplay();
}

//Function to calculate the result based on the operator and update the display
function calculate() {
    if (operator === null || previousNumber === null) return;

    const prev = parseFloat(previousNumber);
    const curr = parseFloat(currentNumber);
    let result;

    // Used switch conditional because of repetitive action
    switch (operator) {
        case '+': result = prev + curr; break;
        case '-': result = prev - curr; break;
        case '*': result = prev * curr; break;
        case '/': result = prev / curr; break;
    }

    formula = `${previousNumber} ${operator} ${currentNumber} = ${result}`;
    currentNumber = result.toString();
    operator = null;
    previousNumber = null;
    shouldResetDisplay = true;

    updateDisplay();
}

equalsButton.addEventListener('click', calculate);


// Group all buttons for styling
const allButtons = numbersContainer.querySelectorAll('button');

//Style all buttons
allButtons.forEach(button => {
    
    // Base styles for all buttons
    button.style.cssText = `
        height: 70px;
        width: 70px;
        font-size: 22px;
        font-weight: bold;
        border: none;
        border-radius: 15px;
        cursor: pointer;
        background-color: #e0e0e0;
        transition: all 0.15s ease;
    `;

    // Hover effect
    button.addEventListener('mouseenter', () => {
        button.style.backgroundColor = '#6c6a6a';
    });

    button.addEventListener('mouseleave', () => {
        button.style.backgroundColor = '#e0e0e0';
    });

    // Press effect
    button.addEventListener('mousedown', () => {
        button.style.transform = 'scale(0.95)';
    });
    button.addEventListener('mouseup', () => {
        button.style.transform = 'scale(1)';
    });
});

//Different color for operators and equals button
[addButton, subtractButton, multiplyButton, divideButton, equalsButton].forEach(button => {
    button.style.backgroundColor = '#ff9500';
    button.style.color = 'white';
});

// Hover effect for operator and equals buttons
[addButton, subtractButton, multiplyButton, divideButton, equalsButton].forEach(button => {
    button.addEventListener('mouseenter', () => {
        button.style.backgroundColor = '#9d4c00';
    });
    button.addEventListener('mouseleave', () => {
        button.style.backgroundColor = '#f69002';
    });
});

