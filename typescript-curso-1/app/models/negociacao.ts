export class Negociacao{
    private _data: Date;
    private _quantidade: number;
    private _valor: number;

    constructor(data: Date,quantidade: number,valor: number){
        this._data=data;
        this._quantidade=quantidade;
        this._valor=valor;
    }

    public static CriaDe(dataString: string,quantidadeString: string,valorString: string){
            return new Negociacao(
            new Date(dataString),
            Number.parseInt(quantidadeString), 
            Number.parseInt(valorString)
        );
    }

    get data(): Date{
        return this._data
    }

    get quantidade(): number{
        return this._quantidade
    }
    get valor(): number{
        return this._valor
    }
}