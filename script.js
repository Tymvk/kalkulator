const display = document.querySelector('.calculator-screen');

const buttons = document.querySelectorAll(".calculator-keys>button");

let buttonNum = [];
let buttonOperator = [];
let buttonFunction = [];
let cache = [];
let cacheValue =  "";
let lastOperator = null; 

buttons.forEach((button) => {
    if(button.classList.contains('operator')) {
        buttonOperator.push(button);
        const operator = button.value;
        switch(operator) {
            case '+':
                button.addEventListener('click', (e) => {
                    if (cacheValue !== "") {
                        add(parseFloat(cacheValue));
                        lastOperator = '+';
                    }
                });
                break;
            case '-':
                button.addEventListener('click', (e) => {
                    if (cacheValue !== "") {
                        subtract(parseFloat(cacheValue));
                        lastOperator = '-';
                    }
                });
                break;
            case '*':
                button.addEventListener('click', (e) => {
                    if (cacheValue !== "") {
                        multiply(parseFloat(cacheValue)); 
                        lastOperator = '*';
                    }
                });
                break;
            case '/':
                button.addEventListener('click', (e) => {
                    if (cacheValue !== "") {
                        divide(parseFloat(cacheValue));
                        lastOperator = '/';
                    }
                });
                break;
        }
    } else if(button.classList.contains('decimal')) {
        button.addEventListener('click', (e) => {
            if (!cacheValue.includes('.')) {
                setDisplayValue('.');
                cacheValue += '.';
            }
        });
    } else if(button.classList.contains('all-clear')) {
        buttonFunction.push(button);
        button.addEventListener('click', (e) => {
            clearDisplay();
            cache = [];
        });
    } else if(button.classList.contains('equal-sign')) {
        buttonFunction.push(button);
        button.addEventListener('click', (e) => {
            equal();
        });
    } else {
        buttonNum.push(button);
        buttonFunction.push(button);
        button.addEventListener('click', (e) => {
            setDisplayValue(e.target.value);
            console.log(e.target.value);
        });
    }
});

function setDisplayValue(value) {
    display.innerText += value;
    console.log("value:" + value);
    cacheValue += value;
}

function clearDisplay() {
    display.innerText = "";
    cacheValue = "";
}

function add(a) {
    cache.push(a);
    if (cache.length >= 2) {
        clearDisplay();
        let sum = cache[0] + cache[1];
        cache = [];
        cache.push(sum);
        setDisplayValue(sum);
    } else {
        clearDisplay();
    }
}

function subtract(a) {
    cache.push(a);
    if (cache.length >= 2) {
        clearDisplay();
        let result = cache[0] - cache[1];
        cache = [];
        cache.push(result);
        setDisplayValue(result);
    } else {
        clearDisplay();
    }
}

function multiply(a) {
    cache.push(a);
    if (cache.length >= 2) {
        clearDisplay();
        let result = cache[0] * cache[1];
        cache = [];
        cache.push(result);
        setDisplayValue(result);
    } else {
        clearDisplay();
    }
}

function divide(a) {
    cache.push(a);
    if (cache.length >= 2) {
        if (cache[1] === 0) {
            clearDisplay();
            setDisplayValue("Error"); 
        } else {
            clearDisplay();
            let result = cache[0] / cache[1];
            cache = [];
            cache.push(result);
            setDisplayValue(result);
        }
    } else {
        clearDisplay();
    }
}

function equal() {
    if (cache.length >= 1) {
        switch(lastOperator) {
            case '+':
                add(parseFloat(cacheValue));
                break;
            case '-':
                subtract(parseFloat(cacheValue));
                break;
            case '*':
                multiply(parseFloat(cacheValue));
                break;
            case '/':
                divide(parseFloat(cacheValue));
                break;
            default:
                break;
        }
    } else {
        setDisplayValue(cache[0]);
    }
}

