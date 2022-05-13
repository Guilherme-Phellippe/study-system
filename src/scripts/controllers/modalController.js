import { addMatter } from "../Database/index.js";

//close modals
export function closeModal() {
    document.querySelector(".container div.container-modals").style.display = 'none'
}

// add new matter
export async function addNewMatterInDataBase() {
    var form = document.querySelector('.container-modals .modal-add-matter form');
    var url_image = '';
    if (form.querySelector('input[type=file]').value != '') {
        url_image = form.querySelector('input[type=file]').value
    } else {
        url_image = form.querySelector('input#url-image').value
    }


    const data = {
        name: form.querySelector('input#name').value,
        image: url_image
    }
    await addMatter(data);
    form.querySelector('input#name').value = '',
    url_image = form.querySelector('input#url-image').value = ''
}