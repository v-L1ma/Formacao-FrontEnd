import { NegociacoesDoDia } from "../interfaces/negociacoesDoDia.js";
import { Negociacao } from "../models/negociacao.js";

export class negociacoesService{
    public static obterNegociacoes():Promise<Negociacao[]>{
        return fetch('http://localhost:8080/dados')
        .then(res=> res.json())
        .then((dados: NegociacoesDoDia[])=>{
            return dados.map(dado=>{
                return new Negociacao(
                    new Date(), 
                    dado.vezes, 
                    dado.montante)
            })
        })
    }
}