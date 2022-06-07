import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { NbToastrService, NbDialogService, NbGlobalPhysicalPosition } from '@nebular/theme';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../../../environments/environment';
import { Solicitacao } from '../../../services/push/classes/solicitacao';
import { PushService } from '../../../services/push/push.service';
import { Unidade } from '../../../services/unidades/classes/unidades';
import { UnidadesService } from '../../../services/unidades/unidades.service';
import { User } from '../../../services/user/classes/User';
import { UserListRequest } from '../../../services/user/classes/user-request';
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
  public listLimits:number[] = [25,50,75,100,200,500,1000,-1];
  public limitRegistros:number = 100;

  public dataDe: Date = moment().add(-90,'day').startOf('day').toDate();
  public dataAte: Date = moment().add(90,'day').startOf('day').toDate();
  public ElegiveisDia: Date = null;

  public cgcSol: number = null;
  listCGC$:Unidade[];
  public idSol: number = null;

  public matriculaSol:string = null;
  listMatriculas$:UserListRequest[];

  public OrdemSolicitacoes:boolean = false;
  public SoFila:boolean = true;
  public AlteraPrioridade:boolean = false;

  constructor(
    public pushService:PushService,
    private serviceSticker: NbToastrService,
    private userService: UserService,
    private dialogService: NbDialogService,
    private router: Router,
    private unidadeService: UnidadesService,
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


  quantidade_Total_Sum:number = 0;
  quantidade_Total_Autorizado_Sum:number = 0;
  quantidade_Enviada_Sum:number = 0;
  quantidade_Agendada_Sum:number = 0;
  quantidade_Agendada_Autorizado_Sum:number = 0;
  quantidade_Solicitacoes:number = 0;
  quantidade_Solicitacoes_Autorizadas:number = 0;
  refreshSolicitacoes(recontar:boolean=false, callback = null, cgc = null, matr = null, idSol = null, ElegiveisDia=null){
    this.cgcSol = cgc;
    this.matriculaSol = matr;
    this.idSol = idSol;
    this.ElegiveisDia = ElegiveisDia
    ElegiveisDia = ElegiveisDia ? moment(this.ElegiveisDia).format('YYYY-MM-DD') : null;
    this.pushService.getSolicitacoes(recontar,this.cgcSol && this.cgcSol > 0 ? `${this.cgcSol}` : '-1' ,this.OrdemSolicitacoes ? "idDesc" : "priority",this.SoFila,this.limitRegistros,moment(this.dataDe).format('YYYY-MM-DD'),moment(this.dataAte).format('YYYY-MM-DD'),this.matriculaSol,this.idSol,ElegiveisDia)
        .subscribe((s:Solicitacao[]) =>{
          this.solicitacao = s;
          this.quantidade_Total_Sum = s.map(q => q.quantidade_Total).reduce((ant,cur,i) => ant + cur);
          this.quantidade_Total_Autorizado_Sum = s.map(q => q.autorizacao_Gestor_PUSH ? q.quantidade_Total : 0).reduce((ant,cur,i) => ant + cur);
          this.quantidade_Enviada_Sum = s.map(q => q.quantidade_Enviada).reduce((ant,cur,i) => ant + cur);
          this.quantidade_Agendada_Sum = s.map(q => q.quantidade_Agendada).reduce((ant,cur,i) => ant + cur);
          this.quantidade_Agendada_Autorizado_Sum = s.map(q => q.autorizacao_Gestor_PUSH ? q.quantidade_Agendada : 0).reduce((ant,cur,i) => ant + cur);
          this.quantidade_Solicitacoes = s.length;
          this.quantidade_Solicitacoes_Autorizadas = s.map(q => <number>(q.autorizacao_Gestor_PUSH ? 1 : 0)).reduce((ant,cur,i) => ant + cur);
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

  viewClients(s:Solicitacao,$event){
    this.router.navigateByUrl(`/gecdi/push/solicitacao/${s.idSolicitacao_PUSH}/clients`);
  }

  geraTooltip(Sol:Solicitacao) {
    return `Processado em ${Sol?.solicitacao_Upload[0].data_Processamento}\n
Arquivo: ${Sol?.solicitacao_Upload[0].arquivo}\n
Tempo de Processamento: ${Sol?.solicitacao_Upload[0].tempo_Decorrido}\n
Histórico: ${Sol?.solicitacao_Upload[0].resultado_Processamento}`
  }

  waitCGC:any
  findCGC(t){
    this.waitCGC && clearTimeout(this.waitCGC);
    if (t.length>=3)
      this.waitCGC = setTimeout(() => this.unidadeService.getUnidades(t).subscribe(u => this.listCGC$=u),environment.intervalToGetAPI);
    else (t.length == 0)
      this.cgcSol = null;
  }

  waitMatricula:any
  findMatricula(t){
    this.waitMatricula && clearTimeout(this.waitMatricula);
    if (t.length>=7)
      this.waitMatricula = setTimeout(() => this.userService.getUsersFind(t).subscribe(u => this.listMatriculas$=u),environment.intervalToGetAPI);
    else (t.length == 0)
      this.matriculaSol = null;
  }

  waitId:any
  findId(idSol){
    this.waitId && clearTimeout(this.waitId);
    this.waitId = setTimeout(() => {
      this.idSol = idSol;
      this.refreshSolicitacoes(false,null,null,null,idSol);
    },environment.intervalToGetAPI);
  }

}
