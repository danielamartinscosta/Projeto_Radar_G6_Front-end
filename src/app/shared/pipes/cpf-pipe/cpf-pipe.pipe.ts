import { Pipe, PipeTransform } from '@angular/core';
@Pipe({ name: 'cpf' })
export class CpfPipe implements PipeTransform {
  transform(cpf: any): String {
    let formatarCpf = cpf.toString();
    return formatarCpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  }
}
