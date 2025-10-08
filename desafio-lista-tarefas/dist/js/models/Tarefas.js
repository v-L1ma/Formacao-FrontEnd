import { Tarefa } from "./Tarefa.js";
export class Tarefas {
    constructor() {
        this.tarefas = [];
    }
    listar() {
        const tarefasLocal = localStorage.getItem('tarefas');
        tarefasLocal ? this.tarefas = Tarefa.converterVarios(JSON.parse(tarefasLocal)) : [];
        return this.tarefas;
    }
    adicionar(tarefa) {
        this.tarefas.push(tarefa);
        localStorage.setItem('tarefas', JSON.stringify(this.tarefas));
    }
    editarTarefa(id, conteudo) {
        this.tarefas.forEach(tarefa => {
            if (tarefa.getId == id) {
                tarefa.editarConteudo(conteudo);
            }
        });
        localStorage.setItem('tarefas', JSON.stringify(this.tarefas));
    }
    removerTarefa(id) {
        this.tarefas = this.tarefas.filter(item => item.getId != id);
        localStorage.setItem('tarefas', JSON.stringify(this.tarefas));
    }
    finalizarTarefa(id) {
        this.tarefas.forEach(tarefa => {
            if (tarefa.getId == id) {
                tarefa.finalizarTarefa();
            }
        });
        localStorage.setItem('tarefas', JSON.stringify(this.tarefas));
    }
}
