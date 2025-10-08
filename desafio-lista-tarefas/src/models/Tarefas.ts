import { Tarefa } from "./Tarefa.js";

export class Tarefas {
    private tarefas: Tarefa[] = [];
    
    public listar(): ReadonlyArray<Tarefa>{
        const tarefasLocal = localStorage.getItem('tarefas');

        tarefasLocal ? this.tarefas=Tarefa.converterVarios(JSON.parse(tarefasLocal)) : [];
        return this.tarefas;
    }

    public adicionar(tarefa: Tarefa):void{
        this.tarefas.push(tarefa);
        localStorage.setItem('tarefas', JSON.stringify(this.tarefas));
    }

    public editarTarefa(id:number, conteudo:string):void{
        this.tarefas.forEach(tarefa=>{
            if(tarefa.getId==id){
                tarefa.editarConteudo(conteudo)
            }
        })
        localStorage.setItem('tarefas', JSON.stringify(this.tarefas));
    }

    public removerTarefa(id:number):void{
        this.tarefas=this.tarefas.filter(item=> item.getId != id)
        localStorage.setItem('tarefas', JSON.stringify(this.tarefas));
    }

    public finalizarTarefa(id:number):void{
        this.tarefas.forEach(tarefa=>{
            if(tarefa.getId==id){
                tarefa.finalizarTarefa()
            }
        })
        localStorage.setItem('tarefas', JSON.stringify(this.tarefas));
    }
}