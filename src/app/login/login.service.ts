import { AuthService } from './../shared/services/auth/auth.service';
import { Injectable } from '@angular/core';
import { delay, mergeMap, of, tap, throwError, timer, Observable } from 'rxjs';
import { LoginResponse } from './login.interfaces';
import { Usuario } from '../shared/interfaces/usuario.iterfaces';
import { HttpClient  } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { IUser } from './IUser.Interface';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  API_URL = environment.API_URL;
  constructor(private authService: AuthService, private http: HttpClient ) {} 

  logar(user: IUser){
  
    return (this.http.post<IUser[]>(`${this.API_URL}/login`, user)).pipe(
      tap((response:any) => {
        
        this.authService.setUsuario({id : response.id, nome:response.nome, email:response.email,permissao:response.permissao});
        this.authService.setToken(response.token);
      })
    );  
  }
  


}

