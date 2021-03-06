//global variables
let userInputA = '';
let userInputB = '';
let userOperatorInput = '';
let toggle = false; //toggle used to determine A or B input. False is A input.
const displayDiv = document.getElementById('display'); //where text is shown

//main controller function
function controller (unparsedInput) {
    let inputType = typeof(unparsedInput);
    if (inputType === "number") {
        storeUserInput(unparsedInput, toggle);
        console.log(`in number, toggle is ${toggle}`);
    } else if (inputType === "string") {
        if (unparsedInput === "plus" ||
            unparsedInput === "subtract" ||
            unparsedInput === "multiply" ||
            unparsedInput === "divide") {
                if (userOperatorInput !== '') {
                    if (userOperatorInput !== unparsedInput) {
                        console.log('userOperatorInput is not equal to unparsedInput');
                        userInputA = operate(userInputA,userInputB,userOperatorInput);
                        refreshDisplayField(userInputA);
                        userInputB = '';
                        toggle = true;
                    } else {
                        console.log('userOperatorInput is NOT blank')
                        userInputA = operate(userInputA,userInputB,userOperatorInput);
                        refreshDisplayField(userInputA);
                        userInputB = '';
                        toggle = true;
                    }
                }
                if (userOperatorInput === ''){
                    console.log('userOperatorInput is blank')
                    toggle = true;
                }

            storeUserOperator(unparsedInput);
            //toggle = !toggle;

        } else if (unparsedInput = 'equals' && userOperatorInput !== '') {
            console.log('in controller equals');
            userInputA = operate(userInputA,userInputB,userOperatorInput);
            refreshDisplayField(userInputA);
            userInputB = '';
            userOperatorInput = '';
            toggle = true;
        }
    }
    
}

function storeUserInput (num, toggle) {
    userInputA_length = userInputA.toString().length;
    userInputB_length = userInputB.toString().length;
    //console.log(`userInputA_length is ${userInputA_length}`);
    if (userInputA_length < 15 && toggle === false) {
        userInputA = (`${userInputA}${num}`);
        refreshDisplayField(userInputA);
    } else if (userInputB_length < 15 && toggle === true) {
        userInputB = (`${userInputB}${num}`);
        refreshDisplayField(userInputB);
    }
}

//decimal functionality
document.getElementById('decimal').addEventListener('click', (e) => {    
    if (userInputA.toString().indexOf(".") === -1 && toggle === false){
        //add a leading zero if decimal is needed
        if (userInputA === '') {
            userInputA = 0;
        }
        userInputA = (`${userInputA}${'.'}`)
        refreshDisplayField(userInputA);

    } else if (userInputB.toString().indexOf(".") === -1 && toggle === true){
        if (userInputB === '') {
            userInputB = 0;
        }
        userInputB = (`${userInputB}${'.'}`)
        refreshDisplayField(userInputB);
}});


function storeUserOperator (input) {
    userOperatorInput = input;
}

//clear display and input
function clearAll(){
    userInputA = '';
    userInputB = '';
    userOperatorInput = '';
    toggle = false;
    refreshDisplayField(0);
}

//add a listener to all buttons
const buttonInputs = document.querySelectorAll('.button');
buttonInputs.forEach(element => {
    element.addEventListener('click', (e) => {
        if (e.target.classList.contains('number')){
            //storeUserInput(parseInt(e.target.innerText),toggle); //original code
            controller(parseInt(e.target.innerText));
        } else if (e.target.classList.contains('operator')) {
            //storeUserOperator(e.target.id); //original code
            controller(e.target.id);
        }
            // console.log((e.target.classList.contains('button')));
    });
});

//ac clear functionality
document.getElementById('ac').addEventListener('click', (e) => {
    clearAll();
});

//equals functionality
document.getElementById('equals').addEventListener('click', (e) => {
    controller('equals');
});


function refreshDisplayField (updateDisplayField = 0){
    console.log(`updateDisplayField is ${updateDisplayField}`);
    if (updateDisplayField.toString().length > 15){
        //updateDisplayField = round((updateDisplayField),15);
        //updateDisplayField = updateDisplayField.toString().slice(0,20);
        updateDisplayField = updateDisplayField.toExponential(10);
    }
    
    displayDiv.textContent = updateDisplayField;
}

function round (value, decimals) {
    return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
}


//arithmetic functions
add = ((a,b) => a+b);
subtract = ((a,b) => a-b);
multiply = ((a,b) => a*b);
function divide (a,b) {
    if (b != 0){
        return ((a*10)/(b*10)); //fix this later to handle floats better
    } else {
        return "Divide by 0";
    }
};

function operate (a,b,operator = "plus"){
    a = Number(a);
    b = Number(b);
    switch(operator) {
        case "plus":
            answer = add(a,b);
            break;
        case "subtract":
            answer = subtract(a,b);
            break;
        case "multiply":
            answer = multiply(a,b);
            break;
        case "divide":
            answer = divide(a,b);
            break;
        default:
            console.log('default case')
    }
    return answer;
}

refreshDisplayField(0);