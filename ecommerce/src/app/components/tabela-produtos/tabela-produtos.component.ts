import { Component, inject, input, model, OnInit, output, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {MatPaginatorModule, PageEvent} from '@angular/material/paginator';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { ProdutoService } from '../../services/produto/produto.service';
import { IProduto } from '../../models/IProduto';
import { CurrencyPipe } from '@angular/common';
import { ModalEditarComponent } from '../modal-editar/modal-editar.component';
import { MatDialog } from '@angular/material/dialog';
import { MatIcon } from "@angular/material/icon";
import {MatInputModule} from '@angular/material/input';

@Component({
  selector: 'app-tabela-produtos',
  imports: [
    MatButtonModule,
    MatIconModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    CurrencyPipe,
    MatIcon, 
    MatInputModule,
    MatButtonModule
],
  templateUrl: './tabela-produtos.component.html',
  styleUrl: './tabela-produtos.component.scss'
})
export class TabelaProdutos implements OnInit{
  paginaAtual= signal<PageEvent>({
    length:100,
    pageIndex:0,
    pageSize:10
  });

  readonly tituloModal = model('Editar produto');
  readonly dialog = inject(MatDialog);
  produtos = input.required<IProduto[]>();
  excluirProduto = output<string>();
  editarProduto = output<IProduto>();

  constructor(private produtosService:ProdutoService){}

  mudarPagina(event:PageEvent){
    console.log(event);
    this.paginaAtual.set(event);
  }

  ngOnInit(): void {
  }

  openEditProductDialog(item: IProduto): void {
    const dialogRef = this.dialog.open(ModalEditarComponent, {
      data: {tituloModal: this.tituloModal(), produto: item},
    });

    dialogRef.afterClosed().subscribe((result:IProduto) => {
      console.log('The dialog was closed');
      if (
        result.nome !== item.nome ||
        result.categoria !== item.categoria ||
        result.descricao !== item.descricao ||
        result.imagem !== item.imagem ||
        result.preco !== item.preco
      ) {
        this.editarProduto.emit({
          id: item.id,
          nome: result.nome,
          categoria: result.categoria,
          descricao: result.descricao,
          imagem: result.imagem,
          preco: result.preco,
        })
      }
    });
  }
}
