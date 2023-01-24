
import { DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';


import { ReactiveFormsModule } from '@angular/forms';

import ptBr from '@angular/common/locales/pt';
import { PedidosProdutosRoutingModule } from './pedidosProdutos-routing.module';
import { CadastrarPedidoProdutoComponent } from './cadastrar-pedidoProduto/cadastrar-pedidoProduto.component';

registerLocaleData(ptBr);

@NgModule({
  declarations: [CadastrarPedidoProdutoComponent],
  imports: [CommonModule, PedidosProdutosRoutingModule, ReactiveFormsModule],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt' },
    { provide: DEFAULT_CURRENCY_CODE, useValue: 'BRL' },
  ],
})
export class PedidosProdutosModule {}
