import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { Product } from 'src/app/area-logada/products/product.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  API_URL = environment.API_URL;

  constructor(private http: HttpClient) { }
  
  pegarProduto(){
    return this.http.get<Product[]>(`${this.API_URL}/produtos`);
  }

  pegarProdutoId(idProduct: any){
    return this.http.get<Product>(`${this.API_URL}/produtos/${idProduct} `);
  }

  cadastrarProduto(product:Product){
    return this.http.post<Product[]>(`${this.API_URL}/produtos`, product);
  }

  alterarProduto(idProduct: any, product:Product){
    return this.http.put<Product>(`${this.API_URL}/produtos/${idProduct}`, product);
  }

  apagarProduto(idProduct: String){
    return this.http.delete<Product[]>(`${this.API_URL}/produtos/${idProduct}`);
    // return this.http.delete<Product[]>(`${this.API_URL}products/${idProduct}`);
  }

}
