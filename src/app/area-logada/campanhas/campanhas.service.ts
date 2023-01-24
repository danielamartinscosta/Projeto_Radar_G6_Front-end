import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Campanha } from './campanhas.interface';
import { Product } from '../products/product.interface';

@Injectable({
  providedIn: 'root'
})
export class CampanhasService {
  API_URL = environment.API_URL;

  constructor(private http: HttpClient) { }
  
  pegarCampanha(token:string){
    return this.http.get<Campanha[]>(`${this.API_URL}/campanha`, { headers: new HttpHeaders({authorization: `Bearer ${token}`})});
  }

  pegarCampanhaId(idCampanha: any, token:string){
    return this.http.get<Campanha>(`${this.API_URL}/campanha/${idCampanha} `, { headers: new HttpHeaders({authorization: `Bearer ${token}`})});
  }

  
  cadastrarCampanha(campanha:Campanha, token:string){
    return this.http.post<Campanha[]>(`${this.API_URL}/campanha`, campanha, { headers: new HttpHeaders({authorization: `Bearer ${token}`})});
  }

  alterarCampanha(idCampanha: any, campanha:Campanha, token:string){
    return this.http.put<Campanha>(`${this.API_URL}/campanha/${idCampanha}`, campanha, { headers: new HttpHeaders({authorization: `Bearer ${token}`})});
  }

  apagarCampanha(idCampanha: String, token:string){
    return this.http.delete<Campanha[]>(`${this.API_URL}/campanha/${idCampanha}`, { headers: new HttpHeaders({authorization: `Bearer ${token}`})});
    // return this.http.delete<Product[]>(`${this.API_URL}products/${idProduct}`);
  }


  /*getMyList(){
    this.httpClient.get<Product[]>(campanhas)
    .subscribe(list => {this.product = list;
    })
  }*/

}
