import { Component, Input, OnInit } from '@angular/core';
import { Solicitacao } from '../../../services/push/classes/solicitacao';

@Component({
  selector: 'ngx-detalhes-solicitacao',
  templateUrl: './detalhes-solicitacao.component.html',
  styleUrls: ['./detalhes-solicitacao.component.scss']
})
export class DetalhesSolicitacaoComponent implements OnInit {

  @Input('solicitacao') public chamado: Solicitacao;
  constructor() { }

  ngOnInit(): void {
  }

}
