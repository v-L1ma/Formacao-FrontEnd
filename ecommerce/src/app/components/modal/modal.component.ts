import {MatDialogModule} from '@angular/material/dialog';
import {Component, inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule,  } from '@angular/material/input';
import { IProduto } from '../../models/IProduto';

export interface DialogData {
  tituloModal: string;
  descricaoModal:string;
  produto: IProduto | null
}
@Component({
  selector: 'app-modal',
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule
],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent implements OnInit{
  readonly dialogRef = inject(MatDialogRef<ModalComponent>);
  readonly data = inject<DialogData>(MAT_DIALOG_DATA);
  produtoForm!:FormGroup;
  private fb= inject(FormBuilder)

  ngOnInit(): void {
    if(this.data.produto){
      this.produtoForm = this.fb.group({
        nome: [this.data.produto.nome, [Validators.required, Validators.maxLength(30)]],
        preco: [this.data.produto.preco, [Validators.required, Validators.min(0.01)]],
        categoria : [this.data.produto.categoria, [Validators.required, Validators.maxLength(30)]],
        descricao: [this.data.produto.descricao, [Validators.required, Validators.maxLength(70)]],
        imagem: [this.data.produto.imagem],
      });
      return;
    }
    
    this.produtoForm = this.fb.group({
      nome: ['', [Validators.required, Validators.maxLength(30)]],
      preco: [0, [Validators.required, Validators.min(0.01)]],
      categoria : ['', [Validators.required, Validators.maxLength(30)]],
      descricao: ['', [Validators.required, Validators.maxLength(70)]],
      imagem: [null],
    })
  }

  onNoClick(): void {
    this.limparFormulario();
    this.dialogRef.close();
  }

  limparFormulario(){
    this.produtoForm.get("nome")?.setValue('');
    this.produtoForm.get("preco")?.setValue(0);
    this.produtoForm.get("categoria")?.setValue('');
    this.produtoForm.get("descricao")?.setValue('');
    this.produtoForm.get("imagem")?.setValue('');
  }

}
