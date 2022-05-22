import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule }   from '@angular/forms';

import { NbAutocompleteModule, NbButtonModule, NbCardModule, NbCheckboxModule, NbDatepickerModule, NbFormFieldModule, NbGlobalLogicalPosition, NbIconModule, NbInputModule, NbSelectModule, NbTabsetModule, NbTimepickerModule, NbToastrConfig, NbToastrModule, NbToggleModule, NbTooltipModule, NbUserModule } from '@nebular/theme';

import { PushRoutingModule } from './push-routing.module';
import { PushComponent } from './push.component';
import { EnviosComponent } from './envios/envios/envios.component';
import { SolicitacoesComponent } from './solicitacoes/solicitacoes/solicitacoes.component';
import { MinhasSolicitacoesComponent } from './solicitacoes/minhas-solicitacoes/minhas-solicitacoes.component';
import { FilaComponent } from './fila/fila/fila.component';
import { NbMomentDateModule } from '@nebular/moment';
import { DetalheEnvioComponent } from './envios/detalhe-envio/detalhe-envio.component';
import { DialogEnvioComponent } from './envios/dialog-envio/dialog-envio.component';
import { DadosEnvioComponent } from './envios/dados-envio/dados-envio.component';
import { DetalhesSolicitacaoComponent } from './solicitacoes/detalhes-solicitacao/detalhes-solicitacao.component';
import { DialogSolicitacaoComponent } from './solicitacoes/dialog-solicitacao/dialog-solicitacao.component';
import { WhatsappComponent } from './resumo/whatsapp/whatsapp.component'
import { PickerModule } from '@ctrl/ngx-emoji-mart';
import { ManutencaoCurvasComponent } from './curvas/manutencao-curvas/manutencao-curvas.component';
import { UploadArquivoComponent } from './solicitacoes/upload-arquivo/upload-arquivo.component';

import { AngularFileUploaderModule } from "angular-file-uploader";
import { ControleProcessamentoUploadArquivoComponent } from './solicitacoes/controle-processamento-upload-arquivo/controle-processamento-upload-arquivo.component';
import { ResumoComponent } from './resumo/resumo/resumo.component';
import { EditSolicitacoesComponent } from './solicitacoes/edit-solicitacoes/edit-solicitacoes.component';

const configToastr: NbToastrConfig =  <NbToastrConfig> {
  duration: 1500,
  position: NbGlobalLogicalPosition.TOP_END,
  destroyByClick: true,
  preventDuplicates: true,
  status: 'success'
}

@NgModule({
  declarations: [
    PushComponent,
    EnviosComponent,
    SolicitacoesComponent,
    MinhasSolicitacoesComponent,
    FilaComponent,
    DetalheEnvioComponent,
    DialogEnvioComponent,
    DadosEnvioComponent,
    DialogEnvioComponent,
    DetalhesSolicitacaoComponent,
    DialogSolicitacaoComponent,
    WhatsappComponent,
    ManutencaoCurvasComponent,
    UploadArquivoComponent,
    ControleProcessamentoUploadArquivoComponent,
    ResumoComponent,
    EditSolicitacoesComponent,
  ],
  imports: [
    CommonModule,
    PushRoutingModule,
    PickerModule,


    NbCardModule,
    NbAutocompleteModule,
    NbSelectModule,
    NbInputModule,
    NbButtonModule,
    NbCheckboxModule,
    NbUserModule,
    NbFormFieldModule,
    NbToastrModule,

    NbDatepickerModule,
    NbTimepickerModule,
    NbMomentDateModule,

    NbToggleModule,

    NbIconModule,

    FormsModule,
    ReactiveFormsModule,
    AngularFileUploaderModule,

    NbTabsetModule,
    NbTooltipModule,

  ],
  exports:[
    DialogEnvioComponent,
  ]
})
export class PushModule { }
