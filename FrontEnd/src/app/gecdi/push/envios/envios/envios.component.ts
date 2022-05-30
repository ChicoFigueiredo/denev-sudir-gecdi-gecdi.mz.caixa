import { Component, ElementRef, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { Observable, Subscription, timer } from 'rxjs';
import { EnviosResponse } from '../../../services/push/classes/envios';
import { PushService } from '../../../services/push/push.service';
import * as moment from 'moment';
import { map, switchMap } from 'rxjs/operators';
import { DialogEnvioComponent } from '../dialog-envio/dialog-envio.component';
import { UserService } from '../../../services/user/user.service';
import { User } from '../../../services/user/classes/User';
import clipboard from 'clipboardy';

@Component({
  selector: 'ngx-envios',
  templateUrl: './envios.component.html',
  styleUrls: ['./envios.component.scss']
})
export class EnviosComponent implements OnInit, OnDestroy {

  //public envios: Observable<EnviosResponse> = new Observable<EnviosResponse>(null);
  public envios: EnviosResponse[] = [];
  public EnvioSelecionado: EnviosResponse = null;
  public PosicaoSelecionada: number = 1;
  public posicao:number = 0;

  dataSelecionada:any = new Date(); //moment(); ; //moment().toDate();  // = moment().toDate(); //.format("DD/MMM/YYYY");
  timerSubscription: Subscription;
  timerSlip:number = 60*10+1;
  timer:number = this.timerSlip;
  runEvent:number = 0;
  SoDoDia:boolean = true;

  QtdTotalPush:number = 0;
  QtdTotalPushEfetivado:number = 0;
  QtdEnvios:number=0;
  QtdEnviosEfetivados:number=0;
  MensagensDistintas:number=0;

  everySecond: Observable<number> = timer(0, 1000);

  @ViewChild('atu') relogio: ElementRef<any>;
  @ViewChild('diag') dialog: ElementRef<DialogEnvioComponent>;
  public usuario:User;

  constructor(
    private pushService: PushService,
    private serviceSticker: NbToastrService,
    private userService: UserService,
    private dialogService: NbDialogService,
    //private momentDate:NbMomentDateService,
  ) {
    this.userService.changeUser().subscribe(u => this.usuario= <User>u );
    moment.updateLocale('pt-BR', {
      monthsShort: moment.monthsShort('-MMM-')
    });

  }

  ngOnInit(): void {
    moment.locale('pt-br');
    //this.envios = this.pushService.getSolicitacoesEnvio(null,null,-1,true);
    this.refreshEnvios();

    this.timerSubscription = this.everySecond.subscribe((seconds) => {
        this.timer--;
        this.relogio.nativeElement.innerHTML = ` ( ${ moment.utc(this.timer*1000).format('mm:ss') } )`
        if (this.timer <= this.runEvent)
            this.refreshEnvios()
    })
  }

  refreshEnvios(callback=null,simular:boolean=false){
    const dt = moment(this.dataSelecionada).format("YYYY-MM-DD");
    this.pushService.getSolicitacoesEnvio(dt,dt,-1,!this.SoDoDia,simular)
                    .pipe(map(u => { callback && callback(); return u; }))
                    .subscribe(l => {
                      this.envios = l;
                      this.QtdTotalPush = l.map(q => q.quantidade).reduce((ant,cur,i) => ant + cur);
                      this.QtdTotalPushEfetivado = l.map(q => <number>(q.enviado ? q.quantidade : 0)).reduce((ant,cur,i) => ant + cur);
                      this.QtdEnvios = l.length;
                      this.QtdEnviosEfetivados = l.map(q => <number>(q.enviado ? 1 : 0)).reduce((ant,cur,i) => ant + cur);
                      this.MensagensDistintas = new Set(l.map(q => q.idSolicitacao_PUSHNavigation.mensagem)).size
                      this.EnvioSelecionado = l[this.PosicaoSelecionada];
                    });
    this.timer = this.timerSlip;
  }

  ngOnDestroy(){
    this.timerSubscription.unsubscribe();
  }


  checkRow(e){
    if (e?.cancelado)
      return 'row-orange';

    if (e?.enviado)
      return 'row-green'

    return '';
  }

  rowClick(e:EnviosResponse, p:number, dialog: TemplateRef<any> ){
    this.EnvioSelecionado = e;
    this.PosicaoSelecionada = p;
    this.dialogService.open(dialog, { context : ''});
  }

  getPosition(delta,e:EnviosResponse){
    if (e && e.observacoes != "")
      this.salvarAnotacoes(e,null);

    if(this.PosicaoSelecionada + delta > this.envios.length-1)
      this.PosicaoSelecionada = this.envios.length-1;
    else if(this.PosicaoSelecionada + delta < 0)
      this.PosicaoSelecionada = 0;
    else
      this.PosicaoSelecionada += delta;

    this.EnvioSelecionado = this.envios[this.PosicaoSelecionada]
  }

  copiaTextoClipboard(text:string){
    clipboard.write(text);
    this.serviceSticker.show(`Texto '${text}' copiado para a área de transferência.`,'',{ status: 'success' })
  }

  detalheEnvio(envio:EnviosResponse, position){

    this.pushService.getEnvioById(envio.idSolicitacao_Simulacao_Envio)
                    .subscribe(e => this.EnvioSelecionado = e);
    this.posicao = position;
    (<any> this.dialog).openDialog();

 }

  changeCheckEnviado(c:EnviosResponse,$event){
    this.pushService.setEnvioEnviado(c.idSolicitacao_Simulacao_Envio,!c.enviado,c.observacoes).subscribe((e:EnviosResponse) => {
      if(e.enviado == !c.enviado){
        c.enviado = e.enviado;
        c = e;
        this.QtdEnviosEfetivados = this.envios.map(q => <number>(q.enviado ? 1 : 0)).reduce((ant,cur,i) => ant + cur);
        this.QtdTotalPushEfetivado = this.envios.map(q => <number>(q.enviado ? q.quantidade : 0)).reduce((ant,cur,i) => ant + cur);
        this.serviceSticker.show(`Envio ID ${e?.idSolicitacao_Simulacao_Envio} marcado como ${e?.enviado?'ENVIADO':'NÃO ENVIADO'}`,'',{ status: 'success' })
      } else {
        this.serviceSticker.show(`Envio ID ${e?.idSolicitacao_Simulacao_Envio} com erro na marcação de envio`,'',{ status: 'danger', duration: 5000 })
      }
    })
  }

  salvarAnotacoes(c:EnviosResponse,$event) {
    this.pushService.setObservacoes(c.idSolicitacao_Simulacao_Envio,c.observacoes).subscribe((e:EnviosResponse) => {
      if(e.observacoes == c.observacoes){
        c.enviado = e.enviado;
        c = e;
        this.QtdEnviosEfetivados = this.envios.map(q => <number>(q.enviado ? 1 : 0)).reduce((ant,cur,i) => ant + cur);
        this.QtdTotalPushEfetivado = this.envios.map(q => <number>(q.enviado ? q.quantidade : 0)).reduce((ant,cur,i) => ant + cur);
        this.serviceSticker.show(`Envio ID ${e?.idSolicitacao_Simulacao_Envio} gravado com a observação ${e?.observacoes}`,'',{ status: 'success' })
      } else {
        this.serviceSticker.show(`Envio ID ${e?.idSolicitacao_Simulacao_Envio} com erro na gravação de observação`,'',{ status: 'danger', duration: 5000 })
      }
    })
  }

  changeCheckCancelado(c:EnviosResponse,$event){
    this.pushService.setEnvioCancelado(c.idSolicitacao_Simulacao_Envio,!c.cancelado,c.observacoes).subscribe((e:EnviosResponse) => {
      if(e.cancelado == !c.cancelado){
        c.cancelado = e.cancelado;
        c = e;
        this.serviceSticker.show(`Envio ID ${e?.idSolicitacao_Simulacao_Envio} marcado como ${e?.cancelado?'CANCELADO':'NÃO CANCELADO'}`,'',{ status: 'success' })
      } else {
        this.serviceSticker.show(`Envio ID ${e?.idSolicitacao_Simulacao_Envio} com erro na marcação de cancelamento`,'',{ status: 'danger', duration: 5000 })
      }
    })
  }

  changeDataSelecionada(data,$event){
    this.dataSelecionada = moment($event).toDate();
    this.refreshEnvios();
  }

  envioASerExcluido:EnviosResponse
  excluirEnvio(e:EnviosResponse,dialog: TemplateRef<any>){
    this.envioASerExcluido = e;
    this.dialogService.open(dialog, { context : `Deseja excluir o Envio ${e?.idSolicitacao_Simulacao_Envio} - ${e?.data } às ${e?.horaFormatado} - ${e?.nome_Arquivo} ` });
  }

  deletarEnvio(dialog: TemplateRef<any>,ref:any,BotaoExcluir:any){
    BotaoExcluir.disabled = "disabled";
    this.pushService.deletarEnvio(this.envioASerExcluido).subscribe(s => {
      ref.close();
      this.refreshEnvios(() => {
          this.serviceSticker.show(`Solicitação ID ${this.envioASerExcluido.idSolicitacao_Simulacao_Envio} - ${this.envioASerExcluido.horaFormatado} EXCLUIDO! (${this.envioASerExcluido?.idSolicitacao_PUSHNavigation?.mensagem})`,'',{ status: 'success', duration: 5000 })
      });
    })
  }


  geraMensagemPO(e:EnviosResponse) {
    return `Estamos executando o PUSH - Horário ${e.horaFormatado}h, Tranche ${ e.tranche}, QTD ${e.quantidade} e a mensagem enviada será "${e.idSolicitacao_PUSHNavigation.mensagem}"`
  }

}
