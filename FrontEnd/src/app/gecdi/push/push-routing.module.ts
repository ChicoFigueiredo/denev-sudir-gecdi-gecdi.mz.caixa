import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../security/guard/auth-guard.service';
import { EnviosComponent } from './envios/envios/envios.component';
import { FilaComponent } from './fila/fila/fila.component';
import { PushComponent } from './push.component';
import { SolicitacaoComponent } from './solicitacoes/solicitacao/solicitacao.component';
import { SolicitacoesComponent } from './solicitacoes/solicitacoes/solicitacoes.component';

const routes: Routes = [{
        path: '',
        component: EnviosComponent,
        canActivate: [AuthGuard], //Chama a rotina de autenticação
    }, {
        path: 'envios',
        component: EnviosComponent
    }, {
        path: 'solicitacoes',
        component: SolicitacoesComponent
    }, {
        path: 'fila',
        component: FilaComponent
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
