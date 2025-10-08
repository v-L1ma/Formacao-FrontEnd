var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { domInjector } from "../decorators/dom-injector.js";
import { loggarTempoDeExecucao } from "../decorators/loggar-tempo-de-execucao.js";
import { DiasDaSemana } from "../enums/diasDaSemana.js";
import { Negociacao } from "../models/negociacao.js";
import { Negociacoes } from "../models/negociacoes.js";
import { negociacoesService } from "../services/negociacoes-service.js";
import { MensagemView } from "../views/mensagem-view.js";
import { NegociacoesView } from "../views/negociacoes-view.js";
export class NegociacaoController {
    constructor() {
        this.negociacoes = new Negociacoes();
        this.negociacoesView = new NegociacoesView('#negociacoesView');
        this.mensagensView = new MensagemView("#mensagemView");
        this.negociacoesView.update(this.negociacoes);
    }
    adiciona() {
        const negociacao = Negociacao.CriaDe(this.inputData.value, this.inputQuantidade.value, this.inputValor.value);
        if (!this.isDiaUtil) {
            this.mensagensView.update("Apenas negociações em dias úteis são aceitas");
            return;
        }
        this.limparFormulario();
        this.negociacoes.adiciona(negociacao);
        console.log(this.negociacoes.lista());
        this.atualizaView();
    }
    importaDados() {
        const negociacoesHoje = negociacoesService.obterNegociacoes();
        negociacoesHoje
            .then(negociacoesHoje => {
            negociacoesHoje.forEach(negociacao => {
                this.negociacoes.adiciona(negociacao);
            });
        });
        this.negociacoesView.update(this.negociacoes);
    }
    limparFormulario() {
        this.inputData.value = '';
        this.inputQuantidade.value = '1';
        this.inputValor.value = '0.0';
        this.inputData.focus();
    }
    atualizaView() {
        this.negociacoesView.update(this.negociacoes);
        this.mensagensView.update("Negociação criada com sucesso!");
    }
    isDiaUtil(data) {
        return data.getDay() > DiasDaSemana.DOMINGO && data.getDay() < DiasDaSemana.SABADO;
    }
}
__decorate([
    domInjector('#data')
], NegociacaoController.prototype, "inputData", void 0);
__decorate([
    domInjector('#quantidade')
], NegociacaoController.prototype, "inputQuantidade", void 0);
__decorate([
    domInjector('#valor')
], NegociacaoController.prototype, "inputValor", void 0);
__decorate([
    loggarTempoDeExecucao(true)
], NegociacaoController.prototype, "adiciona", null);
