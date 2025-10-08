export abstract class View<T> {

    protected elemento: HTMLElement;

    constructor(seletor:string) {
        const elemento = document.querySelector(seletor);
        if(elemento){
            this.elemento = elemento as HTMLElement;
        } else{
            throw new Error(`Seletor ${seletor} não existe no DOM. Verifique`);
        }
    }

    protected abstract template(model:T):string;

    public update(model:T):void{
        this.elemento.innerHTML = this.template(model);
    }
}