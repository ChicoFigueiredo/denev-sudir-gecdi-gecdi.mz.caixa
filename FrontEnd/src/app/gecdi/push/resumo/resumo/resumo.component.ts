import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { EnvioResumo, EnviosResponse } from '../../../services/push/classes/envios';
import { PushService } from '../../../services/push/push.service';

@Component({
  selector: 'ngx-resumo',
  templateUrl: './resumo.component.html',
  styleUrls: ['./resumo.component.scss']
})
export class ResumoComponent implements OnInit {

  resumo:EnvioResumo[];
  dataSelecionada:any = moment(); //.format("DD/MMM/YYYY");
  qtd_Dia_Total:number=0;
  enviado_Total:number=0;
  percentual_Dec_Total:number=0;

  constructor(
    private pushService:PushService
  ) { }

  ngOnInit(): void {
  }

  refreshResumo(){
    const dt = moment(this.dataSelecionada).format("YYYY-MM-DD");
    this.pushService
        .getEnviosResumo(dt)
        .subscribe((u:EnvioResumo[])=> {
          this.qtd_Dia_Total = u.map(q => <number>(q.qtd_Dia)).reduce((ant,cur,i) => ant + cur);
          this.enviado_Total = u.map(q => <number>(q.enviado)).reduce((ant,cur,i) => ant + cur);
          this.percentual_Dec_Total = this.enviado_Total / this.qtd_Dia_Total * 100;
          this.resumo = u;
        })
  }

  changeDataSelecionada(data,$event){
    this.dataSelecionada = moment($event);
    this.refreshResumo();
  }
}
