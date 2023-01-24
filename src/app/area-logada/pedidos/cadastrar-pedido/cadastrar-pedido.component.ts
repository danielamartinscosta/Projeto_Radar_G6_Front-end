import { PedidosService } from '../pedidos.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ActivatedRoute, Router } from '@angular/router';
import { take, finalize, delay } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { Pedido } from '../pedidos.interface';
import { ClientesService } from '../../clientes/clientes.service';
import { Cliente } from '../../clientes/clientes.interface';

@Component({
  selector: 'app-cadastrar-pedido',
  templateUrl: './cadastrar-pedido.component.html',
  styleUrls: ['./cadastrar-pedido.component.css']
})
export class CadastrarPedidoComponent implements OnInit{
  idPedido: String | null;
  pedidoForm: FormGroup;
  clientes: Array<Cliente>;


  estaCarregando: boolean;
  erroNoCarregamento: boolean;

  constructor(
    private pedidosService: PedidosService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private clientesService: ClientesService,
    private authService: AuthService
    ) {}

    ngOnInit(): void {
     this.inicializaForm();
     this.carregarClientes();

     this.idPedido = this.activatedRoute.snapshot.paramMap.get('id');
     if(this.idPedido){
      this.carregarPedidos();
     }
    }

    inicializaForm(){
      this.pedidoForm = this.formBuilder.group({
        id: [''],
        clienteId:['',Validators.required],
        valorTotal:['',Validators.required],
        dataPedido:['',Validators.required]
      });
    }

    alterandoPedido = () => Boolean(this.idPedido);

    exibeErro(nomeControle: string) {
      if (!this.pedidoForm.get(nomeControle)) {
        return false;
      }
  
      return (
        this.pedidoForm.controls[nomeControle].invalid &&
        this.pedidoForm.controls[nomeControle].touched
      );
    }

    carregarPedidos(){
      this.estaCarregando = true;
      this.erroNoCarregamento = false;

      const idPedido = this.activatedRoute.snapshot.paramMap.get('id');

      var token = this.authService.getToken();
      this.pedidosService
        .pegarPedidoId(idPedido, token)
        .pipe(
          take(1),
          finalize(() => (this.estaCarregando = false))
        )
        .subscribe({
          next:(resposta: Pedido) => this.onSucessoCarregarPedidoscarregarPedidos(resposta),
          error:(erro) => this.onErroCarregarPedidoscarregarPedidos(erro),
        });
      }   

    onSucessoCarregarPedidoscarregarPedidos(resposta: Pedido){
      this.pedidoForm.patchValue(resposta);
    }

    onErroCarregarPedidoscarregarPedidos(erro: any){
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
          next: (resposta) => this.onSucesso(resposta),
          error: (erro) => this.onErro(erro),
        });
    }
  
    onSucesso(resposta: Cliente[]) {
      this.clientes = resposta;
    }
  
    onErro(erro: any) {
      console.log(erro);
    }

  validarCampos(){
    Object.keys(this.pedidoForm.controls).forEach((campo) => {
      const controle = this.pedidoForm.get(campo);
      controle?.markAsTouched();
    });
  }

  onSubmit(){
    if(this.pedidoForm.invalid){
      this.validarCampos();
      return;
    }
    if(this.alterandoPedido()){
      this.salvarPedido();
      return;
    }
    this.cadastrarPedido();
  }

  salvarPedido(){
    var token = this.authService.getToken();
    this.pedidosService
      .alterarPedido(this.idPedido, this.pedidoForm.value, token)
      .subscribe({
        next: () => this.onSucessoSalvarPedido(),
        error: () => this.onErroSalvarPedido(),
      });
  }

  onSucessoSalvarPedido(){
    alert('Pedido atualizado com sucesso!');
    this.router.navigate(['pedidos']);
  };

  onErroSalvarPedido(){
    alert('Ocorreu um erro ao atualizar o pedido!');
  };

  cadastrarPedido(){
    var token = this.authService.getToken();
    this.pedidosService.cadastrarPedido(this.pedidoForm.value, token).subscribe({
      next: () => this.onSucessoCadastrarPedido(),
      error: () => this.onErroCadastrarPedido(),
    });
  };

  onSucessoCadastrarPedido(){
    alert('Pedido castrado com sucesso!');
    this.router.navigate(['pedidos']);
  };

  onErroCadastrarPedido(){
    alert('Ocorreu um erro ao cadastrar o pedido!');
  };

  voltar() {
    this.router.navigate(['pedidos'])
  }
}

