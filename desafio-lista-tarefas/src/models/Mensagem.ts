import { status } from "../enums/status.js";

export class Mensagem {
    private status:status;
    private mensagem:string;

    constructor(status:status, mensagem:string) {
        this.status = status;
        this.mensagem = mensagem;
    }

    get getStatus() : status {
        return this.status
    }
    get getMensagem() : string {
        return this.mensagem
    }
    
}