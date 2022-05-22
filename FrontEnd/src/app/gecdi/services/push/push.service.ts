import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import * as moment from 'moment';
import { EnvioResumo, EnviosResponse } from './classes/envios';
import { FilaResponse } from './classes/fila';
import { Curva } from './classes/curvas';
import { Solicitacao } from './classes/solicitacao';
import { Canal } from './classes/canais';

const API_PUSH = environment.urlAPI + '/api'

@Injectable({
  providedIn: 'root'
})
export class PushService {

  public Curvas:Curva[] = [];
  public Canais:Canal[] = [];
  public solicitacaoSelecionada:Solicitacao;

  constructor(
    private http: HttpClient
  ) {
    this.getCurvas().subscribe((c:Curva[]) => this.Curvas = c);
    this.getCanais().subscribe((c:Canal[]) => this.Canais = c);
  }

  getSolicitacoesEnvio(de = null,ate = null, enviados = -1, antigos = true, simular = false){
    if (!de) de = moment().format("YYYY-MM-DD");
    if (!ate) ate = moment().format("YYYY-MM-DD");
    const xDe = moment(de);
    const xAte = moment(ate);
    return this.http
               .get<EnviosResponse[]>(`${API_PUSH}/envios/lista?De=${xDe.format("YYYY-MM-DD")}&Ate=${xAte.format("YYYY-MM-DD")}&Enviados=${enviados}&NaoEnviadosAntigos=${antigos}&simular=${simular}`)
  }

  getSolicitacaoById(id){
    return this.http
               .get<Solicitacao>(`${API_PUSH}/solicitacao/${id}`)
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

  getCanais() {
    return this.http
               .get<Canal[]>(`${API_PUSH}/Canais`)
  }

  getSolicitacoes(recontar:boolean=true,cgc="-1" , order="priority",soFila:boolean=true){
    if(cgc === "-1")
      return this.http.get<Solicitacao[]>(`${API_PUSH}/solicitacao/lista?recount=${recontar}&CGC=${cgc}&order=${order}&soFila=${soFila}`);
    else
      return this.http.get<Solicitacao[]>(`${API_PUSH}/solicitacao/lista/${cgc}?recount=${recontar}&order=${order}&soFila=${soFila}`);
  }

  getEnviosResumo(data){
    if (!data) data = moment().format("YYYY-MM-DD");
    return this.http.get<EnvioResumo[]>(`${API_PUSH}/envios/resumo?Data_Resumo=${data}`);
  }

  setSolicitacaoCancelado(idSolicitacao,enviado){
    return this.http
               .post(`${API_PUSH}/solicitacao/${idSolicitacao}/MarcarCancelado?MarcarCancelado=${enviado}`,{})
  }

  setSolicitacaoAutorizado(idSolicitacao,autorizado){
    return this.http
               .post(`${API_PUSH}/solicitacao/${idSolicitacao}/Autorizar?MarcarAutorizado=${autorizado}`,{})
  }

  postNewSolicitacao(solicitacao:Solicitacao){
    return this.http
               .post(`${API_PUSH}/solicitacao`,solicitacao)
  }

  deletarSolicitacao(solicitacao:Solicitacao){
    return this.http
               .post(`${API_PUSH}/solicitacao/${solicitacao.idSolicitacao_PUSH}/delete`,{})
  }

  setPrioridadeSolicitacao(sol:Solicitacao,prioridade){
    return this.http
               .post(`${API_PUSH}/solicitacao/${sol?.idSolicitacao_PUSH}/set-prioridade?prioridade=${prioridade}`,{})
  }

  setCurvaSolicitacao(sol:Solicitacao,curva){
    return this.http
               .post(`${API_PUSH}/solicitacao/${sol?.idSolicitacao_PUSH}/set-curva?curva=${curva}`,{})
  }

  deletarEnvio(envio:EnviosResponse){
    return this.http
               .post(`${API_PUSH}/envios/${envio?.idSolicitacao_Simulacao_Envio}/delete`,{})
  }

}
