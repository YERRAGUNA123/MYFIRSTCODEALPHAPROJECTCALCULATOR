let currentNumber = '';
let previousNumber = '';
let operator = '';

// Toggle between light and dark themes
function toggleTheme() {
    document.body.classList.toggle("light-theme");
}

// Update the display
function updateDisplay() {
    const display = document.getElementById("display");
    display.innerText = currentNumber || previousNumber || '0';
}

// Append number to current input
function appendNumber(number) {
    if (operator && !currentNumber) {
        // Start new number if an operator was selected
        currentNumber = '';
    }
    if (currentNumber.length < 12) {
        currentNumber += number;
        updateDisplay();
    }
}

// Append decimal point
function appendDecimal() {
    if (!currentNumber.includes('.')) {
        currentNumber += '.';
        updateDisplay();
    }
}

// Clear display
function clearDisplay() {
    currentNumber = '';
    previousNumber = '';
    operator = '';
    updateDisplay();
}

// Delete last digit
function backspace() {
    currentNumber = currentNumber.slice(0, -1);
    updateDisplay();
}

// Set the operation (+, -, ×, ÷, %)
function setOperation(op) {
    if (currentNumber === '' && previousNumber === '') return; // Do nothing if no numbers entered
    if (operator && currentNumber === '') {
        // Update operator if one was already set without a second number
        operator = op;
        updateDisplay();
        return;
    }

    if (previousNumber === '') {
        // Set previousNumber to currentNumber if it's empty
        previousNumber = currentNumber;
    } else if (operator) {
        // Calculate result if operator already exists
        calculate();
    }

    operator = op;
    currentNumber = '';
    updateDisplay();
}

// Perform calculation based on operator
function calculate() {
    let result;
    const prev = parseFloat(previousNumber);
    const current = parseFloat(currentNumber);

    if (isNaN(prev) || isNaN(current)) return;

    switch (operator) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '×':
            result = prev * current;
            break;
        case '÷':
            result = current !== 0 ? prev / current : 'Error'; // Prevent division by 0
            break;
        case '%':
            result = prev % current;
            break;
        default:
            return;
    }

    currentNumber = result.toString();
    operator = '';
    previousNumber = '';
    updateDisplay();
}

// Square root operation
function sqrt() {
    const num = parseFloat(currentNumber);
    if (!isNaN(num) && num >= 0) {
        currentNumber = Math.sqrt(num).toString();
        updateDisplay();
    }
}

// Square operation
function square() {
    const num = parseFloat(currentNumber);
    if (!isNaN(num)) {
        currentNumber = Math.pow(num, 2).toString();
        updateDisplay();
    }
}

// Keyboard support
document.addEventListener("keydown", (e) => {
    if (e.key >= '0' && e.key <= '9') {
        appendNumber(e.key);
    } else if (e.key === '.') {
        appendDecimal();
    } else if (e.key === 'Backspace') {
        backspace();
    } else if (e.key === 'Escape') {
        clearDisplay();
    } else if (e.key === 'Enter' || e.key === '=') {
        calculate();
    } else if (e.key === '+') {
        setOperation('+');
    } else if (e.key === '-') {
        setOperation('-');
    } else if (e.key === '*') {
        setOperation('×');
    } else if (e.key === '/') {
        setOperation('÷');
    }
});
