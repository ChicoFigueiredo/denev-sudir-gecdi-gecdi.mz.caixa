import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  TemplateRef,
  ViewChild
} from '@angular/core';
import {
  NbDialogService,
  NbToastrService
} from '@nebular/theme';
import * as moment from 'moment';
import {
  Solicitacao
} from '../../../services/push/classes/solicitacao';
import {
  PushService
} from '../../../services/push/push.service';
import {
  DetalhesSolicitacaoComponent
} from '../detalhes-solicitacao/detalhes-solicitacao.component';

@Component({
  selector: 'ngx-dialog-solicitacao',
  templateUrl: './dialog-solicitacao.component.html',
  styleUrls: ['./dialog-solicitacao.component.scss']
})
export class DialogSolicitacaoComponent implements OnInit {

  @Input('solicitacao') public solicitacao: Solicitacao;
  @Output('onadd') onadd: EventEmitter < any > = new EventEmitter();
  @ViewChild('dialog') dialog: TemplateRef < any > ;
  @ViewChild('detalhes') detalhes: TemplateRef < DetalhesSolicitacaoComponent > ;


  constructor(
    private dialogService: NbDialogService,
    private pushService: PushService,
    private serviceSticker: NbToastrService,
  ) {}

  ngOnInit(): void {}


  public openDialog() {
    this.dialogService.open(this.dialog, {
      hasScroll: true,
      dialogClass: 'dialog-class'
    });
  }

  salvarSolicitacao(ref: any, btnSalvar:any) {
    btnSalvar.disabled = true;
    const detal: any = this.detalhes; //.elementRef.nativeElement;
    detal.formSolicitacao.markAllAsTouched();
    console.log(detal.formSolicitacao.value)
    console.log(detal.formSolicitacao)
    let errosDados: boolean = false;
    let erros:number = 0;

    // checando os erros, e ignorando as validações do date picker (por hora)
    Object.keys(detal.formSolicitacao.controls).forEach(key => {
      const controlErrors = detal.formSolicitacao.get(key).errors;
      if (controlErrors != null) {
        Object.keys(controlErrors).forEach(keyError => {
          //console.log('Key control: ' + key + ', keyError: ' + keyError + ', err value: ', controlErrors[keyError]);
          if (!(/nbDatepicker/.test(keyError) || /nbTimepicker/.test(keyError))) {
            errosDados = true;
            console.log(controlErrors[keyError]);
            erros++;
          }
        });
      }
    });

    if (errosDados) {
      alert(`Existem ${erros} erros de validação que impedem o cadastramento. Corrija os campos marcados em vermelho e tente novamente.`);
      btnSalvar.disabled = false;
    } else {
      const hi = detal.formSolicitacao.controls.enviar_Horario_InicialFormatado;
      const hf = detal.formSolicitacao.controls.enviar_Horario_FinalFormatado;

      const his = hi.value._isAMomentObject ? hi.value.format('HH:mm') : `${hi.value}`;
      const hfs = hf.value._isAMomentObject ? hf.value.format('HH:mm') : `${hf.value}`;

      detal.formSolicitacao.controls.enviar_Horario_InicialFormatado.value = his;
      detal.formSolicitacao.controls.enviar_Horario_FinalFormatado.value = hfs;

      const di = moment(detal.formSolicitacao.controls.enviar_a_partir_de.value).format("YYYY-MM-DD");
      const df = moment(detal.formSolicitacao.controls.enviar_no_maximo_ate.value).format("YYYY-MM-DD");

      detal.formSolicitacao.controls.enviar_a_partir_de.value = di;
      detal.formSolicitacao.controls.enviar_no_maximo_ate.value = df;

      detal.formSolicitacao.patchValue({
        wF_GECRM                        : detal.formSolicitacao.controls.wF_GECRM.value === "" ? null : detal.formSolicitacao.controls.wF_GECRM.value,
        Limite_Mensagens_Por_Dia        : detal.formSolicitacao.controls.Limite_Mensagens_Por_Dia.value === "" ? null : detal.formSolicitacao.controls.Limite_Mensagens_Por_Dia.value,
        limitacao_Tranche               : detal.formSolicitacao.controls.limitacao_Tranche.value === "" ? null : detal.formSolicitacao.controls.limitacao_Tranche.value,
      })
      this.pushService.postNewSolicitacao(detal.formSolicitacao.value).subscribe((sol: Solicitacao) => {
        try {
          detal.formSolicitacao.patchValue(sol)
        } catch (e) {};
        ref.close();
        this.serviceSticker.show(`Nova Solicitação Criada - ID ${sol?.idSolicitacao_PUSH} aguardar autorização da GECDI`, '', {
          status: 'success',
          duration: 15000
        })
        this.onadd.emit();
      })
    }

  }

}
