import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhonePipe } from './pipes/phone-pipe/phone.pipe';
import { CpfPipe } from './pipes/cpf-pipe/cpf-pipe.pipe';
import { CepPipe } from './pipes/cep/cep.pipe';

@NgModule({
  declarations: [PhonePipe, CpfPipe, CepPipe],
  imports: [CommonModule],
  exports: [PhonePipe, CpfPipe, CepPipe],
})
export class SharedModule {}
