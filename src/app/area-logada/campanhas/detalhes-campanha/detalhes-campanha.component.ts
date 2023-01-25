import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { take, finalize, delay } from 'rxjs';
import { CampanhasService } from '../campanhas.service';
import { Campanha } from '../campanhas.interface';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { ProductsService } from '../../products/products.service';
import { Produto } from '../../products/product.interface';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-detalhes-campanha',
  templateUrl: './detalhes-campanha.component.html',
  styleUrls: ['./detalhes-campanha.component.css']
})
export class DetalhesCampanhaComponent implements OnInit {

  campanha: Campanha;
  produtos: Produto[];
  confirmList: Produto[] = [];

  estaCarregando: boolean;
  erroNoCarregamento: boolean;

  constructor(
    private ActivatedRoute: ActivatedRoute,
    private campanhasService: CampanhasService,
    private productsService: ProductsService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.carregarCampanha();
    this.carregarProdutos();
  }

  carregarCampanha(){
    this.estaCarregando = true;
    this.erroNoCarregamento = false;

    const idCampanha = this.ActivatedRoute.snapshot.paramMap.get('id');

    var token = this.authService.getToken();
    this.campanhasService
    .pegarCampanhaId(idCampanha, token)
    .pipe(
      take(1),
      finalize(() => (this.estaCarregando = false))
    )
    .subscribe({
      next:(resposta: Campanha) => this.onSucesso(resposta),
      error:(erro) => this.onErro(erro),
    });
  }   

  onSucesso(resposta: Campanha){
    {
      this.campanha = resposta;
    }
  }

  onErro(error: any){
    {
      this.erroNoCarregamento = true;
      console.log(error);
    }
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
        next: (resposta) => this.onSucessoProduto(resposta),
        error: (erro) => this.onErroProduto(erro),
      });
  }

  onSucessoProduto(resposta: Produto[]) {
    this.produtos = resposta;
  }

  onErroProduto(erro: any) {
    // this.erroNoCarregamento = true; -> Validar se precisa
    console.log(erro);
  }


  drop(event: CdkDragDrop<Produto[]>){
    //verifica qual lista
    if( event.previousContainer === event.container){ // movendo itens na lista
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      }else{ // tranferir itens
        transferArrayItem(event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex
          );
      }
  }


  voltar(){
    this.router.navigate(['campanhas'])
  }
}
