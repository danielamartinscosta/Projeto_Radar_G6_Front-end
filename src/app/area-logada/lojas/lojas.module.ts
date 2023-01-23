import { DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from '@angular/core';
import { LojasRoutingModule } from './lojas-routing.module';
import { CadastrarLojaComponent } from './cadastrar-loja/cadastrar-loja.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule, registerLocaleData } from '@angular/common';

import ptBr from '@angular/common/locales/pt';

registerLocaleData(ptBr);

@NgModule({
  declarations: [CadastrarLojaComponent],
  imports: [CommonModule, LojasRoutingModule, ReactiveFormsModule],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt' },
    { provide: DEFAULT_CURRENCY_CODE, useValue: 'BRL' },
  ],
})
export class LojasModule {}


