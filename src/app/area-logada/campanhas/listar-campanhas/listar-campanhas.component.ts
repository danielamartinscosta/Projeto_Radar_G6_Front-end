import { CampanhasService } from '../campanhas.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { take, finalize, delay } from 'rxjs';
import { Campanha } from '../campanhas.interface';
import { AuthService } from 'src/app/shared/services/auth/auth.service';

@Component({
  selector: 'app-listar-campanhas',
  templateUrl: './listar-campanhas.component.html',
  styleUrls: ['./listar-campanhas.component.css'],
})
export class ListarCampanhasComponent implements OnInit {
  campanhas: Array<Campanha>;

  pagina = 1;

  estaCarregando: boolean;
  erroNoCarregamento: boolean;

  constructor(
    private router: Router,
    private campanhasService: CampanhasService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.carregarCampanhas();
  }

  carregarCampanhas() {
    this.estaCarregando = true;
    this.erroNoCarregamento = false;


    var token = this.authService.getToken();
    this.campanhasService
      .pegarCampanha(token)
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

  onSucesso(resposta: Campanha[]) {
    this.campanhas = resposta;
  }

  onErro(erro: any) {
    // this.erroNoCarregamento = true; -> Validar se precisa
    console.log(erro);
  }

  novaCampanha() {
    this.router.navigate(['campanhas/nova-campanha']);
  }

  verDetalhes(idCampanha: number) {
    this.router.navigate([`campanhas/${idCampanha}`]);
  }

  editarCampanha(idCampanha: number) {
    this.router.navigate([`campanhas/${idCampanha}/editar`]);
  }

  apagarCampanha(idCampanha: any) {
    var token = this.authService.getToken();
    this.campanhasService.apagarCampanha(idCampanha, token).subscribe({
      next: () => this.onSucessoApagarCampanha(idCampanha),
      error: () => this.onErroApagarCampanha(),
    });
  }

  onSucessoApagarCampanha(idCampanha: number) {
    this.campanhas = this.campanhas?.filter(
      (campanhas) => campanhas.id != idCampanha
    );
    alert('Campanha deletada com sucesso');
  }

  onErroApagarCampanha() {
    alert('Ocorreu um erro ao tentar deletar campanha!');
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
