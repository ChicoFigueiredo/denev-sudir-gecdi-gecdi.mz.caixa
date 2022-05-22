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

  //public solicitacao:Observable<Solicitacao>;
  public solicitacao:Solicitacao[];
  public usuario:User;
  public listPrioridades:number[] = Array.from({ length: 255 }, (_, i) => i);

  public OrdemSolicitacoes:boolean = false;
  public SoFila:boolean = true;
  public AlteraPrioridade:boolean = false;

  constructor(
    public pushService:PushService,
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


  rowClick(s:Solicitacao){
    this.router.navigateByUrl(`/gecdi/push/solicitacao/${s.idSolicitacao_PUSH}/edit`)
  }

  refreshSolicitacoes(recontar:boolean=false, callback = null){
    this.pushService.getSolicitacoes(recontar,'-1',this.OrdemSolicitacoes ? "idDesc" : "priority",this.SoFila)
        .subscribe((s:Solicitacao[]) =>{
          this.solicitacao = s;
          callback && callback();
        });
  }


  changeCheckCancelado(s:Solicitacao,$event){
    this.pushService.setSolicitacaoCancelado(s.idSolicitacao_PUSH,!s.cancelado).subscribe((e:Solicitacao) => {
      if(e.cancelado == !s.cancelado){
        s.cancelado = e.cancelado;
        s = e;
        this.serviceSticker.show(`Envio ID ${e?.idSolicitacao_PUSH} marcado como ${e?.cancelado?'CANCELADO':'NÃO CANCELADO'}`,'',{ status: 'success' })
      } else {
        this.serviceSticker.show(`Envio ID ${e?.idSolicitacao_PUSH} com erro na marcação de cancelamento`,'',{ status: 'danger', duration: 10000 })
      }
    })
  }


  changeCheckAutorizado(sol:Solicitacao,$event){
    this.pushService.setSolicitacaoAutorizado(sol.idSolicitacao_PUSH,!sol.autorizacao_Gestor_PUSH).subscribe((e:Solicitacao) => {
      if(e.autorizacao_Gestor_PUSH == !sol.autorizacao_Gestor_PUSH){
        sol.autorizacao_Gestor_PUSH = e.autorizacao_Gestor_PUSH;
        sol = e;
        this.serviceSticker.show(`Envio ID ${e?.idSolicitacao_PUSH} marcado como ${e?.autorizacao_Gestor_PUSH?'AUTORIZADO':'NÃO AUTORIZADO'}`,'',{ status: 'success' })
      } else {
        this.serviceSticker.show(`Envio ID ${e?.idSolicitacao_PUSH} com erro na marcação de autorização do gestor`,'',{ status: 'danger', duration: 10000 })
      }
    },(e) => {
      this.serviceSticker.show(`ERRO! Solicitação ID ${sol.idSolicitacao_PUSH} retornou erro ${e.message}`,'',{ status: 'danger', duration: 10000 })
     })
  }

  solicitacaoASerExcluida:Solicitacao
  excluirSolicitacao(sol:Solicitacao,dialog: TemplateRef<any>){
    this.solicitacaoASerExcluida = sol;
    this.dialogService.open(dialog, { context : `Deseja excluir Solicitação ID ${sol.idSolicitacao_PUSH} - ${sol.nome_Solicitacao} ` });
  }

  deletarSolicitacao(dialog: TemplateRef<any>,ref:any,BotaoExcluir:any){
    BotaoExcluir.disabled = true;
    this.pushService.deletarSolicitacao(this.solicitacaoASerExcluida).subscribe(s => {
      ref.close();
      this.refreshSolicitacoes(false, () => {
          this.serviceSticker.show(`Solicitação ID ${this.solicitacaoASerExcluida.idSolicitacao_PUSH} - ${this.solicitacaoASerExcluida.nome_Solicitacao} EXCLUIDO!`,'',{ status: 'success', duration: 10000 })
          BotaoExcluir.disabled = true;
      });
    },(e) => {
        this.serviceSticker.show(`ERRO! Solicitação ID ${this.solicitacaoASerExcluida.idSolicitacao_PUSH} retornou erro ${e.message}`,'',{ status: 'danger', duration: 10000 })
        BotaoExcluir.disabled = false;
     })
  }

  alteraPrioridade(sol:Solicitacao,$event) {
     this.pushService.setPrioridadeSolicitacao(sol,$event).subscribe((s:Solicitacao) => {
        sol = s;
        if (this.OrdemSolicitacoes)
            this.solicitacao = this.solicitacao.sort((a,b) => b.idSolicitacao_PUSH-a.idSolicitacao_PUSH);
        else
            this.solicitacao = this.solicitacao.sort((a,b) => (a.prioridade-b.prioridade)*1000000000 + (b.quantidade_Total - a.quantidade_Total));
        this.serviceSticker.show(`Solicitação ID ${s.idSolicitacao_PUSH} setado com prioridade ${s.prioridade}`,'',{ status: 'success', duration: 10000 })
     },(e) => {
        this.serviceSticker.show(`ERRO! Solicitação ID ${sol.idSolicitacao_PUSH} retornou erro ${e.message} ao setar a prioridade`,'',{ status: 'danger', duration: 10000 })
     })
  }


  alteraCurva(sol:Solicitacao,$event) {
     this.pushService.setCurvaSolicitacao(sol,$event).subscribe((s:Solicitacao) => {
        this.serviceSticker.show(`Solicitação ID ${s.idSolicitacao_PUSH} setado com a curva ${s.idCurva} - ${ this.pushService.Curvas.filter(x => x.idCurva_Envio==$event)[0].nome_Curva_Envio }`,'',{ status: 'success', duration: 10000 })
     },(e) => {
        this.serviceSticker.show(`ERRO! Solicitação ID ${sol.idSolicitacao_PUSH} retornou erro ${e.message} ao setar a curva`,'',{ status: 'danger', duration: 10000 })
     })
  }



  uploadFile(s:Solicitacao,$event){
    this.router.navigateByUrl(`/gecdi/push/minhas-solicitacoes/${s.idSolicitacao_PUSH}/upload`);
  }

  geraTooltip(Sol:Solicitacao) {
    return `Processado em ${Sol?.solicitacao_Upload[0].data_Processamento}\n
Arquivo: ${Sol?.solicitacao_Upload[0].arquivo}\n
Tempo de Processamento: ${Sol?.solicitacao_Upload[0].tempo_Decorrido}\n
Histórico: ${Sol?.solicitacao_Upload[0].resultado_Processamento}`
  }

}
