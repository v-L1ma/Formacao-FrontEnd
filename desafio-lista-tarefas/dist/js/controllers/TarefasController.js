import { icones } from "../enums/icones.js";
import { status } from "../enums/status.js";
import { Mensagem } from "../models/Mensagem.js";
import { Tarefa } from "../models/Tarefa.js";
import { Tarefas } from "../models/Tarefas.js";
import { MensagemView } from "../views/MensagemView.js";
import { TarefasView } from "../views/TarefasView.js";
export class TarefasController {
    constructor() {
        this.tarefas = new Tarefas();
        this.tarefasView = new TarefasView('#tarefasView');
        this.mensagemView = new MensagemView('#mensagemView');
        this.inputConteudo = document.querySelector('#conteudoinput');
        this.excluirBtn = document.querySelector('#excluir');
        this.editarBtn = document.querySelector('#editar');
        this.tarefasView.update(this.tarefas);
        if (localStorage.getItem('tarefas') != null) {
            this.adicionarEventoBotoes();
        }
    }
    adiciona() {
        if (this.inputConteudo.value.trim() == '') {
            this.mensagemView.update(new Mensagem(status.ERRO, "A tarefa nao pode ser vazia"));
            return;
        }
        const tarefaexiste = this.tarefas.listar().some((item) => item.getConteudo.toLocaleUpperCase() == this.inputConteudo.value.toLocaleUpperCase());
        if (tarefaexiste) {
            this.mensagemView.update(new Mensagem(status.ERRO, "Essa tarefa ja existe"));
            return;
        }
        this.tarefas.adicionar(new Tarefa(this.inputConteudo.value));
        this.mensagemView.update(new Mensagem(status.SUCESSO, "Tarefa criada com sucesso!"));
        this.atualiza();
    }
    atualiza() {
        this.tarefasView.update(this.tarefas);
        this.adicionarEventoBotoes();
    }
    adicionarEventoBotoes() {
        let input = document.createElement("input");
        input.setAttribute("type", "text");
        input.setAttribute("class", "inputEditar");
        const botoes = document.querySelectorAll('[data-botao]');
        const checkboxes = document.querySelectorAll('input[type="checkbox"]');
        checkboxes.forEach((element) => {
            element.addEventListener("change", () => {
                const idTarefa = element.dataset.check;
                this.tarefas.finalizarTarefa(idTarefa);
                this.atualiza();
            });
        });
        botoes.forEach((element) => {
            element.addEventListener('click', () => {
                var _a, _b, _c, _d;
                const card = (_a = element.parentNode) === null || _a === void 0 ? void 0 : _a.parentNode;
                const idTarefa = Number(element.dataset.botao);
                const tipoBotao = element.getAttribute("id");
                console.log(card);
                switch (tipoBotao) {
                    case 'editar':
                        const botaoExcluir = document.querySelector(`#excluir[data-botao="${idTarefa}"]`);
                        const botaoEditar = element;
                        const conteudo = (_b = card === null || card === void 0 ? void 0 : card.querySelector('p')) === null || _b === void 0 ? void 0 : _b.getHTML();
                        input.value = conteudo;
                        card.querySelector('p').innerHTML = '';
                        card.querySelector('p').append(input);
                        botaoEditar.innerHTML = icones.SALVAR;
                        botaoEditar.setAttribute("id", "salvar");
                        botaoExcluir.innerHTML = icones.CANCELAR;
                        botaoExcluir.setAttribute("id", "cancelar");
                        (_c = document.querySelector("#cancelar")) === null || _c === void 0 ? void 0 : _c.addEventListener("click", () => {
                            botaoEditar.setAttribute("id", "editar");
                            card.querySelector('p').innerHTML = conteudo;
                            botaoExcluir.setAttribute("id", "excluir");
                            botaoEditar.innerHTML = icones.EDITAR;
                            botaoExcluir.innerHTML = icones.EXCLUIR;
                            this.atualiza();
                        });
                        (_d = document.querySelector("#salvar")) === null || _d === void 0 ? void 0 : _d.addEventListener("click", () => {
                            card.querySelector('p').innerHTML = input.value;
                            botaoEditar.setAttribute("id", "editar");
                            botaoExcluir.setAttribute("id", "excluir");
                            botaoEditar.innerHTML = icones.EDITAR;
                            botaoExcluir.innerHTML = icones.EXCLUIR;
                            this.tarefas.editarTarefa(idTarefa, input.value);
                            this.mensagemView.update(new Mensagem(status.SUCESSO, "Tarefa atualizada com sucesso"));
                            this.atualiza();
                        });
                        break;
                    case 'excluir':
                        this.tarefas.removerTarefa(idTarefa);
                        this.mensagemView.update(new Mensagem(status.SUCESSO, "Tarefa excluida com sucesso"));
                        this.atualiza();
                        break;
                    default:
                        break;
                }
            });
        });
    }
}
