import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { Solicitacao } from '../../../services/push/classes/solicitacao';
import { PushService } from '../../../services/push/push.service';
import { DetalhesSolicitacaoComponent } from '../detalhes-solicitacao/detalhes-solicitacao.component';

@Component({
  selector: 'ngx-dialog-solicitacao',
  templateUrl: './dialog-solicitacao.component.html',
  styleUrls: ['./dialog-solicitacao.component.scss']
})
export class DialogSolicitacaoComponent implements OnInit {

  @Input('solicitacao') public solicitacao: Solicitacao;
  @ViewChild('dialog') dialog: TemplateRef<any>;
  @ViewChild('detalhes') detalhes: TemplateRef<DetalhesSolicitacaoComponent>;


  constructor(
    private dialogService: NbDialogService,
    private pushService: PushService,
  ) { }

  ngOnInit(): void {
  }


  public openDialog(){
    this.dialogService.open(this.dialog, { hasScroll: true, dialogClass: 'dialog-class' });
  }

  salvarSolicitacao(){
      const detal:any = this.detalhes; //.elementRef.nativeElement;
      detal.formSolicitacao.markAllAsTouched();
      console.log(detal.formSolicitacao.value)
      console.log(detal.formSolicitacao)
      let errosDados:boolean = false;

      // checando os erros, e ignorando as validações do date picker (por hora)
      Object.keys(detal.formSolicitacao.controls).forEach(key => {
        const controlErrors = detal.formSolicitacao.get(key).errors;
        if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
             //console.log('Key control: ' + key + ', keyError: ' + keyError + ', err value: ', controlErrors[keyError]);
             if( !(/nbDatepicker/.test(keyError) || /nbTimepicker/.test(keyError)) ){
                errosDados = true;
                console.log(controlErrors[keyError]);
             }
          });
        }
      });

      if (errosDados){
        alert('ainda tem erros!');
      } else {
        this.pushService.postNewSolicitacao(detal.formSolicitacao.value).subscribe(sol => {
          detal.formSolicitacao.patchValue(sol);
        })
      }

  }

}
