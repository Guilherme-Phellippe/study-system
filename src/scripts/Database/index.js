const base_url = "https://study-system.herokuapp.com"
const url_matters = base_url+"/matter"
const url_createAsk = base_url+"/ask/add-ask/"
const url_deleteAsk = base_url+"/ask/delete/"


//matters
export async function getMatters(){
    const res = axios.get(url_matters).catch((err) => console.error(err))
    return res;
}
export async function addMatter(matter){
    axios.post(url_matters, matter).then(res =>{
        console.log(res.data)
    }).catch((err) => console.log(err))
}
//search one matter
export async function getMatter(id){
    const res = axios.get(url_matters+"/"+id).catch((err) => console.error(err))
    return res;
}

//update one matter
export async function updateMatter(id, matter){
    const res = axios.patch(url_matters+"/"+id, matter ).catch((err) => console.error(err));
    return res
}

//delete onde matter
export async function deleteMatter(id){
    const res = axios.delete(url_matters+"/"+id).catch(err => console.error(err))
    return res
}
//asks
//create one ask
export async function createAsk(id, ask){
    const res = await axios.patch(url_createAsk+id, ask).catch(err => console.error(err));
    return res
}

//delete one ask
export async function deleteAsk(id, index){
    const res = await axios.patch(url_deleteAsk+id, index).catch(err => console.error(err));
    return res
}