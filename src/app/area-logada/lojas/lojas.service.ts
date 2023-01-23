import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Loja } from './lojas.interface';

@Injectable({
  providedIn: 'root'
})
export class LojasService {
  API_URL = environment.API_URL;

  constructor(private http: HttpClient) { }
  
  pegarLoja(token:string){
    return this.http.get<Loja[]>(`${this.API_URL}/lojas`, { headers: new HttpHeaders({authorization: `Bearer ${token}`})});
  }

  pegarLojaId(idLoja: any, token:string){
    return this.http.get<Loja>(`${this.API_URL}/lojas/${idLoja} `, { headers: new HttpHeaders({authorization: `Bearer ${token}`})});
  }

  cadastrarLoja(loja:Loja, token:string){
    return this.http.post<Loja[]>(`${this.API_URL}/lojas`, loja, { headers: new HttpHeaders({authorization: `Bearer ${token}`})});
  }

  alterarLoja(idLoja: any, loja:Loja, token:string){
    return this.http.put<Loja>(`${this.API_URL}/lojas/${idLoja}`, loja, { headers: new HttpHeaders({authorization: `Bearer ${token}`})});
  }

  apagarLoja(idLoja: string, token:string){
    return this.http.delete<Loja[]>(`${this.API_URL}/lojas/${idLoja}`, { headers: new HttpHeaders({authorization: `Bearer ${token}`})});
    // return this.http.delete<Loja[]>(`${this.API_URL}lojas/${idLoja}`);
  }

}
