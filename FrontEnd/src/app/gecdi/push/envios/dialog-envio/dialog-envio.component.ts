import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { EnviosResponse } from '../../../services/push/classes/envios';
import { PushService } from '../../../services/push/push.service';

@Component({
  selector: 'ngx-dialog-envio',
  templateUrl: './dialog-envio.component.html',
  styleUrls: ['./dialog-envio.component.scss']
})
export class DialogEnvioComponent implements OnInit {

  @Input('envio') public Envio:EnviosResponse;
  @Input('position') public position: number;
  @Input('listaEnvios') public listaEnvios: EnviosResponse[];

  @ViewChild('dialog') dialog: TemplateRef<any>;
  //@ViewChild('inputTemplateRef') inputTemplateRef: TemplateRef<any>;

  constructor(
    private pushService: PushService
  ) { }

  ngOnInit(): void {
  }


  getPosition(pos){
    if (pos < 0 && this.position > 0){
      this.position--;
    } else if (pos > 0 && this.position < this.listaEnvios.length){
      this.position++;
    }
    const idChamado = this.listaEnvios[this.position].idSolicitacao_Simulacao_Envio;
    this.pushService.getEnvioById(idChamado).subscribe(c => {
      this.Envio = c;
    });

  }


}
