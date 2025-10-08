export function domInjector(selector:string){
    return function(target:any, propertyKey:string){ 

        let elemento:HTMLElement;

        const getter = function(){
            if(!elemento){
                elemento = document.querySelector(selector) as HTMLElement;
            }
            return elemento;
        }

        Object.defineProperty(target,
            propertyKey,
            { get:getter }
        );
    }
}