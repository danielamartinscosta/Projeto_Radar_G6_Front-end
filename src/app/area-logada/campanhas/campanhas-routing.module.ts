import { DetalhesCampanhaComponent } from './detalhes-campanha/detalhes-campanha.component';
import { CadastrarCampanhaComponent } from './cadastrar-campanha/cadastrar-campanha.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListarCampanhasComponent } from './listar-campanhas/listar-campanhas.component';

const routes: Routes = [
 {
    path: '',
    component: ListarCampanhasComponent,
  },
  {
    path: 'nova-campanha',
    component: CadastrarCampanhaComponent,
  },
  {
    path: ':id',
    component: DetalhesCampanhaComponent,
  },
  {
    path: ':id/editar',
    component: CadastrarCampanhaComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CampanhasRoutingModule {}
