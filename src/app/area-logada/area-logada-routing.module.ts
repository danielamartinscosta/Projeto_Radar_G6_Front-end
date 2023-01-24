import { AreaLogadaComponent } from './area-logada.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: '',
    component: AreaLogadaComponent,
    children: [
      {
        path: 'home',
        loadChildren: () =>
          import('./home/home.module').then((m) => m.HomeModule),
      },
      {
        path: 'clientes',
        loadChildren: () =>
          import('./clientes/clientes.module').then(
            (m) => m.ClientesModule
          ),
      },
      {
        path: 'products',
        loadChildren: () =>
          import('./products/products.module').then(
            (m) => m.ProductsModule
          ),
      },
      {
        path: 'fluxo-de-caixa',
        loadChildren: () =>
          import('./fluxo-de-caixa/fluxo-de-caixa.module').then(
            (m) => m.FluxoDeCaixaModule
          ),
      },
      {
        path: 'pedidos',
        loadChildren: () =>
          import('./pedidos/pedidos.module').then(
            (m) => m.PedidosModule
          )
      },
      {
        path: 'pedidosProdutos',
        loadChildren: () =>
          import('./pedidosprodutos/pedidosProdutos.module').then(
            (m) => m.PedidosProdutosModule
          )
      },
      {
        path: 'campanhas',
        loadChildren: () =>
          import('./campanhas/campanhas.module').then(
            (m) => m.CampanhasModule
          )
      },
      {
        path: 'lojas',
        loadChildren: () =>
          import('./lojas/lojas.module').then(
            (m) => m.LojasModule
          )
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AreaLogadaRoutingModule {}
