let displayFieldContent = 0;
let userInput ='';
const displayDiv = document.getElementById('display');

//store and update user input and then refresh display field
function storeUserInput (input){
    userInput = `${userInput}${input}`;
    displayFieldContent = userInput;
    refreshDisplayField();
}

//add a listener to all numeric buttons that returns an integer
const buttonInputs = document.querySelectorAll('.button.number');
buttonInputs.forEach(element => {
    element.addEventListener('click', (e) => {
        storeUserInput(parseInt(e.target.innerText));
        //displayFieldContent = e.target.innerText;
        //refreshDisplayField();
        
    });
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