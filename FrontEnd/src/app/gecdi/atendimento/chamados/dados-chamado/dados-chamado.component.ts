import { Component, Input, OnInit } from '@angular/core';
import { Chamado } from '../../../services/chamados/chamados';
import { TemplateResposta } from '../../../services/templates-resposta/templates_respostas_interfaces';

@Component({
  selector: 'ngx-dados-chamado',
  templateUrl: './dados-chamado.component.html',
  styleUrls: ['./dados-chamado.component.scss']
})
export class DadosChamadoComponent implements OnInit {

  @Input() public chamado: Chamado;
  @Input('template') public template: TemplateResposta = null;

  constructor() { }

  ngOnInit(): void {
  }

}
