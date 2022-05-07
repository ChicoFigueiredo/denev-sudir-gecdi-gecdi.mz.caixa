import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../security/guard/auth-guard.service';
import { EnviosComponent } from './envios/envios/envios.component';
import { FilaComponent } from './fila/fila/fila.component';
import { PushComponent } from './push.component';
import { WhatsappComponent } from './resumo/whatsapp/whatsapp.component';
import { MinhasSolicitacoesComponent } from './solicitacoes/minhas-solicitacoes/minhas-solicitacoes.component';
import { SolicitacoesComponent } from './solicitacoes/solicitacoes/solicitacoes.component';

const routes: Routes = [{
    path: '',
    component: EnviosComponent,
    canActivate: [AuthGuard], //Chama a rotina de autenticação
  }, {
    path: 'envios',
    component: EnviosComponent,
    canActivate: [AuthGuard], //Chama a rotina de autenticação
  }, {
    path: 'solicitacoes',
    component: SolicitacoesComponent,
    canActivate: [AuthGuard], //Chama a rotina de autenticação
  }, {
    path: 'minhas-solicitacoes',
    component: MinhasSolicitacoesComponent,
    canActivate: [AuthGuard], //Chama a rotina de autenticação
  }, {
    path: 'fila',
    component: FilaComponent,
    canActivate: [AuthGuard], //Chama a rotina de autenticação
  }, {
    path: 'resumo-whatsapp',
    component: WhatsappComponent,
    canActivate: [AuthGuard], //Chama a rotina de autenticação
  },
  {
    path: '',
    redirectTo: 'envios',
    pathMatch: 'full',
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PushRoutingModule { }
