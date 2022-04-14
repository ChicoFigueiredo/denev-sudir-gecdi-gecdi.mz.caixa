import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { Observable, Subscription, timer } from 'rxjs';
import { EnviosResponse } from '../../../services/push/classes/envios';
import { PushService } from '../../../services/push/push.service';
import * as moment from 'moment';
import { switchMap } from 'rxjs/operators';
import { DialogEnvioComponent } from '../dialog-envio/dialog-envio.component';


@Component({
  selector: 'ngx-envios',
  templateUrl: './envios.component.html',
  styleUrls: ['./envios.component.scss']
})
export class EnviosComponent implements OnInit, OnDestroy {

  public envios: Observable<EnviosResponse> = new Observable<EnviosResponse>(null);
  public EnvioSelecionado: EnviosResponse = null;
  public posicao:number = 0;

  dataSelecionada:any = moment(); //.format("DD/MMM/YYYY");
  timerSubscription: Subscription;
  timerSlip:number = 60*15+1;
  timer:number = this.timerSlip;
  runEvent:number = 0;

  everySecond: Observable<number> = timer(0, 1000);

  @ViewChild('atu') relogio: ElementRef<any>;
  @ViewChild('diag') dialog: ElementRef<DialogEnvioComponent>;

  constructor(
    private pushService: PushService,
    private serviceSticker: NbToastrService,
  ) { }

  ngOnInit(): void {
    moment.locale('pt-br');
    this.envios = this.pushService.getSolicitacoesEnvio(null,null,-1,true);

    this.timerSubscription = this.everySecond.subscribe((seconds) => {
        this.timer--;
        this.relogio.nativeElement.innerHTML = ` ( ${ moment.utc(this.timer*1000).format('mm:ss') } )`
        if (this.timer <= this.runEvent)
            this.refreshEnvios()
    })
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

  rowClick(e){

  }

  detalheEnvio(envio:EnviosResponse, position){

    this.pushService.getEnvioById(envio.idSolicitacao_Simulacao_Envio)
                    .subscribe(e => this.EnvioSelecionado = e);
    this.posicao = position;
    (<any> this.dialog).openDialog();

 }

  changeCheckEnviado(c:EnviosResponse,$event){
    this.pushService.setEnvioEnviado(c.idSolicitacao_Simulacao_Envio,!c.enviado).subscribe((e:EnviosResponse) => {
      if(e.enviado == !c.enviado){
        c.enviado = e.enviado;
        c = e;
        this.serviceSticker.show(`Envio ID ${e?.idSolicitacao_Simulacao_Envio} marcado como ${e?.enviado?'ENVIADO':'NÃO ENVIADO'}`,'',{ status: 'success' })
      } else {
        this.serviceSticker.show(`Envio ID ${e?.idSolicitacao_Simulacao_Envio} com erro na marcação de envio`,'',{ status: 'danger', duration: 5000 })
      }
    })
  }

  changeCheckCancelado(c:EnviosResponse,$event){
    this.pushService.setEnvioCancelado(c.idSolicitacao_Simulacao_Envio,!c.cancelado).subscribe((e:EnviosResponse) => {
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
    this.dataSelecionada = moment($event);
    this.refreshEnvios();
  }

  refreshEnvios(){
    const dt = moment(this.dataSelecionada).format("YYYY-MM-DD");
    this.envios = this.pushService.getSolicitacoesEnvio(dt,dt,-1,true);
    this.timer = this.timerSlip;
  }

}
