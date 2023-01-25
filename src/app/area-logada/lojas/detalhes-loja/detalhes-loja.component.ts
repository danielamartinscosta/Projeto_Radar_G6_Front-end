import { LojasService } from '../lojas.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Loja } from '../lojas.interface';
import { take, finalize } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth/auth.service';

@Component({
  selector: 'app-detalhes-loja',
  templateUrl: './detalhes-loja.component.html',
  styleUrls: ['./detalhes-loja.component.css']
})
export class DetalhesLojaComponent implements OnInit {

  loja: Loja;

  

  estaCarregando: boolean;
  erroNoCarregamento: boolean;

  constructor(
    private ActivatedRoute: ActivatedRoute,
    private lojasService: LojasService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.carregarLoja();

   
  }

  carregarLoja(){
    this.estaCarregando = true;
    this.erroNoCarregamento = false;

    const idLoja = this.ActivatedRoute.snapshot.paramMap.get('id');
    
    var token = this.authService.getToken();
    this.lojasService
    .pegarLojaId(idLoja, token)
    .pipe(
      take(1),
      finalize(() => (this.estaCarregando = false))
    )
    .subscribe({
      next:(resposta: Loja) => this.onSucesso(resposta),
      error:(erro) => this.onErro(erro),
    });
  }   

  onSucesso(resposta: Loja){
    {
      this.loja = resposta;
    }
  }

  onErro(error: any){
    {
      this.erroNoCarregamento = true;
      console.log(error);
    }
  }

  voltar(){
    this.router.navigate(['lojas'])
  }

  /*latitude = this.loja.latitude;
  longitude = "-46.666597197942004";

  url = `https://maps.googleapis.com/maps/api/staticmap?center=${this.latitude},${this.longitude}&zoom=16&size=400x400&markers=${this.latitude},${this.longitude}&key=AIzaSyDeHkgTm5W0Ihk5-SUD7kGE9JsT7ah5wCM`;*/

}
