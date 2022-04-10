import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NbAuthComponent } from '@nebular/auth';
import { AuthComponent } from './auth/auth/auth.component';
import { SecurityComponent } from './security.component';

const routes: Routes = [{
  path: '',
  component: SecurityComponent,
  children: [
      {
        path: 'login',
        component: AuthComponent
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
    ]
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SecurityRoutingModule { }
