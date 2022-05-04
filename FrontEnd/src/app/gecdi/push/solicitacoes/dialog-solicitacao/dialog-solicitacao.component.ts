import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { Solicitacao } from '../../../services/push/classes/solicitacao';

@Component({
  selector: 'ngx-dialog-solicitacao',
  templateUrl: './dialog-solicitacao.component.html',
  styleUrls: ['./dialog-solicitacao.component.scss']
})
export class DialogSolicitacaoComponent implements OnInit {

  @Input('solicitacao') public chamado: Solicitacao;
  @ViewChild('dialog') dialog: TemplateRef<any>;

  constructor(
    private dialogService: NbDialogService,
  ) { }

  ngOnInit(): void {
  }


  public openDialog(){
    this.dialogService.open(this.dialog, { hasScroll: true, dialogClass: 'dialog-class' });
  }


}
