import { PedidosService } from '../pedidos.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { take, finalize, delay } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { Pedido } from '../pedidos.interface';
import { Cliente } from '../../clientes/clientes.interface';
import { ClientesService } from '../../clientes/clientes.service';

@Component({
  selector: 'app-listar-pedidos',
  templateUrl: './listar-pedidos.component.html',
  styleUrls: ['./listar-pedidos.component.css'],
})
export class ListarPedidosComponent implements OnInit {
  pedidos: Array<Pedido>;
  clientes: Array<Cliente>;

  pagina = 1;

  estaCarregando: boolean;
  erroNoCarregamento: boolean;

  constructor(
    private router: Router,
    private pedidosService: PedidosService,
    private clientesService: ClientesService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.carregarPedidos();
    this.carregarClientes();
  }

  carregarPedidos() {
    this.estaCarregando = true;
    this.erroNoCarregamento = false;

    var token = this.authService.getToken();
    this.pedidosService
      .pegarPedido(token)
      .pipe(
        take(1),
        delay(100),
        finalize(() => (this.estaCarregando = false))
      )
      .subscribe({
        next: (resposta) => this.onSucesso(resposta),
        error: (erro) => this.onErro(erro),
      });
  }

  onSucesso(resposta: Pedido[]) {
    this.pedidos = resposta;
  }

  onErro(erro: any) {
    // this.erroNoCarregamento = true; -> Validar se precisa
    console.log(erro);
  }

  carregarClientes() {
    this.estaCarregando = true;
    this.erroNoCarregamento = false;

    
    var token = this.authService.getToken();
    this.clientesService
      .getClientes(token)
      .pipe(
        take(1),
        delay(100),
        finalize(() => (this.estaCarregando = false))
      )
      .subscribe({
        next: (resposta) => this.onSucessoCarregarClientes(resposta),
        error: (erro) => this.onErroCarregarCliente(erro),
      });
  }

  onSucessoCarregarClientes(resposta: Cliente[]) {
    this.clientes = resposta;
  }

  onErroCarregarCliente(erro: any) {
    console.log(erro);
  }



  novoPedido() {
    this.router.navigate(['pedidos/new-pedido']);
  }

  verDetalhes(idPedido: any) {
    this.router.navigate([`pedidos/${idPedido}`]);
  }

  editarPedido(idPedido: number) {
    this.router.navigate([`pedidos/${idPedido}/editar`]);
  }

  apagarPedido(idPedido: any) {
    var token = this.authService.getToken();
    this.pedidosService.apagarPedido(idPedido, token).subscribe({
      next: () => this.onSucessoApagarPedido(idPedido),
      error: () => this.onErroApagarPedido(),
    });
  }

  onSucessoApagarPedido(idPedido: number) {
    this.pedidos = this.pedidos?.filter(
      (pedidos) => pedidos.id != idPedido
    );
    alert('Pedido deletado com sucesso');
  }

  onErroApagarPedido() {
    alert('Ocorreu um erro ao tentar deletar pedido!');
  }

  proximaPagina() {
    this.pagina = this.pagina + 1;
    // implementar lógica de paginação
  }

  paginaAnterior() {
    this.pagina = this.pagina - 1;
    // implementar lógica de paginação
  }
}
