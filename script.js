
const buttonsContainer = document.querySelector('#buttons-container');
const numberButtons = document.querySelectorAll('#numbers-container > .button');
const calculatorDisplay = document.querySelector('#display');
const operatorButtons = document.querySelectorAll('#operators-container > .operator');
const clearButton = document.querySelector('#clear');
const decimalPointButton = document.querySelector('#decimal-point');

let firstNumber;
let secondNumber;
let operator;
let solution = '0';
let decimalStatus = false; //This to limit to only 1 decimal point

const buttonsHandler = () => {
    buttonsContainer.addEventListener('click', event => {
        if (event.target.id === 'equal'){

            getSolution();
        }

        getNumbers(event);
    })

    clearButton.addEventListener('click', () => {
        firstNumber = null;
        secondNumber = null;
        operator = null;
        decimalStatus = false;
        solution = '0';

        display();
    })

    decimalPointButton.addEventListener('click', event => {
        if (decimalStatus){
            return;
        } else {
            decimalStatus = true
            assignNumbers(event.target.innerText);
        }
    })

    getOperator();
}   

const getNumbers = (eventObj) => {
    if ([...eventObj.target.classList].includes('number')){
        number = eventObj.target.innerText;
        assignNumbers(number);
    }
}

const assignNumbers = (number) => {
    if (!operator){
        //This is when the use clicks a new number after the hitting the equal button 
        solution = null;

        if (firstNumber){
            firstNumber += number;
        } else {
            firstNumber = number;
        }

    } else {
        if (secondNumber){
            secondNumber += number;
        } else {
            secondNumber = number;
        }
    }

    display()
}


// This function will get the operator selected and display it
const getOperator = () => {
    operatorButtons.forEach(button => button.addEventListener('click', event => {
        if (operator && secondNumber || solution) {
            getSolution();
            firstNumber = solution;
            solution = null;
            operator = event.target.id;
            display();

        } else if (firstNumber){
            decimalStatus = false
            operator = event.target.id;
            display();
        }

        
    }));
}

// Handles all the display
const display = (error = null) => {
    if (error){
        calculatorDisplay.innerText = 'Error';
        return;
    }

    if (solution){
        calculatorDisplay.innerText = solution;
        return;
    }

    if (operator){
        if (!secondNumber){
            secondNumber = '';
        }

        calculatorDisplay.innerText = `${firstNumber}${operator}${secondNumber}`
    } else {
        calculatorDisplay.innerText = firstNumber
    }
    
}

const getSolution = () => {
    let hasError = false //Tracks if there is an error on the expression
    if (firstNumber && secondNumber){
        num1 = parseFloat(firstNumber);
        num2 = parseFloat(secondNumber);

        switch (operator){
            case '+':
                solution = `${num1 + num2}`;
                break;

            case '-':
                solution = `${num1 - num2}`;
                break;
                
            case '*':
                solution = `${num1 * num2}`;
                break;
                
            case '/':
                if (num1 === 0){
                    solution = '0';
                } else if (num2 === 0){
                    hasError = true;
                } else {
                    solution = `${num1 / num2}`
                }
                break;
        
        }
        
    } else if (firstNumber){
        solution = `${parseFloat(firstNumber)}`;
    }
    display(hasError);
    decimalStatus = false;
    firstNumber = null
    secondNumber = null;
    operator = null;
}

buttonsHandler();
display();