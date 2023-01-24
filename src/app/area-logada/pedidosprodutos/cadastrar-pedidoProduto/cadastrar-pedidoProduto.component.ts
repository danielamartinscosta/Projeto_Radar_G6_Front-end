import { PedidosProdutosService } from '../pedidosProdutos.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { take, finalize, delay } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { PedidoProduto } from '../pedidosProdutos.interface';
import { Pedido } from '../../pedidos/pedidos.interface';
import { Produto } from '../../products/product.interface';
import { ProductsService } from '../../products/products.service';
import { PedidosService } from '../../pedidos/pedidos.service';
import { ClientesService } from '../../clientes/clientes.service';
import { Cliente } from '../../clientes/clientes.interface';

@Component({
  selector: 'app-cadastrar-pedidoProduto',
  templateUrl: './cadastrar-pedidoProduto.component.html',
  styleUrls: ['./cadastrar-pedidoProduto.component.css']
})
export class CadastrarPedidoProdutoComponent implements OnInit{
  idPedidoProduto: String | null;
  pedidoProdutoForm: FormGroup;
  pedidos: Array<Pedido>;
  produtos: Array<Produto>;
  clientes: Array<Cliente>;
 
  //Acrescenatr pedidos e produtos


  estaCarregando: boolean;
  erroNoCarregamento: boolean;

  constructor(
    private pedidosProdutosService: PedidosProdutosService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private productsService: ProductsService,
    private pedidosService: PedidosService,
    private clientesService: ClientesService,
    private authService: AuthService
    ) {}

    ngOnInit(): void {
     this.inicializaForm();
     this.carregarPedidos();
     this.carregarProdutos();
     this.carregarClientes();

     this.idPedidoProduto = this.activatedRoute.snapshot.paramMap.get('id');
     if(this.idPedidoProduto){
      this.carregarPedidosProdutos();
     }
    }

    inicializaForm(){
      this.pedidoProdutoForm = this.formBuilder.group({
        id: [''],
        pedidoId:['',Validators.required],
        produtoId:['',Validators.required],
        valor:['',Validators.required],
        quantidade:['',Validators.required]
      });
    }

    alterandoPedidoProduto = () => Boolean(this.idPedidoProduto);

    exibeErro(nomeControle: string) {
      if (!this.pedidoProdutoForm.get(nomeControle)) {
        return false;
      }
  
      return (
        this.pedidoProdutoForm.controls[nomeControle].invalid &&
        this.pedidoProdutoForm.controls[nomeControle].touched
      );
    }

    carregarPedidosProdutos(){
      debugger
      this.estaCarregando = true;
      this.erroNoCarregamento = false;

      const idPedidoProduto = this.activatedRoute.snapshot.paramMap.get('id');

      var token = this.authService.getToken();
      this.pedidosProdutosService
        .pegarPedidoProdutoId(idPedidoProduto, token)
        .pipe(
          take(1),
          finalize(() => (this.estaCarregando = false))
        )
        .subscribe({
          next:(resposta: PedidoProduto) => this.onSucessoCarregarPedidosProdutoscarregarPedidos(resposta),
          error:(erro) => this.onErroCarregarPedidosProdutoscarregarPedidos(erro),
        });
      }   

    onSucessoCarregarPedidosProdutoscarregarPedidos(resposta: PedidoProduto){
      this.pedidoProdutoForm.patchValue(resposta);
    }

    onErroCarregarPedidosProdutoscarregarPedidos(erro: any){
      this.erroNoCarregamento = true;
      console.log(erro)
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
          next: (resposta) => this.onSucessoCliente(resposta),
          error: (erro) => this.onErroCliente(erro),
        });
    }
  
    onSucessoCliente(resposta: Cliente[]) {
      this.clientes = resposta;
    }
  
    onErroCliente(erro: any) {
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
  
    onSucessoCarregarProduto(resposta: Produto[]) {
      this.produtos = resposta;
    }
  
    onErroCarregarProduto(erro: any) {
      // this.erroNoCarregamento = true; -> Validar se precisa
      console.log(erro);
    }


  validarCampos(){
    Object.keys(this.pedidoProdutoForm.controls).forEach((campo) => {
      const controle = this.pedidoProdutoForm.get(campo);
      controle?.markAsTouched();
    });
  }

  onSubmit(){
    if(this.pedidoProdutoForm.invalid){
      this.validarCampos();
      return;
    }
    if(this.alterandoPedidoProduto()){
      this.salvarPedidoProduto();
      return;
    }
    this.cadastrarPedidoProduto();
  }

  salvarPedidoProduto(){
    var token = this.authService.getToken();
    this.pedidosProdutosService
      .alterarPedidoProduto(this.idPedidoProduto, this.pedidoProdutoForm.value, token)
      .subscribe({
        next: () => this.onSucessoSalvarPedidoProduto(),
        error: () => this.onErroSalvarPedidoProduto(),
      });
  }

  onSucessoSalvarPedidoProduto(){
    alert('Pedido atualizado com sucesso!');
    this.router.navigate(['pedidosProdutos']);
  };

  onErroSalvarPedidoProduto(){
    alert('Ocorreu um erro ao atualizar o pedido!');
  };

  cadastrarPedidoProduto(){
    debugger
    var token = this.authService.getToken();
    this.pedidosProdutosService.cadastrarPedidoProduto(this.pedidoProdutoForm.value, token).subscribe({
      next: () => this.onSucessoCadastrarPedidoProduto(),
      error: () => this.onErroCadastrarPedidoProduto(),
    });
  };

  onSucessoCadastrarPedidoProduto(){
    alert('Pedido castrado com sucesso!');
    this.router.navigate(['pedidosProdutos']);
  };

  onErroCadastrarPedidoProduto(){
    alert('Ocorreu um erro ao cadastrar o pedido!');
  };

  voltar() {
    this.router.navigate(['pedidosProdutos'])
  }
}

