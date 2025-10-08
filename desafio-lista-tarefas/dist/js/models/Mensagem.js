export class Mensagem {
    constructor(status, mensagem) {
        this.status = status;
        this.mensagem = mensagem;
    }
    get getStatus() {
        return this.status;
    }
    get getMensagem() {
        return this.mensagem;
    }
}
