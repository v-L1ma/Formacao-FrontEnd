import { escape } from "../decorators/escape.js";
import { loggarTempoDeExecucao } from "../decorators/loggar-tempo-de-execucao.js";

export abstract class View<T>{
    
    protected elemento:HTMLElement;

    constructor(selector:string){
        const elemento = document.querySelector(selector);
        if(elemento){
            this.elemento= document.querySelector(selector) as HTMLElement;
        }else{
            throw new Error(`Seletor ${selector} não existe no DOM. Verifique`);
        }
    }

    protected abstract template(model:T):string;

    // @loggarTempoDeExecucao()
    public update(model: T):void{
        this.elemento.innerHTML=this.template(model);
   }
}