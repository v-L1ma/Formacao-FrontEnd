import { status } from "../enums/status.js";
import { View } from "./View.js";
export class MensagemView extends View {
    template(model) {
        return `<div class="${model.getStatus == status.SUCESSO ? 'sucesso' : 'erro'}">${model.getMensagem}</div>`;
    }
}
