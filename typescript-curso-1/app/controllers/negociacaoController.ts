import { domInjector } from "../decorators/dom-injector.js";
import { loggarTempoDeExecucao } from "../decorators/loggar-tempo-de-execucao.js";
import { DiasDaSemana } from "../enums/diasDaSemana.js";
import { Negociacao } from "../models/negociacao.js";
import { Negociacoes } from "../models/negociacoes.js";
import { negociacoesService } from "../services/negociacoes-service.js";
import { MensagemView } from "../views/mensagem-view.js";
import { NegociacoesView } from "../views/negociacoes-view.js";

export class NegociacaoController {

    @domInjector('#data')
    private inputData: HTMLInputElement;
    @domInjector('#quantidade')
    private inputQuantidade: HTMLInputElement;
    @domInjector('#valor')
    private inputValor: HTMLInputElement;
    private negociacoes: Negociacoes = new Negociacoes();
    private negociacoesView = new NegociacoesView('#negociacoesView');
    private mensagensView = new MensagemView("#mensagemView");

    constructor() {
        this.negociacoesView.update(this.negociacoes);
    }

    @loggarTempoDeExecucao(true)
    public adiciona():void{
        const negociacao = Negociacao.CriaDe(this.inputData.value,this.inputQuantidade.value,this.inputValor.value);

        if(!this.isDiaUtil){
            this.mensagensView.update("Apenas negociações em dias úteis são aceitas");
            return
        }
        
        this.limparFormulario();
        this.negociacoes.adiciona(negociacao);
        console.log(this.negociacoes.lista())
        this.atualizaView();
    }

    public importaDados():void{
        
        const negociacoesHoje: Promise<Negociacao[]> = negociacoesService.obterNegociacoes();
        negociacoesHoje
        .then(negociacoesHoje=>{
            negociacoesHoje.forEach(negociacao => {
                this.negociacoes.adiciona(negociacao);
            });
        });

        this.negociacoesView.update(this.negociacoes)
    }

    private limparFormulario():void{
        this.inputData.value = '';
        this.inputQuantidade.value = '1';
        this.inputValor.value = '0.0';
        this.inputData.focus();
    }

    private atualizaView():void{
        this.negociacoesView.update(this.negociacoes);
        this.mensagensView.update("Negociação criada com sucesso!")
    }

    private isDiaUtil(data: Date){
        return data.getDay()>DiasDaSemana.DOMINGO && data.getDay()<DiasDaSemana.SABADO;
    }
}