import { ClientesService } from './../clientes.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { finalize, take, delay } from 'rxjs';
import { Cliente } from '../clientes.interface';
import { AuthService } from 'src/app/shared/services/auth/auth.service';

@Component({
  selector: 'app-listar-clientes',
  templateUrl: './listar-clientes.component.html',
  styleUrls: ['./listar-clientes.component.css'],
})
export class ListarClientesComponent implements OnInit {
  clientes: Array<Cliente>;

  estaCarregando: boolean;
  erroNoCarregamento: boolean;
  pagina = 1;

  constructor(
    private router: Router,
    private clientesService: ClientesService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.carregarClientes();
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

  novoCliente() {
    this.router.navigate(['clientes/novo-cliente']);
  }

  verDetalhes(idContato: any) {
    this.router.navigate([`clientes/${idContato}`]);
  }

  editarCliente(idCliente: any) {
    this.router.navigate([`clientes/${idCliente}/editar`]);
  }

  apagarCliente(idCliente: any) {
    var token = this.authService.getToken();
    this.clientesService.apagarCliente(idCliente, token).subscribe({
      next: () => this.onSucessoApagarCliente(idCliente),
      error: () => this.onErroApagarCliente(),
    });
  }

  onSucessoApagarCliente(idCliente: any) {
    this.clientes = this.clientes?.filter(
      (clientes) => clientes.id != idCliente
    );
    alert('Cliente deletado com sucesso!');
  }

  onErroApagarCliente() {
    alert('Ocorreu um erro ao tentar deletar cliente!');
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
