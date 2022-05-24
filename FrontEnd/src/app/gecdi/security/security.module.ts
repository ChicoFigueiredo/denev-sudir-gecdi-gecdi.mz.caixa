import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NbAlertModule, NbAutocompleteModule, NbButtonModule, NbCardModule, NbCheckboxModule, NbFormFieldModule, NbIconModule, NbInputModule, NbLayoutModule, NbSelectModule } from '@nebular/theme';


import { SecurityRoutingModule } from './security-routing.module';
import { SecurityComponent } from './security.component';
import { AuthComponent } from './auth/auth/auth.component';
import { NbAuthModule } from '@nebular/auth';
import { CadastroUsuariosComponent } from './cadastro-usuarios/cadastro-usuarios.component';
import { LogoffComponent } from './auth/logoff/logoff.component';


@NgModule({
  declarations: [
    SecurityComponent,
    CadastroUsuariosComponent,
    AuthComponent,
    LogoffComponent
  ],
  imports: [

    CommonModule,
    FormsModule,
    RouterModule,
    NbAlertModule,
    NbInputModule,
    NbButtonModule,
    NbCheckboxModule,
    NbCardModule,
    NbLayoutModule,
    NbSelectModule,

    SecurityRoutingModule,

    NbAuthModule,

    NbIconModule,
    NbFormFieldModule,
    NbAutocompleteModule,

  ],
})
export class SecurityModule { }
