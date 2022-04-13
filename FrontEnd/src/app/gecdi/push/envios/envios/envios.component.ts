import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { Observable, Subscription, timer } from 'rxjs';
import { EnviosResponse } from '../../../services/push/classes/envios';
import { PushService } from '../../../services/push/push.service';
import * as moment from 'moment';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'ngx-envios',
  templateUrl: './envios.component.html',
  styleUrls: ['./envios.component.scss']
})
export class EnviosComponent implements OnInit, OnDestroy {

  envios: Observable<EnviosResponse> = new Observable<EnviosResponse>(null);
  dataSelecionada:any = moment(); //.format("DD/MMM/YYYY");
  timerSubscription: Subscription;
  timerSlip:number = 60*15+1;
  timer:number = this.timerSlip;
  runEvent:number = 0;

  everySecond: Observable<number> = timer(0, 1000);

  @ViewChild('atu') relogio: ElementRef<any>;

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

  changeCheckEnviado(c:EnviosResponse,$event){
    this.pushService.setEnviado(c.idSolicitacao_Simulacao_Envio,!c.enviado).subscribe((e:EnviosResponse) => {
      if(e.enviado == !c.enviado){
        this.serviceSticker.show(`Envio ID ${e?.idSolicitacao_Simulacao_Envio} marcado como ${e?.enviado?'ENVIADO':'NÃO ENVIADO'}`,'',{ status: 'success' })
        c.enviado = e.enviado;
        c = e;
      } else {
        this.serviceSticker.show(`Envio ID ${e?.idSolicitacao_Simulacao_Envio} com erro na marcação de envio`,'',{ status: 'danger', duration: 5000 })
      }
    })
  }

  changeCheckCancelado(c:EnviosResponse,$event){
    this.pushService.setCancelado(c.idSolicitacao_Simulacao_Envio,!c.cancelado).subscribe((e:EnviosResponse) => {
      if(e.cancelado == !c.cancelado){
        this.serviceSticker.show(`Envio ID ${e?.idSolicitacao_Simulacao_Envio} marcado como ${e?.cancelado?'CANCELADO':'NÃO CANCELADO'}`,'',{ status: 'success' })
        c.cancelado = e.cancelado;
        c = e;
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
