import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { environment } from '../../../../../environments/environment';
import { SolicitacaoCliente } from '../../../services/push/classes/envios';
import { Solicitacao } from '../../../services/push/classes/solicitacao';
import { PushService } from '../../../services/push/push.service';

@Component({
  selector: 'ngx-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss']
})
export class ClientesComponent implements OnInit {

  idSolicitacao_PUSH:number = -1;
  solicitacao:Solicitacao=null;
  clientes:SolicitacaoCliente[] = [];

  skip:number = 0;
  lim:number = 25;
  buscaCPF:string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private pushService: PushService,
    private serviceSticker: NbToastrService,
  ) {
    this.route.params.subscribe(params => {
      this.idSolicitacao_PUSH = <number>params.id;
      this.pushService.getSolicitacaoById(params.id)
                      .subscribe(sol => this.solicitacao = sol);
    })
  }

  ngOnInit(): void {
    this.refreshClientes(null,null);
  }

  voltarSolicitacoes() {
    this.router.navigateByUrl("/gecdi/push/solicitacoes")
  }

  refreshClientes(skip=null,lim=null,cpf=null){
    this.skip = skip ?? this.skip;
    this.lim  = lim ?? this.lim;
    this.buscaCPF  = cpf ?? this.buscaCPF;
    this.pushService
        .getClientesSolicitacao(this.idSolicitacao_PUSH,this.skip,this.lim,this.buscaCPF)
        .subscribe(l => this.clientes = l);
  }


  waitRefresh:any
  refreshClientesDelay(skip,lim,cpf=null){
    this.waitRefresh && clearTimeout(this.waitRefresh);
    this.waitRefresh = setTimeout(() => this.refreshClientes(skip,lim,cpf),environment.intervalToGetAPI);
  }

  avanca(){
    this.skip += this.lim;
    this.refreshClientes(null,null)
  }

  recua(){
    this.skip -= this.lim;
    this.skip = this.skip < 0 ? 0 : this.skip;
    this.refreshClientes(null,null)
  }

  checkRow(e:Solicitacao){
    // if (e.cancelado)
    //   return 'row-orange'
    // if (!e.autorizacao_Gestor_PUSH)
    //   return 'row-lavanda'
    // if (e.finalizado)
    //   return 'row-green'
    return '';
  }

}
