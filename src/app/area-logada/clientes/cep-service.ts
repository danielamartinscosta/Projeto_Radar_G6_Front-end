import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class CepService {

    constructor(private httpClient: HttpClient) { }

 /*   buscarEnderecoPorCep(cep: string) {
        return this.httpClient.get(`https://viacep.com.br/ws${cep}/json/`).subscribe(cep => this.buscarEnderecoPorCep(cep: string));
    }*/
}