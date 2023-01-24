import { PedidosService } from '../pedidos.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { take, finalize } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { Pedido } from '../pedidos.interface';

@Component({
  selector: 'app-detalhes-pedido',
  templateUrl: './detalhes-pedido.component.html',
  styleUrls: ['./detalhes-pedido.component.css']
})
export class DetalhesPedidoComponent implements OnInit {

  pedido: Pedido;

  estaCarregando: boolean;
  erroNoCarregamento: boolean;

  constructor(
    private ActivatedRoute: ActivatedRoute,
    private pedidosService: PedidosService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.carregarPedido();
  }

  carregarPedido(){
    this.estaCarregando = true;
    this.erroNoCarregamento = false;

    const idPedido = this.ActivatedRoute.snapshot.paramMap.get('id');

    var token = this.authService.getToken();
    this.pedidosService
    .pegarPedidoId(idPedido, token)
    .pipe(
      take(1),
      finalize(() => (this.estaCarregando = false))
    )
    .subscribe({
      next:(resposta: Pedido) => this.onSucesso(resposta),
      error:(erro) => this.onErro(erro),
    });
  }   

  onSucesso(resposta: Pedido){
    {
      this.pedido = resposta;
    }
  }

  onErro(error: any){
    {
      this.erroNoCarregamento = true;
      console.log(error);
    }
  }

  voltar(){
    this.router.navigate(['pedidos'])
  }
}
