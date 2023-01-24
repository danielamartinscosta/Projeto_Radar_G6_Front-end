import { PedidosProdutosService } from '../pedidosProdutos.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { take, finalize, delay } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { PedidoProduto } from '../pedidosProdutos.interface';
import { Pedido } from '../../pedidos/pedidos.interface';
import { Product } from '../../products/product.interface';
import { PedidosService } from '../../pedidos/pedidos.service';
import { ProductsService } from '../../products/products.service';
import { Cliente } from '../../clientes/clientes.interface';
import { ClientesService } from '../../clientes/clientes.service';

@Component({
  selector: 'app-listar-pedidosProdutos',
  templateUrl: './listar-pedidosProdutos.component.html',
  styleUrls: ['./listar-pedidosProdutos.component.css'],
})
export class ListarPedidosProdutosComponent implements OnInit {
  pedidosProdutos: Array<PedidoProduto>;
  pedidos: Array<Pedido>;
  products: Array<Product>;

  clientes: Array<Cliente>;

  pagina = 1;

  estaCarregando: boolean;
  erroNoCarregamento: boolean;

  constructor(
    private router: Router,
    private pedidosProdutosService: PedidosProdutosService,
    private pedidosService: PedidosService,
    private productsService: ProductsService,
    private clientesService: ClientesService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.carregarPedidosProdutos();
    this.carregarPedidos();
    this.carregarProdutos();
  }

  carregarPedidosProdutos() {
    this.estaCarregando = true;
    this.erroNoCarregamento = false;

    var token = this.authService.getToken();
    this.pedidosProdutosService
      .pegarPedidoProduto(token)
      .pipe(
        take(1),
        delay(1000),
        finalize(() => (this.estaCarregando = false))
      )
      .subscribe({
        next: (resposta) => this.onSucesso(resposta),
        error: (erro) => this.onErro(erro),
      });
  }

  onSucesso(resposta: PedidoProduto[]) {
    this.pedidosProdutos = resposta;
  }

  onErro(erro: any) {
    // this.erroNoCarregamento = true; -> Validar se precisa
    console.log(erro);
  }


  carregarPedidos() {
    this.estaCarregando = true;
    this.erroNoCarregamento = false;

    var token = this.authService.getToken();
    this.pedidosService
      .pegarPedido(token)
      .pipe(
        take(1),
        delay(1000),
        finalize(() => (this.estaCarregando = false))
      )
      .subscribe({
        next: (resposta) => this.onSucessoCarregarPedido(resposta),
        error: (erro) => this.onErroCarregarPedido(erro),
      });
  }

  onSucessoCarregarPedido(resposta: Pedido[]) {
    this.pedidos = resposta;
  }

  onErroCarregarPedido(erro: any) {
    // this.erroNoCarregamento = true; -> Validar se precisa
    console.log(erro);
  }



  carregarProdutos() {
    this.estaCarregando = true;
    this.erroNoCarregamento = false;

    var token = this.authService.getToken();
    this.productsService
      .pegarProduto(token)
      .pipe(
        take(1),
        delay(100),
        finalize(() => (this.estaCarregando = false))
      )
      .subscribe({
        next: (resposta) => this.onSucessoCarregarProduto(resposta),
        error: (erro) => this.onErroCarregarProduto(erro),
      });
  }

  onSucessoCarregarProduto(resposta: Product[]) {
    this.products = resposta;
  }

  onErroCarregarProduto(erro: any) {
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
        delay(1000),
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



  novoPedidoProduto() {
    this.router.navigate(['pedidosProdutos/novo-pedidoProduto']);
  }

  verDetalhes(idPedidoProduto: any) {
    this.router.navigate([`pedidosProdutos/${idPedidoProduto}`]);
  }

  editarPedidoProduto(idPedidoProduto: number) {
    this.router.navigate([`pedidosProdutos/${idPedidoProduto}/editar`]);
  }

  apagarPedidoProduto(idPedidoProduto: any) {
    var token = this.authService.getToken();
    this.pedidosProdutosService.apagarPedidoProduto(idPedidoProduto, token).subscribe({
      next: () => this.onSucessoApagarPedidoProduto(idPedidoProduto),
      error: () => this.onErroApagarPedidoProduto(),
    });
  }

  onSucessoApagarPedidoProduto(idPedidoProduto: number) {
    this.pedidosProdutos = this.pedidosProdutos?.filter(
      (pedidosProdutos) => pedidosProdutos.id != idPedidoProduto
    );
    alert('Pedido deletado com sucesso');
  }

  onErroApagarPedidoProduto() {
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
