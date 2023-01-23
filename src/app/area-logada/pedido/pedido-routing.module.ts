import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastrarPedidoComponent } from './cadastrar-pedido/cadastrar-pedido.component';

const routes: Routes = [
  {
    path: '',
    component: CadastrarPedidoComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PedidoRoutingModule { }
