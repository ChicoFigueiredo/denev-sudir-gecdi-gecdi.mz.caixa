import { Component, OnInit } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { Observable } from 'rxjs';
import { Solicitacao } from '../../../services/push/classes/solicitacao';
import { PushService } from '../../../services/push/push.service';

@Component({
  selector: 'ngx-solicitacoes',
  templateUrl: './solicitacoes.component.html',
  styleUrls: ['./solicitacoes.component.scss']
})
export class SolicitacoesComponent implements OnInit {

  public solicitacao:Observable<Solicitacao>;

  constructor(
    private pushService:PushService,
    private serviceSticker: NbToastrService,
  ) { }

  ngOnInit(): void {
    this.refreshSolicitacoes(false);
  }


  checkRow(e:Solicitacao){
    if (e.cancelado)
      return 'row-orange'
    if (!e.autorizacao_Gestor_PUSH)
      return 'row-orange'
    if (e.finalizado)
      return 'row-green'
    return '';
  }


  rowClick(s){

  }

  refreshSolicitacoes(recontar:boolean=false){
    this.solicitacao = this.pushService.getSolicitacoes(recontar);
  }


  changeCheckCancelado(s:Solicitacao,$event){
    this.pushService.setSolicitacaoCancelado(s.idSolicitacao_PUSH,!s.cancelado).subscribe((e:Solicitacao) => {
      if(e.cancelado == !s.cancelado){
        s.cancelado = e.cancelado;
        s = e;
        this.serviceSticker.show(`Envio ID ${e?.idSolicitacao_PUSH} marcado como ${e?.cancelado?'CANCELADO':'NÃO CANCELADO'}`,'',{ status: 'success' })
      } else {
        this.serviceSticker.show(`Envio ID ${e?.idSolicitacao_PUSH} com erro na marcação de cancelamento`,'',{ status: 'danger', duration: 5000 })
      }
    })
  }


  changeCheckAutorizado(s:Solicitacao,$event){
    this.pushService.setSolicitacaoAutorizado(s.idSolicitacao_PUSH,!s.autorizacao_Gestor_PUSH).subscribe((e:Solicitacao) => {
      if(e.autorizacao_Gestor_PUSH == !s.autorizacao_Gestor_PUSH){
        s.autorizacao_Gestor_PUSH = e.autorizacao_Gestor_PUSH;
        s = e;
        this.serviceSticker.show(`Envio ID ${e?.idSolicitacao_PUSH} marcado como ${e?.autorizacao_Gestor_PUSH?'AUTORIZADO':'NÃO AUTORIZADO'}`,'',{ status: 'success' })
      } else {
        this.serviceSticker.show(`Envio ID ${e?.idSolicitacao_PUSH} com erro na marcação de autorização do gestor`,'',{ status: 'danger', duration: 5000 })
      }
    })
  }

}
