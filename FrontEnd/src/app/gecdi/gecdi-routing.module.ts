import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GecdiComponent } from './gecdi.component';
import { AuthGuard } from './security/guard/auth-guard.service';

const routes: Routes = [{
  path: '',
  component: GecdiComponent,
  children: [
      {
        path: 'dashboard',
        canActivate: [AuthGuard], //Chama a rotina de autenticação
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
      }, {
        path: 'push',
        loadChildren: () => import('./push/push.module').then(m => m.PushModule)
      }, {
        path: 'atendimento',
        loadChildren: () => import('./atendimento/atendimento.module').then(m => m.AtendimentoModule)
      }, {
        path: 'security',
        loadChildren: () => import('./security/security.module').then(m => m.SecurityModule)
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GecdiRoutingModule { }
