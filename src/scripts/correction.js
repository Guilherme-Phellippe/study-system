import { createAskAndAnswer, tabNavigation, setNoteAndTime } from "./controllers/correctionController.js";

function init() {
    showAnswer();
    saveExam();
    setNoteAndTime();
}
init();


async function showAnswer() {
    await createAskAndAnswer();
    tabNavigation();
}


function saveExam(){
    let button = document.querySelector('.container > section button.button');
    button.addEventListener('click' , ()=>{
        localStorage.removeItem('answers')
        window.location.href = `/study-system/`
    }) 
}
