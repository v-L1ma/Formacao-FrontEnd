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
  produto: IProduto;
}

@Component({
  selector: 'app-editar-modal',
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
  templateUrl: './modal-editar.component.html',
  styleUrl: './modal-editar.component.scss'
})
export class ModalEditarComponent implements OnInit{
  readonly dialogRef = inject(MatDialogRef<ModalEditarComponent>);
  readonly data = inject<DialogData>(MAT_DIALOG_DATA);
  produtoForm!:FormGroup;

  constructor(private fb :FormBuilder){}

  ngOnInit(): void {
    this.produtoForm = this.fb.group({
      nome: [this.data.produto.nome, [Validators.required, Validators.maxLength(30)]],
      preco: [this.data.produto.preco, [Validators.required, Validators.min(0.01)]],
      categoria : [this.data.produto.categoria, [Validators.required, Validators.maxLength(30)]],
      descricao: [this.data.produto.descricao, [Validators.required, Validators.maxLength(70)]],
      imagem: [this.data.produto.imagem],
    })
  }

  onNoClick(): void {
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
