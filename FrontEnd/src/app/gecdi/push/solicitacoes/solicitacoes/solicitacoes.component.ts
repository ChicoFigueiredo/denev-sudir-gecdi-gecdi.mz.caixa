import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Solicitacao } from '../../../services/push/classes/solicitacao';
import { PushService } from '../../../services/push/push.service';

@Component({
  selector: 'ngx-solicitacoes',
  templateUrl: './solicitacoes.component.html',
  styleUrls: ['./solicitacoes.component.scss']
})
export class SolicitacoesComponent implements OnInit {

  public solicitacao:Observable<Solicitacao>;

  constructor(
    private pushService:PushService,
  ) { }

  ngOnInit(): void {
    this.refreshSolicitacoes(false);
  }


  checkRow(e:Solicitacao){
    if (e.cancelado)
      return 'row-orange'
    if (e.finalizado)
      return 'row-green'
    return '';
  }

  refreshSolicitacoes(recontar:boolean=false){
    this.solicitacao = this.pushService.getSolicitacoes(recontar);
  }

}
