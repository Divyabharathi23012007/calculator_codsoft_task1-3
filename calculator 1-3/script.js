// Calculator logic
const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');
const clearBtn = document.getElementById('clear');
const equalsBtn = document.getElementById('equals');
const functionButtons = document.querySelectorAll('.function');
const clearEverythingBtn = document.getElementById('clear-everything');
const secondaryDisplay = document.getElementById('secondary-display');

let currentInput = '';
let operator = '';
let firstOperand = '';
let waitingForSecondOperand = false;
let pendingFunc = '';
let pendingFuncArg = '';
let angleMode = 'DEG'; // Default mode
const degModeBtn = document.getElementById('deg-mode');
const radModeBtn = document.getElementById('rad-mode');

degModeBtn.classList.add('active');

degModeBtn.addEventListener('click', function() {
    angleMode = 'DEG';
    degModeBtn.classList.add('active');
    radModeBtn.classList.remove('active');
    updateSecondaryDisplay((secondaryDisplay.textContent ? secondaryDisplay.textContent + ' ' : '') + '[DEG]');
});

radModeBtn.addEventListener('click', function() {
    angleMode = 'RAD';
    radModeBtn.classList.add('active');
    degModeBtn.classList.remove('active');
    updateSecondaryDisplay((secondaryDisplay.textContent ? secondaryDisplay.textContent + ' ' : '') + '[RAD]');
});

function updateDisplay(value, isResult = false) {
    if (isResult) {
        display.value = value;
    } else if (display.value === '' || display.value === '0' || pendingFunc || operator) {
        // Do not update result display while entering numbers/functions
    }
}

function updateSecondaryDisplay(content) {
    secondaryDisplay.textContent = content || '';
}

function getOperatorSymbol(op) {
    if (op === '+') return '+';
    if (op === '-') return '−';
    if (op === '*') return '×';
    if (op === '/') return '÷';
    return op;
}

function getFunctionLabel(func, x, y) {
    if (func === 'sin') return `sin(${x})`;
    if (func === 'cos') return `cos(${x})`;
    if (func === 'tan') return `tan(${x})`;
    if (func === 'log') return `log(${x})`;
    if (func === 'sqrt') return `√(${x})`;
    if (func === 'pow') return `${x}^${y ?? ''}`;
    if (func === 'root') return `${x}^(1/${y ?? ''})`;
    return '';
}

buttons.forEach(button => {
    button.addEventListener('click', function() {
        const value = this.getAttribute('data-value');
        if (value === null) return;

        if (value >= '0' && value <= '9' || value === '.') {
            if (pendingFunc) {
                // For single-argument functions
                if (["sin", "cos", "tan", "log", "sqrt"].includes(pendingFunc)) {
                    pendingFuncArg += value;
                    updateDisplay(pendingFuncArg);
                    updateSecondaryDisplay(getFunctionLabel(pendingFunc, pendingFuncArg));
                    currentInput = pendingFuncArg;
                    return;
                }
            }
            if (pendingFunc && (pendingFunc === 'pow' || pendingFunc === 'root')) {
                // For two-argument functions
                if (firstOperand === '') {
                    firstOperand = value;
                    updateDisplay(firstOperand);
                    updateSecondaryDisplay(getFunctionLabel(pendingFunc, firstOperand));
                } else {
                    currentInput += value;
                    updateDisplay(currentInput);
                    updateSecondaryDisplay(getFunctionLabel(pendingFunc, firstOperand, currentInput));
                }
                return;
            }
            if (waitingForSecondOperand) {
                currentInput = value;
                waitingForSecondOperand = false;
            } else {
                // Prevent multiple decimals
                if (value === '.' && currentInput.includes('.')) return;
                currentInput += value;
            }
            updateDisplay(currentInput);
            // Update secondary display for number entry
            if (operator && firstOperand !== '') {
                updateSecondaryDisplay(`${firstOperand} ${getOperatorSymbol(operator)} ${currentInput}`);
            } else {
                updateSecondaryDisplay(currentInput);
            }
        } else if (["+", "-", "*", "/"].includes(value)) {
            if (currentInput === '' && firstOperand === '') return;
            if (firstOperand !== '' && operator && !waitingForSecondOperand) {
                // Chain operations
                firstOperand = String(operate(Number(firstOperand), Number(currentInput), operator));
                updateDisplay(firstOperand);
            } else {
                firstOperand = currentInput;
            }
            operator = value;
            waitingForSecondOperand = true;
            updateSecondaryDisplay(`${firstOperand} ${getOperatorSymbol(operator)}`);
        }
    });
});

