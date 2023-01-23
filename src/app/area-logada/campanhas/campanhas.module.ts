import { DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { CampanhasRoutingModule } from './campanhas-routing.module';

import ptBr from '@angular/common/locales/pt';
import { ReactiveFormsModule } from '@angular/forms';
import { CadastrarCampanhaComponent } from './cadastrar-campanha/cadastrar-campanha.component';

registerLocaleData(ptBr);

@NgModule({
  declarations: [CadastrarCampanhaComponent],
  imports: [CommonModule, CampanhasRoutingModule, ReactiveFormsModule],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt' },
    { provide: DEFAULT_CURRENCY_CODE, useValue: 'BRL' },
  ],
})
export class CampanhasModule {}




