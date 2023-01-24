
import { ListarPedidosProdutosComponent } from './listar-pedidosProdutos/listar-pedidosProdutos.component';
import { CadastrarPedidoProdutoComponent } from './cadastrar-pedidoProduto/cadastrar-pedidoProduto.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetalhesPedidoProdutoComponent } from './detalhes-pedidoProduto/detalhes-pedidoProduto.component';


const routes: Routes = [
  {
    path: '',
    component: ListarPedidosProdutosComponent,
  },
  {
    path: 'novo-pedidoProduto',
    component: CadastrarPedidoProdutoComponent,
  },
  {
    path: ':id',
    component: DetalhesPedidoProdutoComponent,
  },
  {
    path: ':id/editar',
    component: CadastrarPedidoProdutoComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PedidosProdutosRoutingModule { }
