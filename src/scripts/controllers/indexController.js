import { getMatters } from "../Database/index.js";

//change page's color
export function changeColor(number){
    const body = document.querySelector('body')
    if(number == "2") body.classList.add('background-white')
    else if(number == "1")body.classList.remove('background-white')
}

//create a new matters
export async function createMatters(){
    const matters = document.querySelector('main div.matters');
    matters.innerHTML = ''
    const data = await getMatters()

    //function for agilize the process of creating element
    function create(element){
        return document.createElement(element)
    }

    //creating elements
    for(let matter of data.data){
        let div_matter = create("div");
        let div_img = create("div");
        let img = create("img");
        let h3 = create("h3");
        let div_status = create('div');
        let p = create("p");
        let span = create("span");
        let progress = create("progress");

        //atributtes
        div_matter.setAttribute("class" , "matter")
        div_matter.setAttribute("value" , matter._id)
        div_img.setAttribute("class" , "container-img")
        div_status.setAttribute("class" , "container-status")
        progress.setAttribute('max', "100");

        //values
        img.src = matter.image
        h3.textContent = matter.name
        p.textContent = "Perguntas: "
        span.textContent = matter.ask.length
        progress.value = matter.quality

        //add childrens
        div_img.appendChild(img);
        div_matter.appendChild(div_img);
        div_matter.appendChild(h3);
        p.appendChild(span);
        div_status.appendChild(p);
        div_status.appendChild(progress);
        div_matter.appendChild(div_status);
        matters.appendChild(div_matter);
    }
}