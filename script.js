document.addEventListener('DOMContentLoaded', () => {
    const display = document.querySelector('.calculator-screen');
    const keys = document.querySelector('.calculator-keys');
    let currentOperand = '';
    let previousOperand = '';
    let operator = null;

    keys.addEventListener('click', (event) => {
        const { value, className } = event.target;

        if (!value) return;

        if (className.includes('operator')) {
            if (operator) {
                calculate();
            }
            operator = value;
            previousOperand = currentOperand;
            currentOperand = '';
        } else if (className === 'decimal') {
            if (!currentOperand.includes('.')) {
                currentOperand += value;
            }
        } else if (className === 'percentage') {
            currentOperand = (parseFloat(currentOperand) / 100).toString();
        } else if (className === 'equal-sign') {
            calculate();
            operator = null;
        } else if (className === 'All-clear') {
            currentOperand = '';
            previousOperand = '';
            operator = null;
        } else if (className === 'DEL') {
            currentOperand = currentOperand.slice(0, -1);
        } else {
            currentOperand += value;
        }

        updateDisplay();
    });

    function calculate() {
        let result;
        const prev = parseFloat(previousOperand);
        const current = parseFloat(currentOperand);

        if (isNaN(prev) || isNaN(current)) return;

        switch (operator) {
            case '+':
                result = prev + current;
                break;
            case '-':
                result = prev - current;
                break;
            case '*':
                result = prev * current;
                break;
            case '/':
                if (current === 0) {
                    alert("Cannot divide by zero");
                    result = '';
                } else {
                    result = prev / current;
                }
                break;
            default:
                return;
        }

        currentOperand = result.toString();
        previousOperand = '';
    }

    function updateDisplay() {
        display.value = currentOperand || previousOperand || '0';
    }
});
