import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IProduto } from '../../models/IProduto';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {
  private readonly API_URL = "http://localhost:3000/produtos";

    constructor(private http:HttpClient){}

    buscarProdutos(){
      return this.http.get<IProduto[]>(`${this.API_URL}`)
    }

    cadastrarProduto(produto: IProduto){
      return this.http.post<any>(`${this.API_URL}`, produto)
    }

    buscarProdutosPorId(id:string){
      return this.http.get<IProduto>(`${this.API_URL}/${id}`)
    }

    excluirProduto(id:string){
      return this.http.delete<void>(`${this.API_URL}/${id}`)
    }

    editarProduto(id:string,produto: IProduto){
      return this.http.put<IProduto>(`${this.API_URL}/${id}`, produto)
    }
}
