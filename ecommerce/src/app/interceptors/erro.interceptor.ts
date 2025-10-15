import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { MensagemDeErroService } from '../services/mensagemDeErro/mensagem-de-erro.service';

export const erroInterceptor: HttpInterceptorFn = (req, next) => {
  const mensagemService = inject(MensagemDeErroService);
  
  return next(req).pipe(
    catchError((erro:HttpErrorResponse)=>{
      const mensagemErro = obeterMensagemErro(erro.status);
      mensagemService.mostrarMensagemDeErro(mensagemErro);
      return throwError(()=>erro);
    })
  )
};

function obeterMensagemErro(status:number):string{
  const messagensDeErro: Record<number,string> = {
    0: "Erro de conexão. Verifique sua internet.",
    404: "O recurso solicitado não foi encontrado.",
    500: "Erro interno do servidor."
  };

  return messagensDeErro[status] || "Ocorreu um erro inesperado.";
}
