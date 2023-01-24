import { Cliente } from './../clientes.interface';
import { take, finalize } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { ClientesService } from './../clientes.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { CepService } from '../cep-service';

@Component({
  selector: 'app-cadastrar-cliente',
  templateUrl: './cadastrar-cliente.component.html',
  styleUrls: ['./cadastrar-cliente.component.css'],
})
export class CadastrarClienteComponent implements OnInit {
  clienteForm: FormGroup;
  idCliente: string | null;

  estaCarregando: boolean;
  erroNoCarregamento: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private clientesService: ClientesService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private cepsService: CepService
  ) { }

  ngOnInit() {
    this.inicializaForm();

    this.idCliente = this.activatedRoute.snapshot.paramMap.get('id');
    if (this.idCliente) {
      this.carregarClientes();
    }
  }
/*
  buscarEnderecoPorCep(cep: string) {
    this.cepsService.buscarEnderecoPorCep(cep).subscribe((endereco => this.clienteForm.patchValue));
        logradouro: endereco.logradouro,
        bairro: endereco.bairro,
        cidade: endereco.localidade,
        estado: endereco.uf
      });
    });
  }*/



  inicializaForm() {
    this.clienteForm = this.formBuilder.group({
      id: [''],
      nome: ['', Validators.required],
      telefone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      cpf: ['', Validators.required],
      cep: ['', Validators.required],
      logradouro: ['', Validators.required],
      numero: ['', Validators.required],
      bairro: ['', Validators.required],
      cidade: ['', Validators.required],
      estado: ['', Validators.required],
      complemento: [''],
    });
  }

  estaAlterando = () => Boolean(this.idCliente);

  exibeErro(nomeControle: string) {
    if (!this.clienteForm.get(nomeControle)) {
      return false;
    }

    return (
      this.clienteForm.controls[nomeControle].invalid &&
      this.clienteForm.controls[nomeControle].touched
    );
  }

  carregarClientes() {
    this.estaCarregando = true;
    this.erroNoCarregamento = false;

    const idCliente = this.activatedRoute.snapshot.paramMap.get('id');

    var token = this.authService.getToken();
    this.clientesService
      .getClientePorId(idCliente, token)
      .pipe(
        take(1),
        finalize(() => (this.estaCarregando = false))
      )
      .subscribe({
        next: (resposta: Cliente) => this.onSucessoCarregarCliente(resposta),
        error: (erro) => this.onErroCarregarCliente(erro),
      });
  }

  onSucessoCarregarCliente(resposta: Cliente) {
    this.clienteForm.patchValue(resposta);
  }

  onErroCarregarCliente(erro: any) {
    this.erroNoCarregamento = true;
    console.log(erro);
  }

  validaCampos() {
    Object.keys(this.clienteForm.controls).forEach((campo) => {
      const controle = this.clienteForm.get(campo);
      controle?.markAsTouched();
    });
  }

  onSubmit() {
    if (this.clienteForm.invalid) {
      this.validaCampos();
      return;
    }

    if (this.estaAlterando()) {
      this.salvarCliente();
      return;
    }

    this.cadastrarCliente();
  }


  salvarCliente() {
    var token = this.authService.getToken();
    this.clientesService
      .attCliente(this.idCliente, this.clienteForm.value, token)
      .subscribe({
        next: () => this.onSucessoSalvarCliente(),
        error: () => this.onErroSalvarCliente(),
      });
  }


  onSucessoSalvarCliente() {
    alert('Cliente atualizado com sucesso!');
    this.router.navigate(['clientes']);
  }

  onErroSalvarCliente() {
    alert('Ocorreu um erro ao atualizar o cliente!');
  }

  cadastrarCliente() {
    var token = this.authService.getToken();
    this.clientesService.criarCliente(this.clienteForm.value, token).subscribe({
      next: () => this.onSucessoCriarCliente(),
      error: () => this.onErroCriarContato(),
    });
  }

  onSucessoCriarCliente() {
    alert('Cliente cadastrado com sucesso!');
    this.router.navigate(['clientes']);
  }

  onErroCriarContato() {
    alert('Ocorreu um erro ao cadastrar o cliente!');
  }

  voltar() {
    this.router.navigate(['clientes']);
  }
}
