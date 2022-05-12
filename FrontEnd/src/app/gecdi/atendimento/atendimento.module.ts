import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule }   from '@angular/forms';
import { NbAutocompleteModule, NbButtonModule, NbCardModule, NbCheckboxModule, NbGlobalLogicalPosition, NbIconModule, NbInputModule, NbSelectModule, NbToastrConfig, NbToastrModule, NbUserModule } from '@nebular/theme';

import { AtendimentoRoutingModule } from './atendimento-routing.module';
import { AtendimentoComponent } from './atendimento.component';
import { DialogChamadoComponent } from './chamados/dialog-chamado/dialog-chamado.component';
import { DadosChamadoComponent } from './chamados/dados-chamado/dados-chamado.component';


const configToastr: NbToastrConfig =  <NbToastrConfig> {
  duration: 1500,
  position: NbGlobalLogicalPosition.BOTTOM_END,
  destroyByClick: true,
  preventDuplicates: true,
  status: 'success'
}

@NgModule({
  declarations: [
    AtendimentoComponent,
    DialogChamadoComponent,
    DadosChamadoComponent
  ],
  imports: [
    CommonModule,
    AtendimentoRoutingModule,
    FormsModule,

    NbCardModule,
    NbAutocompleteModule,
    NbSelectModule,
    NbInputModule,
    NbButtonModule,
    NbCheckboxModule,
    NbCheckboxModule,
    NbUserModule,
    NbToastrModule.forRoot(configToastr),
    NbIconModule,
  ],
  exports: [DialogChamadoComponent,DadosChamadoComponent]
})
export class AtendimentoModule { }
