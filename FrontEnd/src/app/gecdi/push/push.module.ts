import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule }   from '@angular/forms';

import { NbAutocompleteModule, NbButtonModule, NbCardModule, NbCheckboxModule, NbDatepickerModule, NbGlobalLogicalPosition, NbInputModule, NbSelectModule, NbToastrConfig, NbToastrModule, NbToggleModule, NbUserModule } from '@nebular/theme';

import { PushRoutingModule } from './push-routing.module';
import { PushComponent } from './push.component';
import { EnviosComponent } from './envios/envios/envios.component';
import { SolicitacoesComponent } from './solicitacoes/solicitacoes/solicitacoes.component';
import { SolicitacaoComponent } from './solicitacoes/solicitacao/solicitacao.component';
import { FilaComponent } from './fila/fila/fila.component';
import { NbMomentDateModule } from '@nebular/moment';
import { DetalheEnvioComponent } from './envios/detalhe-envio/detalhe-envio.component';
import { DialogEnvioComponent } from './envios/dialog-envio/dialog-envio.component';
import { DadosEnvioComponent } from './envios/dados-envio/dados-envio.component';
import { DetalhesSolicitacaoComponent } from './solicitacoes/detalhes-solicitacao/detalhes-solicitacao.component';
import { DialogSolicitacaoComponent } from './solicitacoes/dialog-solicitacao/dialog-solicitacao.component'

const configToastr: NbToastrConfig =  <NbToastrConfig> {
  duration: 1500,
  position: NbGlobalLogicalPosition.BOTTOM_END,
  destroyByClick: true,
  preventDuplicates: true,
  status: 'success'
}

@NgModule({
  declarations: [
    PushComponent,
    EnviosComponent,
    SolicitacoesComponent,
    SolicitacaoComponent,
    FilaComponent,
    DetalheEnvioComponent,
    DialogEnvioComponent,
    DadosEnvioComponent,
    DialogEnvioComponent,
    DetalhesSolicitacaoComponent,
    DialogSolicitacaoComponent,
  ],
  imports: [
    CommonModule,
    PushRoutingModule,

    NbMomentDateModule,

    NbCardModule,
    NbAutocompleteModule,
    NbSelectModule,
    NbInputModule,
    NbButtonModule,
    NbCheckboxModule,
    NbUserModule,
    NbToastrModule.forRoot(configToastr),

    NbDatepickerModule.forRoot(),
    NbToggleModule,

    FormsModule

  ],
  exports:[
    DialogEnvioComponent,
  ]
})
export class PushModule { }
