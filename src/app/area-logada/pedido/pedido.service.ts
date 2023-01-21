import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Pedido } from './pedido.interface';


@Injectable({
  providedIn: 'root'
})
export class PedidosService {
  API_URL = environment.API_URL;

  constructor(private http: HttpClient) { }
  
  pegarPedido(){
    return this.http.get<Pedido[]>(`${this.API_URL}/pedidos`);
  }

  pegarPedidoId(idPedido: number){
    return this.http.get<Pedido>(`${this.API_URL}/pedidos/${idPedido} `);
  }

  cadastrarPedido(pedido:Pedido){
    return this.http.post<Pedido[]>(`${this.API_URL}/pedidos`, pedido);
  }

  alterarPedido(idPedido: number, pedido:Pedido){
    return this.http.put<Pedido>(`${this.API_URL}/pedidos/${idPedido}`, pedido);
  }

  apagarPedido(idPedido: number){
    return this.http.delete<Pedido[]>(`${this.API_URL}/pedidos/${idPedido}`);
    // return this.http.delete<Product[]>(`${this.API_URL}products/${idProduct}`);
  }

}