let displayFieldContent = 0;
let userInputA ='';
let userInputB ='';
let userOperatorInput ='';
let toggle = false;
const displayDiv = document.getElementById('display');

//store and update user input and then refresh display field
function storeUserInput (input,toggle){
    console.log(`input is ${input} toggle is ${toggle}`);
        if (userInputA.length < 15 && toggle === false){
            userInputA = `${userInputA}${input}`;
            displayFieldContent = userInputA;
            refreshDisplayField();
        } else if (userInputB.length < 15 && toggle === true){
            userInputB = `${userInputB}${input}`;
            displayFieldContent = userInputB;
            refreshDisplayField();
        }
}

//stores operator
function storeUserOperator (input){
    userOperatorInput = input;
    toggle = !toggle;
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

//add a listener to all numeric buttons that returns an integer
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

function refreshDisplayField (){
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