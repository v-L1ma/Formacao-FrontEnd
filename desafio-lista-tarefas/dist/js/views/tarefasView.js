import { icones } from "../enums/icones.js";
import { View } from "../views/View.js";
export class TarefasView extends View {
    template(model) {
        const div = document.createElement("div");
        const tarefasPendentes = document.querySelector("#pendentes");
        const tarefasTotais = document.querySelector("#total");
        if (tarefasPendentes || tarefasTotais) {
            tarefasPendentes.innerHTML = `${model.listar().filter(tarefa => tarefa.getFinalizada == false).length} tarefas pendentes`;
            tarefasTotais.innerHTML = `${model.listar().length} tarefas no total`;
        }
        else {
            throw new Error(`Tarefas pendentes ou totais não existem no DOM. Verifique`);
        }
        return `
            <div id="gallery">
                ${model.listar().map(tarefa => `<div data-card="${tarefa.getId}" class="${tarefa.getFinalizada ? 'cardPerguntaFinalizada' : 'cardPergunta'}">
                        <div class="conteudoDiv">
                             <label class="custom-checkbox">
                                <input id="finalizada" data-check="${tarefa.getId}" type="checkbox" ${tarefa.getFinalizada ? "checked=''" : ''}>
                                <div class="checkmark"></div>
                            </label>
                            <p data-p="${tarefa.getId}">${tarefa.getConteudo}</p>
                        </div>
                        <div class="botoes">
                            <button disable="true" data-botao="${tarefa.getId}" type="button" id="editar">${icones.EDITAR}</button>
                            <button data-botao="${tarefa.getId}" type="button" id="excluir">${icones.EXCLUIR}</button>
                        </div>
                    </div>`).join('')}
            </div> `;
    }
}
