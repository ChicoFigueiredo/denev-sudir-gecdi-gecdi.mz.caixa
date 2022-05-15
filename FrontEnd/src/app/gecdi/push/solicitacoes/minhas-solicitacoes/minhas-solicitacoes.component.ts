import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { Observable } from 'rxjs';
import { Solicitacao } from '../../../services/push/classes/solicitacao';
import { PushService } from '../../../services/push/push.service';
import { User } from '../../../services/user/classes/User';
import { DialogSolicitacaoComponent } from '../dialog-solicitacao/dialog-solicitacao.component';


@Component({
  selector: 'ngx-minhas-solicitacoes',
  templateUrl: './minhas-solicitacoes.component.html',
  styleUrls: ['./minhas-solicitacoes.component.scss']
})
export class MinhasSolicitacoesComponent implements OnInit {

  //public solicitacao:Observable<Solicitacao>;
  public solicitacao:Solicitacao[];
  public solicitacaoAtual:Solicitacao;
  @ViewChild('diag') dialog: ElementRef<DialogSolicitacaoComponent>;

  public OrdemSolicitacoes:boolean = true;

  constructor(
    private pushService:PushService,
    private serviceSticker: NbToastrService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.refreshSolicitacoes(false);
  }


  checkRow(e:Solicitacao){
    if (e.cancelado)
      return 'row-orange'
    if (!e.autorizacao_Gestor_PUSH)
      return 'row-lavanda'
    if (e.finalizado)
      return 'row-green'
    return '';
  }


  rowClick(s){

  }

  novaSolicitacao(novo:boolean){
    this.solicitacaoAtual = new Solicitacao();
    (<any> this.dialog).openDialog();
  }

  refreshSolicitacoes(recontar:boolean=false){
    const usuario:User = <User> JSON.parse(localStorage.getItem("gecdi.user.data"));
    this.pushService
        .getSolicitacoes(recontar,usuario.lotacaoFisica,this.OrdemSolicitacoes ? "idDesc" : "priority")
        .subscribe((u:Solicitacao[]) => this.solicitacao = u);
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

  uploadFile(s:Solicitacao,$event){
    this.router.navigateByUrl(`/gecdi/push/minhas-solicitacoes/${s.idSolicitacao_PUSH}/upload`);
  }
}
