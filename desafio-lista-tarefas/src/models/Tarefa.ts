export class Tarefa {

    public id:number;
    public conteudo:string;
    public finalizada:boolean;

    constructor(conteudo:string) {
        this.id = Date.now();
        this.conteudo = conteudo;
        this.finalizada = false;
    }

    public static converterVarios(listaTarefas:any[]):Tarefa[]{
        let tarefas:Tarefa[] = []
        listaTarefas.forEach((element:any) => {
            const novaTarefa:Tarefa = new Tarefa(element.conteudo)
            novaTarefa.id = element.id;
            novaTarefa.conteudo = element.conteudo;
            novaTarefa.finalizada = element.finalizada;
            
            tarefas.push(novaTarefa)
        })
        return tarefas;
    }

    public editarConteudo(conteudo:string):void{
        this.conteudo=conteudo;
    }

    public finalizarTarefa(){
        this.finalizada = !this.finalizada
    }

    get getConteudo(){
        return this.conteudo;
    }
    get getFinalizada(){
        return this.finalizada;
    }
    get getId(){
        return this.id;
    }
}