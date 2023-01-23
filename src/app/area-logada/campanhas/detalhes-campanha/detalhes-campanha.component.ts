import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { take, finalize } from 'rxjs';
import { CampanhasService } from '../campanhas.service';
import { Campanha } from '../campanhas.interface';
import { AuthService } from 'src/app/shared/services/auth/auth.service';

@Component({
  selector: 'app-detalhes-campanha',
  templateUrl: './detalhes-campanha.component.html',
  styleUrls: ['./detalhes-campanha.component.css']
})
export class DetalhesCampanhaComponent implements OnInit {

  campanha: Campanha;

  estaCarregando: boolean;
  erroNoCarregamento: boolean;

  constructor(
    private ActivatedRoute: ActivatedRoute,
    private campanhasService: CampanhasService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.carregarCampanha();
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

  voltar(){
    this.router.navigate(['campanhas'])
  }
}
