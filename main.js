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