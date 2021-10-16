const calculator = document.querySelector('.calculator');
const arithmeticOutput = document.querySelector('.arithmetic-output');

const ONE_BUTTON = '1';
const TWO_BUTTON = '2';
const THREE_BUTTON = '3';
const FOUR_BUTTON = '4';
const FIVE_BUTTON = '5';
const SIX_BUTTON = '6';
const SEVEN_BUTTON = '7';
const EIGHT_BUTTON = '8';
const NINE_BUTTON = '9';
const ZERO_BUTTON = '0';
const CLEAR_BUTTON = 'C';
const DELETE_BUTTON = '←'
const DIVISION_BUTTON = '÷';
const MULTIPLICATION_BUTTON = '×';
const SUBTRACTION_BUTTON = '−';
const ADDITION_BUTTON = '+';
const COMPUTE_BUTTON = '=';
const NO_OP = 'NO_OP';

arithmeticOutput.innerText = ZERO_BUTTON;
let numberAppend = false;
let calcStarted = false;
let currentOperation = NO_OP;
let prevOperation = NO_OP;
let leftArg = 0;
let operatorLastClicked = false;
let numLastClicked = false;

calculator.addEventListener('click', function(event) {
    if(event.target.tagName === 'BUTTON'){
        const clickedButton = event.target.innerText;
        switch(clickedButton){
            case ONE_BUTTON:
            case TWO_BUTTON:
            case THREE_BUTTON:
            case FOUR_BUTTON:
            case FIVE_BUTTON:
            case SIX_BUTTON:
            case SEVEN_BUTTON:
            case EIGHT_BUTTON:
            case NINE_BUTTON:
                standardNumClick(clickedButton);
                break;
            case ZERO_BUTTON:
                if(numberAppend === false){
                    arithmeticOutput.innerText = ZERO_BUTTON;
                }
                else{
                    arithmeticOutput.innerText += ZERO_BUTTON;
                }
                break;
            case CLEAR_BUTTON:
                clear();
                break;
            case DELETE_BUTTON:
                if(arithmeticOutput.innerText.length <= 1){
                    arithmeticOutput.innerText = ZERO_BUTTON;
                    numberAppend = false;
                }
                else{
                    arithmeticOutput.innerText = arithmeticOutput.innerText.substring(0, arithmeticOutput.innerText.length - 1);
                }
                break;
            case DIVISION_BUTTON:
                operationClick(DIVISION_BUTTON);
                break;
            case MULTIPLICATION_BUTTON:
                operationClick(MULTIPLICATION_BUTTON);
                break;                
            case SUBTRACTION_BUTTON:
                operationClick(SUBTRACTION_BUTTON);
                break;                
            case ADDITION_BUTTON:
                operationClick(ADDITION_BUTTON);
                break;                
            case COMPUTE_BUTTON:
                if(calcStarted){
                    leftArg = compute(leftArg, parseInt(arithmeticOutput.innerText), currentOperation);
                    arithmeticOutput.innerText = leftArg;
                    calcStarted = false;
                    currentOperation = NO_OP;
                    operatorLastClicked = false;
                    prevOperation = currentOperation;
                    numberAppend = false;
                }
                break;
        }
    }
  });


function clear(){
    arithmeticOutput.innerText = ZERO_BUTTON;
    numberAppend = false;
    calcStarted = false;
    currentOperation = NO_OP;
    leftArg = 0;
    operatorLastClicked = false;
    numLastClicked = false;
}

function standardNumClick(numClicked) {
    if (numberAppend === false) {
        arithmeticOutput.innerText = numClicked;
        numberAppend = true;
    }
    else {
        arithmeticOutput.innerText += numClicked;
    }
    operatorLastClicked = false;
    numLastClicked = true;
}

function operationClick(operation){
    numberAppend = false;
    currentOperation = operation;
    if(calcStarted === false){
        leftArg = parseInt(arithmeticOutput.innerText);
        calcStarted = true;
        prevOperation = operation;
    }
    else{
        if(operatorLastClicked){
            currentOperation = operation;
        }
        else{
            leftArg = compute(leftArg, parseInt(arithmeticOutput.innerText), prevOperation);
            prevOperation = currentOperation;
        }
    }
    arithmeticOutput.innerText = ZERO_BUTTON;
    operatorLastClicked = true;
}

function compute(leftArg, rightArg, operation){
    output = 0;
    switch(operation){
        case DIVISION_BUTTON:
            output = Math.floor(leftArg / rightArg);
            break;
        case MULTIPLICATION_BUTTON:
            output = Math.floor(leftArg * rightArg);
            break;
        case SUBTRACTION_BUTTON:
            output = Math.floor(leftArg - rightArg);
            break;
        case ADDITION_BUTTON:
            output = Math.floor(leftArg + rightArg);
            break;
    }
    return output;
}