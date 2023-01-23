import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastrarLojaComponent } from './cadastrar-loja/cadastrar-loja.component';
import { DetalhesLojaComponent } from './detalhes-loja/detalhes-loja.component';
import { ListarLojasComponent } from './listar-lojas/listar-lojas.component';

const routes: Routes = [
  {
    path: '',
    component: ListarLojasComponent,
  },
  {
    path: 'nova-loja',
    component: CadastrarLojaComponent,
  },
  {
    path: ':id',
    component: DetalhesLojaComponent,
  },
  {
    path: ':id/editar',
    component: CadastrarLojaComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LojasRoutingModule { }
