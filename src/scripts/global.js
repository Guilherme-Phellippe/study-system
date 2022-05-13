import { changeColor } from "./controllers/indexController.js";

function init(){
    changeBackground();
}
init();

// change color body
function changeBackground(){
    const range = document.querySelector('.container header input[type=range]');
    range.addEventListener('change', (e)=>{
        changeColor(e.target.value);
    })
}