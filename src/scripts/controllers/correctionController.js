const params = new URLSearchParams(window.location.search);
const main = document.querySelector('.container main');
import { getMatter } from '../Database/index.js'

export async function createAskAndAnswer() {
    let matter = await getMatter(params.get('matterid'))
    let links = main.querySelector('.tab-links');
    let contents = main.querySelector('.tab-content');
    let button = [];
    let sections = [];

    for (let index = 0; index < Number(params.get('qntd')); index++) {
        //user answer
        let randomQuestion = JSON.parse(localStorage.getItem('randomquestion'));
        //tab links
        button.push(create('button'));
        button[index].setAttribute('data-id', 'answer-' + (index + 1));
        button[index].setAttribute('id', 'i-'+index);
        button[index].setAttribute('class', 'i-'+index);
        button[index].innerText = 'Pergunta ' + (index + 1);
        links.appendChild(button[index]);
        //tab contents
        sections.push(create('section'));

        let h2_ask = create('h2');
        let div_response = create('div');
        let fieldset_p_correct = create('fieldset')
        let fieldset_p_user = create('fieldset')
        let legend_p_correct = create('legend')
        let legendt_p_user = create('legend')
        let p_correct_res = create('p');
        let p_user_res = create('p');
        let div_correction = create('div')
        let label_correct = create('label')
        let isCorrect = create('input');

        div_response.setAttribute('class' , 'box-response')
        div_correction.setAttribute('class' , 'box-correction')
        isCorrect.setAttribute('type', 'range')
        isCorrect.setAttribute('min', '1')
        isCorrect.setAttribute('max', '3')
        isCorrect.setAttribute('value', '2')
        isCorrect.setAttribute('class', 'is-correct')
        isCorrect.setAttribute('id', 'index-'+index)
        sections[index].setAttribute('id', 'answer-' + (index + 1));

        legend_p_correct.innerText = 'Resposta correta'
        legendt_p_user.innerText = 'Sua resposta'
        h2_ask.innerText = matter.data.ask[randomQuestion[index]].ask
        p_correct_res.innerText = matter.data.ask[randomQuestion[index]].answer
        const answer = JSON.parse(localStorage.getItem('answers'))
        p_user_res.innerText = answer[index]
        label_correct.innerText = 'Está correto?'

        //event input
        isCorrect.addEventListener('change' , (ev)=>{
            const note = document.querySelector('.container section h3#exam-note').textContent;
            if(isCorrect.value == 3){
                isCorrect.style.background = 'green';
                ev.target.closest('.tabs').querySelector('.tab-links button#i-'+index).style.background = '#00ff0030'
                setNoteAndTime(true, ev.target.id);
            }
            else if(isCorrect.value == 1) {
                isCorrect.style.background = 'red'
                ev.target.closest('.tabs').querySelector('.tab-links button#i-'+index).style.background = '#ff000030'
                setNoteAndTime(false, ev.target.id);
            }else{
                isCorrect.style.background = 'var(--background-white)'
                ev.target.closest('.tabs').querySelector('.tab-links button#i-'+index).style.background = 'transparent'
                setNoteAndTime(false, ev.target.id);
            }
        })


        sections[index].appendChild(h2_ask)
        fieldset_p_correct.appendChild(legend_p_correct)
        fieldset_p_correct.appendChild(p_correct_res)
        fieldset_p_user.appendChild(legendt_p_user)
        fieldset_p_user.appendChild(p_user_res)
        div_response.appendChild(fieldset_p_correct)
        div_response.appendChild(fieldset_p_user)
        sections[index].appendChild(div_response)
        div_correction.appendChild(label_correct)
        div_correction.appendChild(isCorrect)
        sections[index].appendChild(div_correction)

        contents.appendChild(sections[index]);

    }

    function create(element) {
        return document.createElement(element)
    }
}

var finalNote = 0
var lastId = []
export function setNoteAndTime(isCorrect , id){
    const note = document.querySelector('.container section h3#exam-note');
    const time = document.querySelector('.container section h3#exam-time');
    var res = lastId.find(e=> e == id)
    if(!res && isCorrect){
        lastId.push(id);
        finalNote += (10 / params.get('qntd')) 
    }else if(res && !isCorrect){
        finalNote -= (10 / params.get('qntd')) 
        var index = lastId.indexOf(id)
        lastId.splice(index , 1)
    }
    console.log(finalNote)
    note.textContent = `Nota: ${Math.round(finalNote)}`
    time.textContent = `Tempo: ${params.get('time')}`
}


export function tabNavigation(){
    const html = {
        btns : [...document.querySelector('.tabs .tab-links').children],
        contents : [...document.querySelector('.tabs .tab-content').children]
    }


    function hiddeAllContent(){
        html.contents.forEach(e => e.style.display = 'none')
    }
    
    function removeAllActiveClass(){
    
    }
    
    function showCurrentTab(id){
        const tabContent = document.querySelector('section#'+id);
        tabContent.style.display = 'flex'
    }

    function selectTab(ev){
        hiddeAllContent();
        const target = ev.currentTarget;
        showCurrentTab(target.dataset.id)
    }
    
    function listenForClick(){
        html.btns.forEach(e=> e.addEventListener('click', selectTab));
    }

    function init(){
        hiddeAllContent();
        listenForClick();
    }
    init();
}
