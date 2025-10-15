import { MatButton } from "@angular/material/button";
import { MatIcon } from "@angular/material/icon";
import { TabelaProdutos } from "../../components/tabela-produtos/tabela-produtos.component";
import { ModalComponent } from "../../components/modal/modal.component";
import {Component, inject, model, OnInit, signal} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {
  MatDialog,
} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { ProdutoService } from "../../services/produto/produto.service";
import { IProduto } from "../../models/IProduto";

@Component({
  selector: 'app-gerenciar-produtos',
  imports: [
    MatButton, 
    MatIcon, 
    TabelaProdutos, 
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './gerenciar-produtos.component.html',
  styleUrl: './gerenciar-produtos.component.scss'
})
export class GerenciarProdutos implements OnInit{
  readonly tituloModal = model('Cadastrar produto');
  readonly dialog = inject(MatDialog);
  produtos = signal<IProduto[]>([]);

  constructor(private produtosService: ProdutoService){}

  ngOnInit(): void {
    this.buscarProdutos()
  }

  buscarProdutos(){
    this.produtosService.buscarProdutos().subscribe((produtos)=>{
      console.log(produtos)
      this.produtos.set(produtos)
    }
    );
  }

  adicionarProdutoNaLista(produtoCriado:IProduto){
    // console.log("PRODUTO CRIADO")
    this.produtos.update(produtos=>{
      return [...produtos, produtoCriado]
    })
  }
  
  excluirProduto(id:string){
    this.produtosService.excluirProduto(id).subscribe();
    this.removerProdutoDaLista(id);
  }

  removerProdutoDaLista(id:string){
    this.produtos.set(this.produtos().filter(produto=>produto.id!=id))
  }

  editarProduto(produto: IProduto){
    // console.log(produto)
    this.produtosService.editarProduto(produto.id, produto).subscribe(()=>{
      this.produtos.update((produtos)=>{
      return produtos.map((p)=>{
          if(p.id===produto.id){
            return produto;
          }
          return p;
        })
      })
    });
    
  }

  openCreateProductDialog(): void {
    const dialogRef = this.dialog.open(ModalComponent, {
      data: {tituloModal: this.tituloModal()},
    });

    dialogRef.afterClosed().subscribe((result:IProduto) => {
      console.log('The dialog was closed');
      if (result !== undefined) {
         console.log(result);
        // console.log(result.nome);
        this.produtosService.cadastrarProduto(result).subscribe(()=>{
          this.buscarProdutos()
        });
        
      }
    });
  }
}
