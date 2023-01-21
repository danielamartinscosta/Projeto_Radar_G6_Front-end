import { Router } from '@angular/router';
import { LoginService } from './login.service';
import { NgForm } from '@angular/forms';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  @ViewChild('emailInput') emailInput!: ElementRef;
  @ViewChild('senhaInput') senhaInput!: ElementRef;

  email: string;
  senha: string;

  estaLogando: boolean;
  erroNoLogin: boolean;

  constructor(private loginService: LoginService, private router: Router) {}

  onSubmit(form: NgForm) {
    this.erroNoLogin = false;

    if (!form.valid) {
      form.controls['email'].markAsTouched();
      form.controls['senha'].markAsTouched();

      if (form.controls['email'].invalid) {
        this.emailInput.nativeElement.focus();
        return;
      }

      this.senhaInput.nativeElement.focus();
      return;
    }

    this.login(this.email, this.senha);
  }

  login(email:string, senha:string) {
    this.estaLogando = true;
    this.loginService
      .logar({email:email, senha:senha })
      .pipe(finalize(() => (this.estaLogando = false)))
      .subscribe({
        next: () => this.loginEfetivado(),
        error: () => this.erroLogin(),
      });
  }

  exibeErro(nomeControle: string, form: NgForm) {
    if (!form.controls[nomeControle]) {
      return false;
    }

    return (
      form.controls[nomeControle].invalid && form.controls[nomeControle].touched
    );
  }

  loginEfetivado() {
    this.router.navigate(['home']);
  }

  erroLogin() {
    {
      this.erroNoLogin = true;
      console.log('Erro ao logar.');
    }
  }

  ngOnInit(): void {
    
  }
}
