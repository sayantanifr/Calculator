const display = document.getElementById("display");
const expression = document.getElementById("expression");

const numberButtons = document.querySelectorAll(".number");
const operatorButtons = document.querySelectorAll(".operator");

const clearButton = document.getElementById("clear");
const equalsButton = document.getElementById("equals");
const backspaceButton = document.getElementById("backspace");
const signButton = document.getElementById("sign");
const percentButton = document.getElementById("percent");

let currentNumber = "0";
let previousNumber = null;
let selectedOperator = null;
let shouldResetDisplay = false;

function updateDisplay() {
    display.textContent = currentNumber;
}

numberButtons.forEach(button => {

    button.addEventListener("click", () => {

        const value = button.textContent;

        if (shouldResetDisplay) {
            currentNumber = "";
            shouldResetDisplay = false;
        }

        if (value === ".") {

            if (!currentNumber.includes(".")) {

                if (currentNumber === "")
                    currentNumber = "0";

                currentNumber += ".";
            }

        } else {

            if (currentNumber === "0")
                currentNumber = value;
            else
                currentNumber += value;

        }

        updateDisplay();

    });

});

operatorButtons.forEach(button => {

    button.addEventListener("click", () => {

        previousNumber = parseFloat(currentNumber);

        selectedOperator = button.dataset.operator;

        expression.textContent =
            `${currentNumber} ${selectedOperator}`;

        shouldResetDisplay = true;

    });

});

equalsButton.addEventListener("click", () => {

    if (selectedOperator === null)
        return;

    const current = parseFloat(currentNumber);

    let result = 0;

    switch (selectedOperator) {

        case "+":
            result = previousNumber + current;
            break;

        case "−":
            result = previousNumber - current;
            break;

        case "×":
            result = previousNumber * current;
            break;

        case "÷":

            if (current === 0) {

                currentNumber = "Error";
                updateDisplay();

                expression.textContent = "";

                selectedOperator = null;

                return;

            }

            result = previousNumber / current;
            break;

    }

    result = Number(result.toFixed(10));

    expression.textContent =
        `${previousNumber} ${selectedOperator} ${current}`;

    currentNumber = result.toString();

    selectedOperator = null;

    previousNumber = null;

    shouldResetDisplay = true;

    updateDisplay();

});

clearButton.addEventListener("click", () => {

    currentNumber = "0";

    previousNumber = null;

    selectedOperator = null;

    expression.textContent = "";

    shouldResetDisplay = false;

    updateDisplay();

});

backspaceButton.addEventListener("click", () => {

    if (currentNumber.length > 1) {

        currentNumber =
            currentNumber.slice(0, -1);

    } else {

        currentNumber = "0";

    }

    updateDisplay();

});

signButton.addEventListener("click", () => {

    if (currentNumber !== "0") {

        currentNumber =
            (parseFloat(currentNumber) * -1).toString();

        updateDisplay();

    }

});

percentButton.addEventListener("click", () => {

    currentNumber =
        (parseFloat(currentNumber) / 100).toString();

    updateDisplay();

});

updateDisplay();