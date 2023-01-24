import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { Produto } from 'src/app/area-logada/products/product.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  API_URL = environment.API_URL;

  constructor(private http: HttpClient) { }
  
  pegarProduto(token:string){
    return this.http.get<Produto[]>(`${this.API_URL}/produtos`, { headers: new HttpHeaders({authorization: `Bearer ${token}`})});
  }

  pegarProdutoId(idProduto: any, token:string){
    return this.http.get<Produto>(`${this.API_URL}/produtos/${idProduto} `, { headers: new HttpHeaders({authorization: `Bearer ${token}`})});
  }

  cadastrarProduto(produto:Produto, token:string){
    return this.http.post<Produto[]>(`${this.API_URL}/produtos`, produto, { headers: new HttpHeaders({authorization: `Bearer ${token}`})});
  }

  alterarProduto(idProduto: any, product:Produto, token:string){
    return this.http.put<Produto>(`${this.API_URL}/produtos/${idProduto}`, product, { headers: new HttpHeaders({authorization: `Bearer ${token}`})});
  }

  apagarProduto(idProduto: any, token:string){
    return this.http.delete<Produto[]>(`${this.API_URL}/produtos/${idProduto}`, { headers: new HttpHeaders({authorization: `Bearer ${token}`})});
    // return this.http.delete<Product[]>(`${this.API_URL}products/${idProduct}`);
  }

}
