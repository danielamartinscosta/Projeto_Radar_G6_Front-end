import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Pedido } from './pedidos.interface';

@Injectable({
  providedIn: 'root'
})
export class PedidosService {
  API_URL = environment.API_URL;

  constructor(private http: HttpClient) { }
  
  pegarPedido(token:string){
    return this.http.get<Pedido[]>(`${this.API_URL}/pedidos`, { headers: new HttpHeaders({authorization: `Bearer ${token}`})});
  }

  pegarPedidoId(idPedido: any, token:string){
    return this.http.get<Pedido>(`${this.API_URL}/pedidos/${idPedido} `, { headers: new HttpHeaders({authorization: `Bearer ${token}`})});
  }

  cadastrarPedido(pedido:Pedido, token:string){
    return this.http.post<Pedido[]>(`${this.API_URL}/pedidos`, pedido, { headers: new HttpHeaders({authorization: `Bearer ${token}`})});
  }

  alterarPedido(idPedido: any, pedido:Pedido, token:string){
    return this.http.put<Pedido>(`${this.API_URL}/pedidos/${idPedido}`, pedido, { headers: new HttpHeaders({authorization: `Bearer ${token}`})});
  }

  apagarPedido(idPedido: any, token:string){
    return this.http.delete<Pedido[]>(`${this.API_URL}/pedidos/${idPedido}`, { headers: new HttpHeaders({authorization: `Bearer ${token}`})});
    // return this.http.delete<Pedido[]>(`${this.API_URL}pedidos/${idPedido}`);
  }

}
