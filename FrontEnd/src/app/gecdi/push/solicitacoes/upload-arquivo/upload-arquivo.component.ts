import { Component,  OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../../../../environments/environment';
import { User } from '../../../services/user/classes/User';
import { UserService } from '../../../services/user/user.service';
import { Location } from '@angular/common';
import { Solicitacao } from '../../../services/push/classes/solicitacao';
import { PushService } from '../../../services/push/push.service';

@Component({
  selector: 'ngx-upload-arquivo',
  templateUrl: './upload-arquivo.component.html',
  styleUrls: ['./upload-arquivo.component.scss']
})
export class UploadArquivoComponent implements OnInit {

  idSolicitacao_PUSH: number;
  solicitacao:Solicitacao=null;

  afuConfig:any;
  token:string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private pushService: PushService,
    private location: Location
  ) {

    this.route.params.subscribe(params => {
      this.idSolicitacao_PUSH = params.id;
      this.pushService.getSolicitacaoById(params.id)
                      .subscribe(sol => this.solicitacao = sol);
      this.afuConfig = this.configAFU();
    });
    this.userService.changeUser().subscribe( (u:User) => {
        this.afuConfig = this.configAFU();
    });

  }

  ngOnInit(): void {}

  configAFU(){
    return {
      multiple: false,
      formatsAllowed: ".zip",
      maxSize: "150",
      uploadAPI: {
        url: `${environment.urlAPI}/api/solicitacao/${this.idSolicitacao_PUSH}/upload`,
        method: "POST",
        headers: {
          //"Content-Type": "text/plain;charset=UTF-8",
          "Authorization": `Bearer ${this.userService.currentUser.token}`
        },
        params: {
          'idPUSH': `${this.idSolicitacao_PUSH}`,
        },
        responseType: 'json',
        withCredentials: false,
      },
      theme: "dragNDrop",
      hideProgressBar: false,
      hideResetBtn: false,
      hideSelectBtn: false,
      fileNameIndex: true,
      autoUpload: false,
      replaceTexts: {
        selectFileBtn: 'Selecione o arquivo de CPF/Variáveis para carregar',
        resetBtn: 'Reiniciar',
        uploadBtn: 'Upload',
        dragNDropBox: 'Arrastar e Soltar',
        attachPinBtn: 'Anexar Arquivo...',
        afterUploadMsg_success: 'Upload realizado com sucesso !',
        afterUploadMsg_error: 'Upload com erro !',
        sizeLimit: 'Limite de tamanho'
      }
    }
  }

  voltar(){
    this.location.back();
  }

}