functionButtons.forEach(button => {
    button.addEventListener('click', function() {
        const func = this.getAttribute('data-func');
        if (func === 'pi') {
            currentInput = String(Math.PI);
            updateDisplay(currentInput);
            updateSecondaryDisplay('π');
            return;
        }
        if (["sin", "cos", "tan", "log", "sqrt"].includes(func)) {
            pendingFunc = func;
            pendingFuncArg = '';
            currentInput = '';
            updateDisplay('');
            updateSecondaryDisplay(getFunctionLabel(func, '')); // Show function waiting for input
            return;
        } else if (func === 'pow' || func === 'root') {
            pendingFunc = func;
            firstOperand = '';
            pendingFuncArg = '';
            currentInput = '';
            operator = '';
            waitingForSecondOperand = true;
            updateSecondaryDisplay(getFunctionLabel(func, ''));
            updateDisplay('');
            return;
        }
    });
});

clearBtn.addEventListener('click', function() {
    currentInput = '';
    operator = '';
    firstOperand = '';
    waitingForSecondOperand = false;
    pendingFunc = '';
    pendingFuncArg = '';
    updateDisplay('');
    updateSecondaryDisplay('');
});

equalsBtn.addEventListener('click', function() {
    if (pendingFunc && ["sin", "cos", "tan", "log", "sqrt"].includes(pendingFunc) && pendingFuncArg !== '') {
        let v = Number(pendingFuncArg);
        if (["sin", "cos", "tan"].includes(pendingFunc)) {
            if (angleMode === 'DEG') v = toRadians(v);
        }
        let result = '';
        if (pendingFunc === 'sin') result = Math.sin(v);
        if (pendingFunc === 'cos') result = Math.cos(v);
        if (pendingFunc === 'tan') result = Math.tan(v);
        if (pendingFunc === 'log') result = Number(pendingFuncArg) > 0 ? Math.log10(Number(pendingFuncArg)) : 'Error';
        if (pendingFunc === 'sqrt') result = Number(pendingFuncArg) >= 0 ? Math.sqrt(Number(pendingFuncArg)) : 'Error';
        result = (typeof result === 'number' && !isNaN(result)) ? roundResult(result) : result;
        updateDisplay(result, true);
        updateSecondaryDisplay(getFunctionLabel(pendingFunc, pendingFuncArg) + ` [${angleMode}]`);
        currentInput = String(result);
        firstOperand = '';
        operator = '';
        waitingForSecondOperand = false;
        pendingFunc = '';
        pendingFuncArg = '';
        return;
    }
    if (pendingFunc && (pendingFunc === 'pow' || pendingFunc === 'root') && firstOperand !== '' && currentInput !== '') {
        let x = Number(firstOperand);
        let y = Number(currentInput);
        let result = '';
        if (pendingFunc === 'pow') {
            result = Math.pow(x, y);
        } else if (pendingFunc === 'root') {
            result = y === 0 ? 'Error' : Math.pow(x, 1 / y);
        }
        result = (typeof result === 'number' && !isNaN(result)) ? roundResult(result) : result;
        updateDisplay(result, true);
        updateSecondaryDisplay(getFunctionLabel(pendingFunc, firstOperand, currentInput));
        currentInput = String(result);
        firstOperand = '';
        operator = '';
        waitingForSecondOperand = false;
        pendingFunc = '';
        pendingFuncArg = '';
        return;
    }
    if (operator && firstOperand !== '' && currentInput !== '') {
        const result = operate(Number(firstOperand), Number(currentInput), operator);
        updateDisplay(result, true);
        updateSecondaryDisplay(`${firstOperand} ${getOperatorSymbol(operator)} ${currentInput}`);
        currentInput = String(result);
        firstOperand = '';
        operator = '';
        waitingForSecondOperand = false;
    }
});

clearEverythingBtn.addEventListener('click', function() {
    currentInput = '';
    operator = '';
    firstOperand = '';
    waitingForSecondOperand = false;
    pendingFunc = '';
    pendingFuncArg = '';
    updateDisplay('');
    updateSecondaryDisplay('');
});

function operate(a, b, op) {
    if (op === '+') return a + b;
    if (op === '-') return a - b;
    if (op === '*') return a * b;
    if (op === '/') return b === 0 ? 'Error' : a / b;
    return b;
}

function toRadians(deg) {
    return deg * (Math.PI / 180);
}

function roundResult(num) {
    return Math.round(num * 1000000000) / 1000000000;
} 