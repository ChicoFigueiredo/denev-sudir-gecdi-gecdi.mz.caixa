import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Solicitacao } from '../../../services/push/classes/solicitacao';
import { PushService } from '../../../services/push/push.service';

@Component({
  selector: 'ngx-edit-solicitacoes',
  templateUrl: './edit-solicitacoes.component.html',
  styleUrls: ['./edit-solicitacoes.component.scss']
})
export class EditSolicitacoesComponent implements OnInit {

  idSolicitacao_PUSH:number = -1;
  solicitacao:Solicitacao=null;

  constructor(
    private route: ActivatedRoute,
    private pushService: PushService,
  ) {
    this.route.params.subscribe(params => {
      this.idSolicitacao_PUSH = <number>params.id;
      this.pushService.getSolicitacaoById(params.id)
                      .subscribe(sol => this.solicitacao = sol);
    })
  }

  ngOnInit(): void {
  }

}
