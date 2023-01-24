import { PedidosProdutosService } from '../pedidosProdutos.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { take, finalize } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { PedidoProduto } from '../pedidosProdutos.interface';

@Component({
  selector: 'app-detalhes-pedidoProduto',
  templateUrl: './detalhes-pedidoProduto.component.html',
  styleUrls: ['./detalhes-pedidoProduto.component.css']
})
export class DetalhesPedidoProdutoComponent implements OnInit {

  pedidoProduto: PedidoProduto;

  estaCarregando: boolean;
  erroNoCarregamento: boolean;

  constructor(
    private ActivatedRoute: ActivatedRoute,
    private pedidosProdutosService: PedidosProdutosService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.carregarPedidoProduto();
  }

  carregarPedidoProduto(){
    this.estaCarregando = true;
    this.erroNoCarregamento = false;

    const idPedidoProduto = this.ActivatedRoute.snapshot.paramMap.get('id');

    var token = this.authService.getToken();
    this.pedidosProdutosService
    .pegarPedidoProdutoId(idPedidoProduto, token)
    .pipe(
      take(1),
      finalize(() => (this.estaCarregando = false))
    )
    .subscribe({
      next:(resposta: PedidoProduto) => this.onSucesso(resposta),
      error:(erro) => this.onErro(erro),
    });
  }   

  onSucesso(resposta: PedidoProduto){
    {
      this.pedidoProduto = resposta;
    }
  }

  onErro(error: any){
    {
      this.erroNoCarregamento = true;
      console.log(error);
    }
  }

  voltar(){
    this.router.navigate(['pedidosProdutos'])
  }
}
