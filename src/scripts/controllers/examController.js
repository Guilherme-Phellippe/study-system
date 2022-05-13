export function sortedAsk(){



    return 
}


export function finishExam(id,qntd, time){
    let buttonSave = document.querySelector('.box-exam button.button');
    let txtArea = document.querySelector('.box-exam textarea');
    let p = document.querySelector('.box-exam p#current-ask');
    txtArea.disabled = true
    buttonSave.textContent = "Finalizar"
    p.textContent = "Prova finalizada!"
    buttonSave.addEventListener('click' , ()=> window.location.href = `/pages/correction.html?id=jk2b3uy2b3n21b4yak3l4n&matterid=${id}&time=${time}&qntd=${qntd}`)
}