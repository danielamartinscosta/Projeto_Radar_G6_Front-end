import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { Product } from 'src/app/area-logada/products/product.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  API_URL = environment.API_URL;

  constructor(private http: HttpClient) { }
  
  pegarProduto(token:string){
    return this.http.get<Product[]>(`${this.API_URL}/produtos`, { headers: new HttpHeaders({authorization: `Bearer ${token}`})});
  }

  pegarProdutoId(idProduct: any, token:string){
    return this.http.get<Product>(`${this.API_URL}/produtos/${idProduct} `, { headers: new HttpHeaders({authorization: `Bearer ${token}`})});
  }

  cadastrarProduto(product:Product, token:string){
    return this.http.post<Product[]>(`${this.API_URL}/produtos`, product, { headers: new HttpHeaders({authorization: `Bearer ${token}`})});
  }

  alterarProduto(idProduct: any, product:Product, token:string){
    return this.http.put<Product>(`${this.API_URL}/produtos/${idProduct}`, product, { headers: new HttpHeaders({authorization: `Bearer ${token}`})});
  }

  apagarProduto(idProduct: any, token:string){
    return this.http.delete<Product[]>(`${this.API_URL}/produtos/${idProduct}`, { headers: new HttpHeaders({authorization: `Bearer ${token}`})});
    // return this.http.delete<Product[]>(`${this.API_URL}products/${idProduct}`);
  }

}
