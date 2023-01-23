import { LojasService } from '../lojas.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { take, finalize, delay } from 'rxjs';
import { Loja } from '../lojas.interface';
import { AuthService } from 'src/app/shared/services/auth/auth.service';

@Component({
  selector: 'app-listar-lojas',
  templateUrl: './listar-lojas.component.html',
  styleUrls: ['./listar-lojas.component.css'],
})
export class ListarLojasComponent implements OnInit {
  lojas: Array<Loja>;

  pagina = 1;

  estaCarregando: boolean;
  erroNoCarregamento: boolean;

  constructor(
    private router: Router,
    private lojasService: LojasService,
    private authService:AuthService
  ) {}

  ngOnInit() {
    this.carregarLojas();
  }

  carregarLojas() {
    this.estaCarregando = true;
    this.erroNoCarregamento = false;

    var token = this.authService.getToken();
    this.lojasService
      .pegarLoja(token)
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

  onSucesso(resposta: Loja[]) {
    this.lojas = resposta;
  }

  onErro(erro: any) {
    // this.erroNoCarregamento = true; -> Validar se precisa
    console.log(erro);
  }

  novaLoja() {
    this.router.navigate(['lojas/nova-loja']);
  }

  verDetalhes(idLoja: number) {
    this.router.navigate([`lojas/${idLoja}`]);
  }

  editarLoja(idLoja: number) {
    this.router.navigate([`lojas/${idLoja}/editar`]);
  }

  apagarLoja(idLoja: any) {
    var token = this.authService.getToken();
    this.lojasService.apagarLoja(idLoja, token).subscribe({
      next: () => this.onSucessoApagarLoja(idLoja),
      error: () => this.onErroApagarLoja(),
    });
  }

  onSucessoApagarLoja(idLoja: number) {
    this.lojas = this.lojas?.filter(
      (lojas) => lojas.id != idLoja
    );
    alert('Loja deletada com sucesso');
  }

  onErroApagarLoja() {
    alert('Ocorreu um erro ao tentar deletar loja!');
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
