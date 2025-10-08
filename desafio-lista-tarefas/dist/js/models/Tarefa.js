export class Tarefa {
    constructor(conteudo) {
        this.id = Date.now();
        this.conteudo = conteudo;
        this.finalizada = false;
    }
    static converterVarios(listaTarefas) {
        let tarefas = [];
        listaTarefas.forEach((element) => {
            const novaTarefa = new Tarefa(element.conteudo);
            novaTarefa.id = element.id;
            novaTarefa.conteudo = element.conteudo;
            novaTarefa.finalizada = element.finalizada;
            tarefas.push(novaTarefa);
        });
        return tarefas;
    }
    editarConteudo(conteudo) {
        this.conteudo = conteudo;
    }
    finalizarTarefa() {
        this.finalizada = !this.finalizada;
    }
    get getConteudo() {
        return this.conteudo;
    }
    get getFinalizada() {
        return this.finalizada;
    }
    get getId() {
        return this.id;
    }
}
