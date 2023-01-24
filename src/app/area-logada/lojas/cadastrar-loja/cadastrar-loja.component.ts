import { LojasService } from '../lojas.service';
import { Component, OnInit } from '@angular/core';
import { Loja } from '../lojas.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { take, finalize } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-cadastrar-loja',
  templateUrl: './cadastrar-loja.component.html',
  styleUrls: ['./cadastrar-loja.component.css']
})
export class CadastrarLojaComponent implements OnInit {
  idLoja: string | null;
  lojaForm: FormGroup;
  

  estaCarregando: boolean;
  erroNoCarregamento: boolean;

  constructor(
    private lojasService: LojasService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.inicializaForm();

    this.idLoja = this.activatedRoute.snapshot.paramMap.get('id');
    if (this.idLoja) {
      this.carregarLojas();
    }
  }

  inicializaForm() {
    this.lojaForm = this.formBuilder.group({
      id: [''],
      nome: ['',Validators.required],
      observacao: [''],
      cep: ['',Validators.required],
      logradouro: ['',Validators.required],
      numero: ['',Validators.required],
      bairro: ['',Validators.required],
      cidade: ['',Validators.required],
      estado: ['',Validators.required],
      complemento: ['',Validators.required],
      latitude: ['',Validators.required],
      longitude: ['', Validators.required],

    });
  }

  alterandoLoja = () => Boolean(this.idLoja);

  exibeErro(nomeControle: string) {
    if (!this.lojaForm.get(nomeControle)) {
      return false;
    }

    return (
      this.lojaForm.controls[nomeControle].invalid &&
      this.lojaForm.controls[nomeControle].touched
    );
  }

  carregarLojas() {
    this.estaCarregando = true;
    this.erroNoCarregamento = false;

    const idLoja = this.activatedRoute.snapshot.paramMap.get('id');

    var token = this.authService.getToken();
    this.lojasService
      .pegarLojaId(idLoja, token)
      .pipe(
        take(1),
        finalize(() => (this.estaCarregando = false))
      )
      .subscribe({
        next: (resposta: Loja) => this.onSucessoCarregarLojascarregarLojas(resposta),
        error: (erro) => this.onErroCarregarLojascarregarLojas(erro),
      });
  }

  onSucessoCarregarLojascarregarLojas(resposta: Loja) {
    this.lojaForm.patchValue(resposta);
  }

  onErroCarregarLojascarregarLojas(erro: any) {
    this.erroNoCarregamento = true;
    console.log(erro)
  }

  validarCampos() {
    Object.keys(this.lojaForm.controls).forEach((campo) => {
      const controle = this.lojaForm.get(campo);
      controle?.markAsTouched();
    });
  }

  onSubmit() {
    if (this.lojaForm.invalid) {
      this.validarCampos();
      return;
    }
    if (this.alterandoLoja()) {
      this.salvarLoja();
      return;
    }
    this.cadastrarLoja();
  }

  salvarLoja() {
    var token = this.authService.getToken();
    this.lojasService
      .alterarLoja(this.idLoja, this.lojaForm.value, token)
      .subscribe({
        next: () => this.onSucessoSalvarLoja(),
        error: () => this.onErroSalvarLoja(),
      });
  }

  onSucessoSalvarLoja() {
    alert('Loja atualizada com sucesso!');
    this.router.navigate(['lojas']);
  };

  onErroSalvarLoja() {
    alert('Ocorreu um erro ao atualizar a loja!');
  };

  cadastrarLoja() {
    var token = this.authService.getToken();
    this.lojasService.cadastrarLoja(this.lojaForm.value, token).subscribe({
      next: () => this.onSucessoCadastrarLoja(),
      error: () => this.onErroCadastrarLoja(),
    });
  };

  onSucessoCadastrarLoja() {
    alert('Loja casdastrada com sucesso!');
    this.router.navigate(['lojas']);
  };

  onErroCadastrarLoja() {
    alert('Ocorreu um erro ao cadastrar o loja!');
  };

  voltar() {
    this.router.navigate(['lojas'])
  }
}

