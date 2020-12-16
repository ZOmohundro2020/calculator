let displayFieldContent = 0;
let userInputA ='';
let userInputB ='';
let userOperatorInput ='';
let toggle = false; //toggle used to determine A or B input
const displayDiv = document.getElementById('display');

//next time try parseFloat(INPUT).toFixed(X) where X is the length needed to preserve decimal


//store and update user input and then refresh display field. takes in toggle to determine A input or B input
function storeUserInput (input,toggle){
        userInputA_length = userInputA.toString().length;
        userInputB_length = userInputB.toString().length;
        if (userInputA_length < 15 && toggle === false){
            (input == '.' && userInputA == 0) ? userInputA = '0.' 
                : (input == '.') ? userInputA = (`${userInputA}${input}`) //leave input alone if decimal
                : (input == 0 && userInputA.toString().indexOf(".") != -1 )//&& userInputA_length < 3)
                ? userInputA = parseFloat(`${userInputA}${input}`).toFixed(userInputA_length - 1)
                : userInputA = Number(`${userInputA}${input}`); //convert it to number if no decimal
            displayFieldContent = userInputA;
            refreshDisplayField();
        } else if (userInputB.toString().length < 15 && toggle === true){
            (input == '.') ? userInputB = (`${userInputB}${input}`)
                : userInputB = Number(`${userInputB}${input}`);
            displayFieldContent = userInputB;
            refreshDisplayField();
        }
}

//decimal functionality
document.getElementById('decimal').addEventListener('click', (e) => {    
    if (userInputA.toString().indexOf(".") === -1 && toggle === false){
        storeUserInput('.',toggle);
    } else if (userInputB.toString().indexOf(".") === -1 && toggle === true){
        storeUserInput('.',toggle);
}});

//stores operator
function storeUserOperator (input){
    userOperatorInput = input;
    toggle = !toggle; //flip toggle so numeric input switches
    console.log(`userOperatorInput is ${userOperatorInput}`);
    console.log(`toggle is now ${toggle}`);
}

//clear display and input
function clearAll(){
    displayFieldContent = '';
    userInputA = '';
    userInputB = '';
    toggle = false;
    refreshDisplayField();
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
    displayFieldContent = operate(userInputA,userInputB,userOperatorInput);
    console.log(`displayFieldContent is ${displayFieldContent}`);
    userInputA = displayFieldContent;
    userInputB = '';
    toggle = false;
    refreshDisplayField();
});




function refreshDisplayField (){
    //keep it within the display for long floats
    
    if (displayFieldContent.toString().length > 17){
        displayFieldContent = displayFieldContent.toString().slice(0,17);
    }
    displayDiv.textContent = displayFieldContent;
}

refreshDisplayField();


//arithmetic functions
add = ((a,b) => a+b);
subtract = ((a,b) => a-b);
multiply = ((a,b) => a*b);
function divide (a,b) {
    if (b != 0){
        return a/b;
    } else {
        return "Divide by 0";
    }
};

function operate (a,b,operator){
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
    }
    return answer;
}

//console.log(operate(4,2,"divide"));