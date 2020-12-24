//global variables
let userInputA = 0;
let userInputB = 0;
let userOperatorInput = '';
let toggle = false; //toggle used to determine A or B input. False is A input.
let userInputB_hasChanged = false;
const displayDiv = document.getElementById('display'); //where text is shown

//main controller function
function controller (unparsedInput) {
    let inputType = typeof(unparsedInput);
    console.log(inputType);
    if (inputType === "number") {
        storeUserInput(unparsedInput, toggle);
    } else if (inputType === "string") {
        if (unparsedInput === "plus" ||
            unparsedInput === "subtract" ||
            unparsedInput === "multiply" ||
            unparsedInput === "divide") {
            storeUserOperator(unparsedInput);
        }
    }
}

function storeUserInput (num, toggle) {
    userInputA_length = userInputA.toString().length;
    userInputB_length = userInputB.toString().length;
    if (userInputA_length < 15 && toggle === false) {
        userInputA = Number((`${userInputA}${num}`));;
        console.log(`userInputA is ${userInputA}`);
        refreshDisplayField(userInputA);
    } else if (userInputB_length < 15 && toggle === true) {
        userInputB = Number((`${userInputB}${num}`));;
        userInputB_hasChanged = true;
        console.log(`userInputB is ${userInputB}`);
        refreshDisplayField(userInputB);
    }
}

//decimal functionality
document.getElementById('decimal').addEventListener('click', (e) => {    
    if (userInputA.toString().indexOf(".") === -1 && toggle === false){
        userInputA = (`${userInputA}${'.'}`)
        refreshDisplayField(userInputA);

    } else if (userInputB.toString().indexOf(".") === -1 && toggle === true){
        userInputB = (`${userInputB}${'.'}`)
        userInputB_hasChanged = true;
        refreshDisplayField(userInputB);
}});

//stores operator
function storeUserOperator (input){
    //userOperatorInput = input;
    console.log(`storeUserOperator input paran is ${input} userOperatorInput is ${userOperatorInput}`);
    
    
    if (userOperatorInput !== '' && userInputB_hasChanged !== false) { //if userOperatorInput is NOT empty
        userInputA = operate(userInputA,userInputB,userOperatorInput);
        userOperatorInput = input;
        refreshDisplayField(userInputA);
        userInputB = 0; //check this
        toggle = true;
    } else {
        // userOperatorInput = input;
        toggle = !toggle; //flip toggle so numeric input switches
    }
}

//clear display and input
function clearAll(){
    userInputA = 0;
    userInputB = 0;
    userInputB_hasChanged = false;
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
    equals();
});

//equals
function equals(storedToggle = toggle){
    if (userInputB_hasChanged === true){
        userInputA = operate(userInputA,userInputB,userOperatorInput);
        refreshDisplayField(userInputA);
    }
    
    

    
    //resets check this
    
    userInputB = 0;
    toggle = false;
}


function refreshDisplayField (updateDisplayField = 0){
    /* fix this section later to deal with long floats
    keep it within the display for long floats
    
    if (updateDisplayField.toString().length > 17){
        updateDisplayField = displayFieldContent.toString().slice(0,17);
    }
    */
    displayDiv.textContent = updateDisplayField;
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