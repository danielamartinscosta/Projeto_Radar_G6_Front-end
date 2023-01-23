// import { OrdersComponent } from './area-logada/orders/orders.component';
import { SharedModule } from './shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { DetalhesProdutoComponent } from './area-logada/products/detalhes-produto/detalhes-produto.component';
import { ListarProdutosComponent } from './area-logada/products/listar-produtos/listar-produtos.component';
import { NaoEncontradoComponent } from './nao-encontrado/nao-encontrado.component';
import { DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { registerLocaleData } from '@angular/common';
import ptBr from '@angular/common/locales/pt';
import { ListarClientesComponent } from './area-logada/clientes/listar-clientes/listar-clientes.component';
import { DetalhesClienteComponent } from './area-logada/clientes/detalhes-cliente/detalhes-cliente.component';
/*import { ListarPedidosComponent } from './area-logada/pedidos/listar-pedidos/listar-pedidos.component';
import { DetalhesPedidoComponent } from './area-logada/pedidos/detalhes-pedido/detalhes-pedido.component';*/
import { ListarLojasComponent } from './area-logada/lojas/listar-lojas/listar-lojas.component';
import { DetalhesLojaComponent } from './area-logada/lojas/detalhes-loja/detalhes-loja.component';
import { ListarCampanhasComponent } from './area-logada/campanhas/listar-campanhas/listar-campanhas.component';
import { DetalhesCampanhaComponent } from './area-logada/campanhas/detalhes-campanha/detalhes-campanha.component';



registerLocaleData(ptBr);

@NgModule({
  declarations: [
    AppComponent,
    NaoEncontradoComponent,
    ListarClientesComponent,
    DetalhesClienteComponent,
    DetalhesProdutoComponent,
    ListarProdutosComponent,
    /*ListarPedidosComponent,
    DetalhesPedidoComponent,*/
    ListarLojasComponent,
    DetalhesLojaComponent,
    ListarCampanhasComponent,
    DetalhesCampanhaComponent
  ],

  
  imports: [BrowserModule, AppRoutingModule, NgbModule, HttpClientModule, SharedModule],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt' },
    { provide: DEFAULT_CURRENCY_CODE, useValue: 'BRL' },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
