import { icones } from "../enums/icones.js";
import { status } from "../enums/status.js";
import { Mensagem } from "../models/Mensagem.js";
import { Tarefa } from "../models/Tarefa.js";
import { Tarefas } from "../models/Tarefas.js";
import { MensagemView } from "../views/MensagemView.js";
import { TarefasView } from "../views/TarefasView.js";

export class TarefasController {
    private tarefas = new Tarefas();
    private tarefasView = new TarefasView('#tarefasView');
    private mensagemView = new MensagemView('#mensagemView');
    private inputConteudo: HTMLInputElement = document.querySelector('#conteudoinput') as HTMLInputElement
    private excluirBtn:HTMLButtonElement = document.querySelector('#excluir') as HTMLButtonElement
    private editarBtn:HTMLButtonElement= document.querySelector('#editar') as HTMLButtonElement

    constructor() {
        this.tarefasView.update(this.tarefas);
        if(localStorage.getItem('tarefas')!=null){
            this.adicionarEventoBotoes()
        }
    }

    public adiciona(){
        
        if(this.inputConteudo.value.trim()==''){
            this.mensagemView.update(new Mensagem(status.ERRO, "A tarefa nao pode ser vazia"))
            return;
        }

        const tarefaexiste = this.tarefas.listar().some((item)=>item.getConteudo.toLocaleUpperCase()==this.inputConteudo.value.toLocaleUpperCase()
       )

        if(tarefaexiste){
            this.mensagemView.update(new Mensagem(status.ERRO, "Essa tarefa ja existe"))
            return;
        }

        this.tarefas.adicionar(new Tarefa(this.inputConteudo.value))
        this.mensagemView.update(new Mensagem(status.SUCESSO, "Tarefa criada com sucesso!"))
        this.atualiza()
    }

    public atualiza(){
        this.tarefasView.update(this.tarefas)
        this.adicionarEventoBotoes()
    }

    private adicionarEventoBotoes(){
        let input = document.createElement("input")
        input.setAttribute("type", "text")
        input.setAttribute("class", "inputEditar")

        const botoes = document.querySelectorAll('[data-botao]');

        const checkboxes = document.querySelectorAll('input[type="checkbox"]');

        checkboxes.forEach((element: any) => {
            element.addEventListener("change",()=>{
                const idTarefa = element.dataset.check;
                this.tarefas.finalizarTarefa(idTarefa);
                this.atualiza()
            })
        })

        botoes.forEach((element: HTMLButtonElement) => {
            element.addEventListener('click',()=>{
                const card:HTMLElement = element.parentNode?.parentNode as HTMLElement;
                // console.log(card?.querySelector('p'))
                const idTarefa:number = Number(element.dataset.botao);
                // console.log( element.getAttribute("id"))
                const tipoBotao= element.getAttribute("id");
                console.log(card)


                switch (tipoBotao) {
                    case 'editar':
                        const botaoExcluir = document.querySelector(`#excluir[data-botao="${idTarefa}"]`)!;
                        // const botaoExcluir = document.querySelector("#excluir")!;
                        const botaoEditar = element;

                        const conteudo = card?.querySelector('p')?.getHTML();

                        input.value = conteudo!;
                        card.querySelector('p')!.innerHTML='';
                        card.querySelector('p')!.append(input);
                        
                        botaoEditar.innerHTML=icones.SALVAR;
                        botaoEditar.setAttribute("id", "salvar");

                        botaoExcluir.innerHTML=icones.CANCELAR;
                        botaoExcluir.setAttribute("id", "cancelar");

                        document.querySelector("#cancelar")?.addEventListener("click",()=>{
                            botaoEditar.setAttribute("id", "editar");
                            card.querySelector('p')!.innerHTML=conteudo!;
                            botaoExcluir.setAttribute("id", "excluir");

                            botaoEditar.innerHTML = icones.EDITAR;
                            botaoExcluir.innerHTML = icones.EXCLUIR;
                            this.atualiza()
                        })

                        document.querySelector("#salvar")?.addEventListener("click",()=>{
                            card.querySelector('p')!.innerHTML= input.value
                            botaoEditar.setAttribute("id", "editar")
                            botaoExcluir.setAttribute("id", "excluir")

                            botaoEditar.innerHTML = icones.EDITAR;
                            botaoExcluir.innerHTML = icones.EXCLUIR;
                            this.tarefas.editarTarefa(idTarefa,input.value)
                            this.mensagemView.update(new Mensagem(status.SUCESSO, "Tarefa atualizada com sucesso"))
                            this.atualiza()
                        })
                        break;
                    case 'excluir':
                        this.tarefas.removerTarefa(idTarefa)
                        this.mensagemView.update(new Mensagem(status.SUCESSO, "Tarefa excluida com sucesso"))
                        this.atualiza()
                        break;
                    default:
                        break;
                }
            })
        });


    }

}
