import { Component, OnInit, signal } from '@angular/core';
import { CardProdutoComponent } from "../../components/card-produto/card-produto.component";
import { ProdutoService } from '../../services/produto/produto.service';
import { IProduto } from '../../models/IProduto';
import { MatProgressSpinner } from "@angular/material/progress-spinner";

@Component({
  selector: 'app-listar-produtos',
  imports: [CardProdutoComponent, MatProgressSpinner],
  templateUrl: './listar-produtos.component.html',
  styleUrl: './listar-produtos.component.scss'
})
export class ListarProdutos implements OnInit{

  produtos = signal<IProduto[]>([]);
  isLoading = signal<boolean>(true);

  constructor(private produtosService:ProdutoService){}

  ngOnInit(): void {
    this.buscarProdutos()
  }

  buscarProdutos(){
  this.isLoading.set(true);
  this.produtosService.buscarProdutos().subscribe((produtos)=>{
    console.log(produtos);
    this.produtos.set(produtos)
  }
  );
  this.isLoading.set(false);
  }
}
