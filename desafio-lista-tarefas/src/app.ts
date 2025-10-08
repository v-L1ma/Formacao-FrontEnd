import { TarefasController } from "./controllers/TarefasController.js"

const tarefasController = new TarefasController();

const form = document.querySelector('.form')
const excluirBtn = document.querySelector('#excluir') as HTMLButtonElement
const editarBtn = document.querySelector('#editar') as HTMLButtonElement

if(form){
    form.addEventListener('submit', event=>{
        event.preventDefault();
        tarefasController.adiciona();
    })
}else{
    throw new Error("Aplicação não iniciada. Verifique se o form existe!");
}

