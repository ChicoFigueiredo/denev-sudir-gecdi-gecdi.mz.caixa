import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import * as moment from 'moment';
import { EnviosResponse } from './classes/envios';
import { FilaResponse } from './classes/fila';
import { Curva } from './classes/curvas';
import { Solicitacao } from './classes/solicitacao';

const API_PUSH = environment.urlAPI + '/api'

@Injectable({
  providedIn: 'root'
})
export class PushService {

  public Curvas:Curva[] = [];

  constructor(
    private http: HttpClient
  ) {
    this.getCurvas().subscribe((c:Curva[]) => this.Curvas = c);
  }

  getSolicitacoesEnvio(de = null,ate = null, enviados = -1, antigos = true){
    if (!de) de = moment().format("YYYY-MM-DD");
    if (!ate) ate = moment().format("YYYY-MM-DD");
    const xDe = moment(de);
    const xAte = moment(ate);
    return this.http
               .get<EnviosResponse>(`${API_PUSH}/envios/lista?De=${xDe.format("YYYY-MM-DD")}&Ate=${xAte.format("YYYY-MM-DD")}&Enviados=${enviados}&NaoEnviadosAntigos=${antigos}`)
  }

  getEnvioById(id){
    return this.http
               .get<EnviosResponse>(`${API_PUSH}/envios/${id}`)
  }

  setEnvioEnviado(idEnvio,enviado){
    return this.http
               .post(`${API_PUSH}/Envios/${idEnvio}/MarcarEnviado?MarcarEnvioRealizado=${enviado}`,{})
  }


  setEnvioCancelado(idEnvio,enviado){
    return this.http
               .post(`${API_PUSH}/Envios/${idEnvio}/MarcarCancelado?MarcarCancelado=${enviado}`,{})
  }

  getFila(recount=true,historic=false){
    if (historic)
        return this.http.post<FilaResponse>(`${API_PUSH}/fila/historico?recount=${recount}`,{});
    else
        return this.http.post<FilaResponse>(`${API_PUSH}/fila/status?recount=${recount}`,{});
  }

  getCurvas() {
    return this.http
               .get<Curva[]>(`${API_PUSH}/Curvas`)
  }

  getSolicitacoes(recontar:boolean=true,cgc="-1"){
    if(cgc === "-1")
      return this.http.get<Solicitacao>(`${API_PUSH}/solicitacao/lista?recount=${recontar}&CGC=${cgc}`);
    else
      return this.http.get<Solicitacao>(`${API_PUSH}/solicitacao/lista/${cgc}?recount=${recontar}`);
  }

  setSolicitacaoCancelado(idSolicitacao,enviado){
    return this.http
               .post(`${API_PUSH}/solicitacao/${idSolicitacao}/MarcarCancelado?MarcarCancelado=${enviado}`,{})
  }

  setSolicitacaoAutorizado(idSolicitacao,autorizado){
    return this.http
               .post(`${API_PUSH}/solicitacao/${idSolicitacao}/Autorizar?MarcarAutorizado=${autorizado}`,{})
  }

}
