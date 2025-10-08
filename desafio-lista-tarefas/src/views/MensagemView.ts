import { status } from "../enums/status.js";
import { Mensagem } from "../models/Mensagem.js";
import { View } from "./View.js";

export class MensagemView extends View<Mensagem> {
    protected template(model: Mensagem): string {
        return `<div class="${model.getStatus == status.SUCESSO ?'sucesso' : 'erro'}">${model.getMensagem}</div>`
    }
}