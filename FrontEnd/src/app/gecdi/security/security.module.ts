import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NbAlertModule, NbButtonModule, NbCheckboxModule, NbInputModule } from '@nebular/theme';


import { SecurityRoutingModule } from './security-routing.module';
import { SecurityComponent } from './security.component';
import { AuthComponent } from './auth/auth/auth.component';
import { NbAuthModule } from '@nebular/auth';


@NgModule({
  declarations: [
    SecurityComponent,
    AuthComponent
  ],
  imports: [

    CommonModule,
    FormsModule,
    RouterModule,
    NbAlertModule,
    NbInputModule,
    NbButtonModule,
    NbCheckboxModule,

    SecurityRoutingModule,

    NbAuthModule,

  ],
})
export class SecurityModule { }
