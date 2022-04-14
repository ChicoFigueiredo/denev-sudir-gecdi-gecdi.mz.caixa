import { Component, Input, OnInit } from '@angular/core';
import { EnviosResponse } from '../../../services/push/classes/envios';

@Component({
  selector: 'ngx-dados-envio',
  templateUrl: './dados-envio.component.html',
  styleUrls: ['./dados-envio.component.scss']
})
export class DadosEnvioComponent implements OnInit {

  @Input('envio') public Envio:EnviosResponse;

  constructor() { }

  ngOnInit(): void {
  }

}
