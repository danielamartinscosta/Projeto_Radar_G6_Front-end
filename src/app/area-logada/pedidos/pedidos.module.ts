
import { DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';


import { ReactiveFormsModule } from '@angular/forms';

import ptBr from '@angular/common/locales/pt';
import { PedidosRoutingModule } from './pedidos-routing.module';
import { CadastrarPedidoComponent } from './cadastrar-pedido/cadastrar-pedido.component';

registerLocaleData(ptBr);

@NgModule({
  declarations: [CadastrarPedidoComponent],
  imports: [CommonModule, PedidosRoutingModule, ReactiveFormsModule],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt' },
    { provide: DEFAULT_CURRENCY_CODE, useValue: 'BRL' },
  ],
})
export class PedidosModule {}
