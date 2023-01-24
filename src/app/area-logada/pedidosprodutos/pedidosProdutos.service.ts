import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PedidoProduto } from './pedidosProdutos.interface';

@Injectable({
  providedIn: 'root'
})
export class PedidosProdutosService {
  API_URL = environment.API_URL;

  constructor(private http: HttpClient) { }
  
  pegarPedidoProduto(token:string){
    return this.http.get<PedidoProduto[]>(`${this.API_URL}/pedidosProdutos`, { headers: new HttpHeaders({authorization: `Bearer ${token}`})});
  }

  pegarPedidoProdutoId(idPedidoProduto: any, token:string){
    return this.http.get<PedidoProduto>(`${this.API_URL}/pedidosProdutos/${idPedidoProduto} `, { headers: new HttpHeaders({authorization: `Bearer ${token}`})});
  }

  cadastrarPedidoProduto(pedidoProduto:PedidoProduto, token:string){
    debugger
    return this.http.post<PedidoProduto[]>(`${this.API_URL}/pedidosProdutos`, pedidoProduto, { headers: new HttpHeaders({authorization: `Bearer ${token}`})});
  }

  alterarPedidoProduto(idPedidoProduto: any, pedidoProduto:PedidoProduto, token:string){
    return this.http.put<PedidoProduto>(`${this.API_URL}/pedidosProdutos/${idPedidoProduto}`, pedidoProduto, { headers: new HttpHeaders({authorization: `Bearer ${token}`})});
  }

  apagarPedidoProduto(idPedidoProduto: any, token:string){
    return this.http.delete<PedidoProduto[]>(`${this.API_URL}/pedidosProdutos/${idPedidoProduto}`, { headers: new HttpHeaders({authorization: `Bearer ${token}`})});
    // return this.http.delete<Pedido[]>(`${this.API_URL}pedidos/${idPedido}`);
  }

}
