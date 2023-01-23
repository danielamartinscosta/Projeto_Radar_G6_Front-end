import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { delay, finalize, take } from 'rxjs';

@Component({
  selector: 'app-pedido',
  templateUrl: './cadastrar-pedido.component.html',
  styleUrls: ['./cadastrar-pedido.component.css']
})
export class CadastrarPedidoComponent implements OnInit {

  estaCarregando: boolean;
  erroNoCarregamento: boolean;
  pagina = 1;
  clientesService: any;
  pedido: any;
  
  constructor(private router:Router) {}

  ngOnInit(): void {
  }

  carregarClientes() {
    this.estaCarregando = true;
    this.erroNoCarregamento = false;

    this.clientesService
      .getClientes()
      .pipe(
        take(1),
        delay(1000),
        finalize(() => (this.estaCarregando = false))
      )
      .subscribe({
        next: (resposta: any) => this.onSucesso(resposta),
        error: (erro: any) => this.onErro(erro),
      });
  }
  onSucesso(resposta: any) {
    throw new Error('Method not implemented.');
  }
  onErro(erro: any) {
    throw new Error('Method not implemented.');
  }

  voltar(){
    this.router.navigate(['home'])
  }
  proxPagina() {
    this.pagina = this.pagina + 1;
    // implementar lógica de paginação
  }

  retPagina() {
    this.pagina = this.pagina - 1;
    // implementar lógica de paginação
  }

  novoPedido(){
    this.router.navigate(['listarPedidos']);
  }

  verDetalhes(){
    return
  }

  editarPedido(){
    return
}                   
  apagarCliente(){
    return
}

}
