import { Component, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { MatIconModule } from "@angular/material/icon";
import { IProduto } from '../../models/IProduto';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-card-produto',
  imports: [
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    CurrencyPipe
],
  templateUrl: './card-produto.component.html',
  styleUrl: './card-produto.component.scss'
})
export class CardProdutoComponent {
  produto = input<IProduto>();
}
