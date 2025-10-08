export class View {
    constructor(selector) {
        const elemento = document.querySelector(selector);
        if (elemento) {
            this.elemento = document.querySelector(selector);
        }
        else {
            throw new Error(`Seletor ${selector} não existe no DOM. Verifique`);
        }
    }
    update(model) {
        this.elemento.innerHTML = this.template(model);
    }
}
