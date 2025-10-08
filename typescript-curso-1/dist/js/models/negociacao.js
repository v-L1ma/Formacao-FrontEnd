export class Negociacao {
    constructor(data, quantidade, valor) {
        this._data = data;
        this._quantidade = quantidade;
        this._valor = valor;
    }
    static CriaDe(dataString, quantidadeString, valorString) {
        return new Negociacao(new Date(dataString), Number.parseInt(quantidadeString), Number.parseInt(valorString));
    }
    get data() {
        return this._data;
    }
    get quantidade() {
        return this._quantidade;
    }
    get valor() {
        return this._valor;
    }
}
