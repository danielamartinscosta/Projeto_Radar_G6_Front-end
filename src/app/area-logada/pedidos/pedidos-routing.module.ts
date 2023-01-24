
import { ListarPedidosComponent } from './listar-pedidos/listar-pedidos.component';
import { CadastrarPedidoComponent } from './cadastrar-pedido/cadastrar-pedido.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetalhesPedidoComponent } from './detalhes-pedido/detalhes-produto.component';


const routes: Routes = [
  {
    path: '',
    component: ListarPedidosComponent,
  },
  {
    path: 'new-pedido',
    component: CadastrarPedidoComponent,
  },
  {
    path: ':id',
    component: DetalhesPedidoComponent,
  },
  {
    path: ':id/editar',
    component: CadastrarPedidoComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PedidosRoutingModule { }
