async function init(){
    modalNewMatter();
    await addMattersToPage();
    addNewMatter();
    redirectMatterPage();
}
init();

import { createMatters } from "./controllers/indexController.js";
import { addNewMatterInDataBase, closeModal } from "./controllers/modalController.js";

//modal create a new matter
function modalNewMatter(){
    const btn_newMatter = document.querySelector('main .button-add-matter button');
    const close = document.querySelector('.container-modals .modal-add-matter > span#close-modal');

    btn_newMatter.addEventListener('click' , ()=>{
        document.querySelector('.container div.container-modals.new-matter').style.display = "grid"
    })
    close.addEventListener('click' , ()=> closeModal());
}

//add all matters to page
async function addMattersToPage(){
    await createMatters();
}

//add a new matter in database
function addNewMatter(){
    var btnCreate = document.querySelector('.container-modals .modal-add-matter button');
    btnCreate.addEventListener('click', async ()=>{
        await addNewMatterInDataBase();
        closeModal();
        setTimeout(()=>{window.location.reload();},1000)
    })
}

//click in matter, redirect to matter page 
function redirectMatterPage(){
    const matters = document.querySelectorAll('main div.matters div.matter');
    matters.forEach(e => e.addEventListener('click' , (e)=>{
        const id = e.target.closest('div.matter').attributes.value.value
        const name = e.target.closest('div.matter').querySelector('h3').textContent
        const img = e.target.closest('div.matter').querySelector('img').src
        window.location.href = `/study-system/pages/matter.html?i=${img}&id=kjbhdskha15380lkdnfhagsd36hbchsdjksdh3439kn4&matterid=${id}&name=${name}`
    }))
}





