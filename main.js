let displayFieldContent = 0;
const displayDiv = document.getElementById('display');


const buttonInputs = document.querySelectorAll('.button');
buttonInputs.forEach(element => {
    element.addEventListener('click', (e) => {
        console.log(e.target.id);
        displayFieldContent = e.target.id;
        refreshDisplayField();
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

console.log(operate(4,2,"divide"));