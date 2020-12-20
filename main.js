let userInputA = 0;
let userInputB = '';
let userOperatorInput = '';
let toggle = false; //toggle used to determine A or B input. False is A input.
const displayDiv = document.getElementById('display');

//next time try parseFloat(INPUT).toFixed(X) where X is the length needed to preserve decimal

function storeUserInput (num, toggle) {
    userInputA_length = userInputA.toString().length;
    userInputB_length = userInputB.toString().length;
    if (userInputA_length < 15 && toggle === false) {
        userInputA = Number((`${userInputA}${num}`));;
        console.log(`userInputA is ${userInputA}`);
        refreshDisplayField(userInputA);
    } else if (userInputB_length < 15 && toggle === true) {
        userInputB = Number((`${userInputB}${num}`));;
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
        refreshDisplayField(userInputB);
}});

//stores operator
function storeUserOperator (input){
    console.log(`storeUserOperator input is ${input} userOperatorInput is ${userOperatorInput}`);
    if (userOperatorInput !== '') { //if userOperatorInput is NOT empty
        toggle = false;
        equals();
    } else {
        userOperatorInput = input;
        toggle = !toggle; //flip toggle so numeric input switches
    //console.log(`toggle is now ${toggle}`);
    }
}

//clear display and input
function clearAll(){
    userInputA = 0;
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
            storeUserInput(parseInt(e.target.innerText),toggle);
        } else if (e.target.classList.contains('operator')) {
            storeUserOperator(e.target.id);
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
function equals(){
    console.log('in equals()');
    console.log(`userInputA is ${userInputA}, userInputB is ${userInputB}, userOperatorInput is ${userOperatorInput}`);
    console.log(`toggle is ${toggle}`);
    userInputA = operate(userInputA,userInputB,userOperatorInput);
    refreshDisplayField(userInputA);
    
    //resets
    userInputA = 0;
    userInputB = '';
    userOperatorInput = '';
    toggle = false;


    console.log(`end toggle is ${toggle}`);
    //refreshDisplayField(userInputA);
}


function refreshDisplayField (updateDisplayField = 0){
    //keep it within the display for long floats
    
    // if (updateDisplayField.toString().length > 17){
    //     updateDisplayField = displayFieldContent.toString().slice(0,17);
    // }
    displayDiv.textContent = updateDisplayField;
}

refreshDisplayField(0);


//arithmetic functions
add = ((a,b) => a+b);
subtract = ((a,b) => a-b);
multiply = ((a,b) => a*b);
function divide (a,b) {
    if (b != 0){
        return ((a*10)/(b*10));
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

