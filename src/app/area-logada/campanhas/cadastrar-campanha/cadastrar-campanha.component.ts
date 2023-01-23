import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize, take } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { Campanha } from '../campanhas.interface';
import { CampanhasService } from '../campanhas.service';

@Component({
  selector: 'app-cadastrar-campanha',
  templateUrl: './cadastrar-campanha.component.html',
  styleUrls: ['./cadastrar-campanha.component.css']
})
export class CadastrarCampanhaComponent implements OnInit {
  idCampanha: String | null;
  campanhaForm: FormGroup;

  estaCarregando: boolean;
  erroNoCarregamento: boolean;

  constructor(
    private campanhasService: CampanhasService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private authService: AuthService
    ) {}

  ngOnInit(): void {
    this.inicializaForm();

     this.idCampanha = this.activatedRoute.snapshot.paramMap.get('id');
     if(this.idCampanha){
      this.carregarCampanhas();
     }
  }

  inicializaForm(){
    this.campanhaForm = this.formBuilder.group({
      id:[''],
      nome:['', Validators.required],
      descricao:['',Validators.required],
      data:['',Validators.required],
      foto:['']
    });
  }

  alterandoCampanha = () => Boolean(this.idCampanha);

  exibeErro(nomeControle: string) {
    if (!this.campanhaForm.get(nomeControle)) {
      return false;
    }

    return (
      this.campanhaForm.controls[nomeControle].invalid &&
      this.campanhaForm.controls[nomeControle].touched
    );
  }

  carregarCampanhas(){
    this.estaCarregando = true;
    this.erroNoCarregamento = false;

    const idCampanha = this.activatedRoute.snapshot.paramMap.get('id');

    var token = this.authService.getToken();
    this.campanhasService
      .pegarCampanhaId(idCampanha, token)
      .pipe(
        take(1),
        finalize(() => (this.estaCarregando = false))
      )
      .subscribe({
        next:(resposta: Campanha) => this.onSucessoCarregarCampanhascarregarCampanhas(resposta),
        error:(erro) => this.onErroCarregarCampanhascarregarCampanhas(erro),
      });
    }   

  onSucessoCarregarCampanhascarregarCampanhas(resposta: Campanha){
    this.campanhaForm.patchValue(resposta);
  }

  onErroCarregarCampanhascarregarCampanhas(erro: any){
    this.erroNoCarregamento = true;
    console.log(erro)
  }

validarCampos(){
  Object.keys(this.campanhaForm.controls).forEach((campo) => {
    const controle = this.campanhaForm.get(campo);
    controle?.markAsTouched();
  });
}

onSubmit(){
  if(this.campanhaForm.invalid){
    this.validarCampos();
    return;
  }
  if(this.alterandoCampanha()){
    this.salvarCampanha();
    return;
  }
  this.cadastrarCampanha();
}

salvarCampanha(){
  var token = this.authService.getToken();
  this.campanhasService
    .alterarCampanha(this.idCampanha, this.campanhaForm.value, token)
    .subscribe({
      next: () => this.onSucessoSalvarCampanha(),
      error: () => this.onErroSalvarCampanha(),
    });
}

onSucessoSalvarCampanha(){
  alert('Campanha atualizada com sucesso!');
  this.router.navigate(['campanhas']);
};

onErroSalvarCampanha(){
  alert('Ocorreu um erro ao atualizar a campanha!');
};

cadastrarCampanha(){
  var token = this.authService.getToken();
  this.campanhasService.cadastrarCampanha(this.campanhaForm.value, token).subscribe({
    next: () => this.onSucessoCadastrarCampanha(),
    error: () => this.onErroCadastrarCampanha(),
  });
};

onSucessoCadastrarCampanha(){
  alert('Campanha cadastrada com sucesso!');
  this.router.navigate(['campanhas']);
};

onErroCadastrarCampanha(){
  alert('Ocorreu um erro ao cadastrar a campanha!');
};

  voltar(){
    this.router.navigate(['campanhas'])
  }

}
