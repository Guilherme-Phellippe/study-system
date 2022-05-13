import { createAsk, deleteAsk, getMatter } from "../Database/index.js";
const params = new URLSearchParams(window.location.search)

export function saveAskInDatabase() {
    const modal = document.querySelector('.container-modals.container-crear-ask')
    const buttonSave = document.querySelector('.container-modals .modal-crear-ask button');
    const close = document.querySelector('.container-modals .modal-crear-ask span#close');
    close.addEventListener('click' , () =>{
        modal.style.display = 'none'
    })
    buttonSave.addEventListener('click', async () => {
        const askValue = document.querySelector('.container-modals .modal-crear-ask textarea#ask');
        const answerValue = document.querySelector('.container-modals .modal-crear-ask textarea#answer');
        await createAsk(params.get('matterid'), { ask: askValue.value, answer: answerValue.value, nivel: 0 });
        askValue.value = ''
        answerValue.value = ''
        modal.style.display = 'none'
    })
}

export async function fillTableAsks() {
    const tbody = document.querySelector('.container-modals.container-see-ask table tbody#tbody-see-ask');
    const asks = await getMatter(params.get('matterid'));
    var idAsk = 0
    tbody.innerHTML = ''
    for (let ask of asks.data.ask) {
        let tr = document.createElement('tr');
        let td_id = tr.insertCell();
        let td_ask = tr.insertCell();
        let td_answer = tr.insertCell();
        let td_nivel = tr.insertCell();
        let td_action = tr.insertCell();

        td_id.innerText = idAsk
        td_ask.innerText = ask.ask
        td_answer.innerText = ask.answer
        td_nivel.innerText = ask.nivel
        td_action.innerHTML = `<i class="fa-solid fa-trash" id="${idAsk}"></i> <i class="fa-solid fa-hammer" id="${idAsk}"></i>`

        //events
        td_action.querySelector("i.fa-trash").addEventListener('click', async (e) => {
            await deleteAsk(params.get('matterid'), { index: e.target.id })
            window.location.reload();
        });

        tbody.appendChild(tr)

        idAsk++;
    }

    
    //events 
    const modalSeeAsk = document.querySelector('.container-modals.container-see-ask')
    const close = document.querySelector('.container-modals.container-see-ask span#close');
    close.addEventListener('click', () => modalSeeAsk.style.display = 'none')


}

export function createTheExam(max){
    const buttonCrear = document.querySelector('.container-modals .modal-new-exam button');
    buttonCrear.addEventListener('click', ()=>{
        var qntd =  document.querySelector('.container-modals .modal-new-exam input[type=number]').value;
        var isFlashCard = false;
        window.location.href = `/pages/exam.html?id=267eh23g42343274curh&matterid=${params.get('matterid')}&qntd=${qntd}&max=${max}&fc=${isFlashCard}`
    });
}