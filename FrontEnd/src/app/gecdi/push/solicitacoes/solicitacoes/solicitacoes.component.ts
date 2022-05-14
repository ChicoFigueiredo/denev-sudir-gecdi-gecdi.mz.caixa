import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { NbToastrService, NbDialogService, NbGlobalPhysicalPosition } from '@nebular/theme';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Solicitacao } from '../../../services/push/classes/solicitacao';
import { PushService } from '../../../services/push/push.service';
import { User } from '../../../services/user/classes/User';
import { UserService } from '../../../services/user/user.service';

@Component({
  selector: 'ngx-solicitacoes',
  templateUrl: './solicitacoes.component.html',
  styleUrls: ['./solicitacoes.component.scss']
})
export class SolicitacoesComponent implements OnInit {

  public solicitacao:Observable<Solicitacao>;
  public usuario:User;

  public OrdemSolicitacoes:boolean = false;

  constructor(
    private pushService:PushService,
    private serviceSticker: NbToastrService,
    private userService: UserService,
    private dialogService: NbDialogService,
    private router: Router,
  ) {
    this.userService.changeUser().subscribe(u => this.usuario=u );
  }

  get e_admin() { return this.usuario.user.role == 1 }

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

  refreshSolicitacoes(recontar:boolean=false, callback = null){
    this.solicitacao = this.pushService.getSolicitacoes(recontar,'-1',this.OrdemSolicitacoes ? "idDesc" : "priority").pipe(map((u,i) => {
      callback && callback();
      return u; }));
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

  solicitacaoASerExcluida:Solicitacao
  excluirSolicitacao(s:Solicitacao,dialog: TemplateRef<any>){
    this.solicitacaoASerExcluida = s;
    this.dialogService.open(dialog, { context : `Deseja excluir Solicitação ID ${s.idSolicitacao_PUSH} - ${s.nome_Solicitacao} ` });
  }

  deletarSolicitacao(dialog: TemplateRef<any>,ref:any,BotaoExcluir:any){
    BotaoExcluir.disabled = "disabled";
    this.pushService.deletarSolicitacao(this.solicitacaoASerExcluida).subscribe(s => {
      ref.close();
      this.refreshSolicitacoes(false, () =>
          this.serviceSticker.show(`Solicitação ID ${this.solicitacaoASerExcluida.idSolicitacao_PUSH} - ${this.solicitacaoASerExcluida.nome_Solicitacao} EXCLUIDO!`,'',{ status: 'success', duration: 5000 })
      );
    })
  }

  uploadFile(s:Solicitacao,$event){
    this.router.navigateByUrl(`/gecdi/push/minhas-solicitacoes/${s.idSolicitacao_PUSH}/upload`);
  }

}
