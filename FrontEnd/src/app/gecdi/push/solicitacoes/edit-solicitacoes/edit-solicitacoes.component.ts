import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import * as moment from 'moment';
import { Solicitacao } from '../../../services/push/classes/solicitacao';
import { PushService } from '../../../services/push/push.service';
import { DetalhesSolicitacaoComponent } from '../detalhes-solicitacao/detalhes-solicitacao.component';

@Component({
  selector: 'ngx-edit-solicitacoes',
  templateUrl: './edit-solicitacoes.component.html',
  styleUrls: ['./edit-solicitacoes.component.scss']
})
export class EditSolicitacoesComponent implements OnInit {

  idSolicitacao_PUSH:number = -1;
  solicitacao:Solicitacao=null;
  @ViewChild('detalhes') detalhes: TemplateRef<DetalhesSolicitacaoComponent> ;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private pushService: PushService,
    private serviceSticker: NbToastrService,
  ) {
    this.route.params.subscribe(params => {
      this.idSolicitacao_PUSH = <number>params.id;
      this.pushService.getSolicitacaoById(params.id)
                      .subscribe(sol => this.solicitacao = sol);
    })
  }

  ngOnInit(): void {
  }

  voltarSolicitacoes() {
    this.router.navigateByUrl("/gecdi/push/solicitacoes")
  }


  salvarSolicitacao(ref: any, btnSalvar:any) {
    const detal: any = this.detalhes; //.elementRef.nativeElement;
    detal.estaSalvando = true;
    btnSalvar.disabled = true;
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
      detal.estaSalvando = false;
    } else {

      let hi = moment(detal.formSolicitacao.controls.enviar_Horario_InicialFormatado.value._d);
      let hf = moment(detal.formSolicitacao.controls.enviar_Horario_FinalFormatado.value._d);

      detal.formSolicitacao.patchValue({
        wF_GECRM                        : detal.formSolicitacao.controls.wF_GECRM.value === "" ? null : detal.formSolicitacao.controls.wF_GECRM.value,
        Limite_Mensagens_Por_Dia        : detal.formSolicitacao.controls.Limite_Mensagens_Por_Dia.value === "" ? null : detal.formSolicitacao.controls.Limite_Mensagens_Por_Dia.value,
        limitacao_Tranche               : detal.formSolicitacao.controls.limitacao_Tranche.value === "" ? null : detal.formSolicitacao.controls.limitacao_Tranche.value,
        enviar_Horario_Inicial          : hi.format('HH:mm:ss'),
        enviar_Horario_Final            : hf.format('HH:mm:ss')
      })
      this.pushService.postNewSolicitacao(detal.formSolicitacao.value).subscribe((sol: Solicitacao) => {
        try {
          detal.formSolicitacao.patchValue(sol)
        } catch (e) {};
        this.serviceSticker.show(`Solicitação ID ${sol?.idSolicitacao_PUSH} salva!`, '', { status: 'success', duration: 10000 });
        detal.nomeSolicitacao.nativeElement.focus();
        btnSalvar.disabled = false;
        detal.estaSalvando = false;
      },(e) => {
        this.serviceSticker.show(`Gravação da solicitação retornou ERRO ${e.message}!`, '', { status: 'danger', duration: 10000 });
        detal.nomeSolicitacao.nativeElement.focus();
        btnSalvar.disabled = false;
        detal.estaSalvando = false;
      })
    }

  }

}
