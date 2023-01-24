import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Usuario } from '../../interfaces/usuario.iterfaces';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  usuario: Usuario;
  token: any;

  constructor(private router: Router) {}

  setUsuario(usuario: Usuario) {
    this.usuario = usuario;
    localStorage.setItem('usuario', JSON.stringify(usuario));
  }

  setToken(token: string) {
    this.token = token;
    localStorage.setItem('token', JSON.stringify(token));
  }

  getUsuario() {
    if (this.usuario) {
      return this.usuario;
    }

    const usuarioGuardado = localStorage.getItem('usuario');
    if (usuarioGuardado) {
      this.usuario = JSON.parse(usuarioGuardado);
      return this.usuario;
    }

    return null;
  }


  getToken() {
    if (this.token) {
      return this.token.replace(/\"/g,""); //regex para ignorar "" deixando o conteudo vazio
    }

    const tokenGuardado = localStorage.getItem('token');
    if (tokenGuardado) {
      this.token = tokenGuardado;
      return this.token;
    }

    return null;
  }

  estaLogado(): boolean {
    return this.getUsuario() && this.getToken() ? true : false;
  }

  logout() {
    this.token = '';
    localStorage.clear();
    this.router.navigate(['login']);
  }
}
