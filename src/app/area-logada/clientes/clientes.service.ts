import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Cliente } from './clientes.interface';

@Injectable({
  providedIn: 'root',
})
export class ClientesService {
  API_URL = environment.API_URL;

  constructor(private http: HttpClient) {}

  
  getClientes(token:string) {
    return this.http.get<Cliente[]>(`${this.API_URL}/clientes`, { headers: new HttpHeaders({authorization: `Bearer ${token}`})})
  };
  

  getClientePorId(idCliente: any, token:string ) {
    return this.http.get<Cliente>(`${this.API_URL}/clientes/${idCliente}`, { headers: new HttpHeaders({authorization: `Bearer ${token}`})});
  }

  criarCliente(cliente: Cliente, token:string) {
    return this.http.post<Cliente[]>(`${this.API_URL}/clientes`, cliente, { headers: new HttpHeaders({authorization: `Bearer ${token}`})});
  }

  attCliente(idCliente: any, cliente: Cliente, token:string) {
    debugger
    return this.http.put<Cliente>(`${this.API_URL}/clientes/${idCliente}`, cliente, { headers: new HttpHeaders({authorization: `Bearer ${token}`})});
  }

  apagarCliente(idCliente: any, token:string) {
    return this.http.delete<Cliente[]>(`${this.API_URL}/clientes/${idCliente}`, { headers: new HttpHeaders({authorization: `Bearer ${token}`})});
  }

}

