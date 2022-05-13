//imports
import { saveAskInDatabase, fillTableAsks, createTheExam } from "./controllers/matterController.js";
import { deleteMatter, getMatter, updateMatter } from "./Database/index.js";
//variables
const params = new URLSearchParams(window.location.search);
const img = document.querySelector('main .container-matter .info-matter .container-img img');
const inputTitle =  document.querySelector('main .container-matter .info-matter .infos input');
const nameMatter = await getMatter(params.get('matterid'));



//my simple constructor
function init(){
    writeTitlePage();
    fillBoxInfo();
    editBoxInfo();
    eventsButtonsMatter();
    defineQntdQuestions();
}
init();


// write page's title
function writeTitlePage(){
    document.querySelector('title').innerText = nameMatter.data.name
    document.querySelector('link#favicon').href = nameMatter.data.image;
}
//fill box infos
async function fillBoxInfo(){
    img.src = nameMatter.data.image;
    inputTitle.value = nameMatter.data.name
}

//edit box infos
function editBoxInfo(){
    const btnEdit = document.querySelector('main .container-matter .info-matter .infos .settings-matter span#edit-link');
    const btnDel = document.querySelector('main .container-matter .info-matter .infos .settings-matter span#del-link');
    const imgEdit = document.querySelector('main .container-matter .info-matter .container-img > span')
    const modalEdit = document.querySelector('main .container-matter .info-matter .container-img div#modal')
    const closeModal = document.querySelector('main .container-matter .info-matter .container-img div#modal span#close')
    const inputUrl = document.querySelector('main .container-matter .info-matter .container-img div#modal input#url-image')
    const btnModal = document.querySelector('main .container-matter .info-matter .container-img div#modal button')

    btnEdit.addEventListener('click' , ()=>{
        inputTitle.disabled = false
        inputTitle.focus();
        saveNewTitle();
    });

    imgEdit.addEventListener('click' , ()=>{
        modalEdit.style.display = 'grid'
        closeModal.addEventListener('click' , ()=> modalEdit.style.display = 'none');
        btnModal.addEventListener('click', async ()=>{
            await updateMatter(params.get('matterid'), {image: inputUrl.value});
            window.location.reload();
        } )
    });

    function saveNewTitle(){
        inputTitle.addEventListener('focusout' , async ()=>{
            inputTitle.disabled = true
            await updateMatter(params.get('matterid'), {name: inputTitle.value});
        })

        inputTitle.addEventListener('keypress', (e)=>{
            if(e.keyCode == 13) inputTitle.blur();
        })
    }

    btnDel.addEventListener('click' , () =>{
        const modal = document.querySelector('.container-modals.container-delete');
        const buttonCancelModal = document.querySelector('.container-modals .box-buttons button#cancel');
        const buttonDelModal = document.querySelector('.container-modals .box-buttons button#delete');
        modal.style.display = 'grid';
        buttonDelModal.addEventListener('click' , async ()=>{
            await deleteMatter(params.get('matterid'));
            window.location.href = '/'
        });
        buttonCancelModal.addEventListener('click' , ()=>{
            modal.style.display = 'none';
        })
    })
}   

//navigation matter button
function eventsButtonsMatter(){
    const modalCrearAsk = document.querySelector('.container-modals.container-crear-ask');
    const modalSeeAsk = document.querySelector('.container-modals.container-see-ask');
    const modalNewExam = document.querySelector('.container-modals.container-new-exam');
    const buttons = document.querySelectorAll('main .container-matter .option-matter button');
    buttons.forEach(e=> e.addEventListener('click' , (ev)=>{
        switch(ev.target.id){
            case "crear-exam": {
                modalNewExam.style.display = 'grid';
                localStorage.removeItem('randomquestion');
                createTheExam(nameMatter.data.ask.length);
                break;
            }
            case "crear-ask":{
                modalCrearAsk.style.display = 'grid'
                saveAskInDatabase();
                break;
            } 
            case "see-ask":{
                modalSeeAsk.style.display = 'grid'
                fillTableAsks();
                break;
            } 
            default: alert('não listado!')
        }
    }))
}

//define a max value for ask
function defineQntdQuestions(){
    var qntd = document.querySelector('input#qntd-questions')
    qntd.setAttribute("max" , nameMatter.data.ask.length);
    
}