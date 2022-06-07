import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import * as moment from 'moment';
import { EnvioResumo, EnviosResponse, SolicitacaoCliente } from './classes/envios';
import { FilaResponse } from './classes/fila';
import { Curva } from './classes/curvas';
import { Solicitacao } from './classes/solicitacao';
import { Canal } from './classes/canais';
import { TipoCategoriaSolicitacao } from './classes/tipo.categora.solicitacao';

const API_PUSH = environment.urlAPI + '/api'

@Injectable({
  providedIn: 'root'
})
export class PushService {

  public Curvas:Curva[] = [];
  public Canais:Canal[] = [];
  public tiposCategoriasSolicitacao:TipoCategoriaSolicitacao[];
  public solicitacaoSelecionada:Solicitacao;

  constructor(
    private http: HttpClient
  ) {
    this.getCurvas().subscribe((c:Curva[]) => this.Curvas = c);
    this.getCanais().subscribe((c:Canal[]) => this.Canais = c);
    this.getTipoCategoriaSolicitacao().subscribe((t:TipoCategoriaSolicitacao[]) => this.tiposCategoriasSolicitacao = t);
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

  setEnvioEnviado(idEnvio, enviado, obs=""){
    return this.http
               .post(`${API_PUSH}/Envios/${idEnvio}/marcar-envio?MarcarEnvioRealizado=${enviado}&obs=${obs}`,{})
  }


  setEnvioCancelado(idEnvio,enviado, obs=""){
    return this.http
               .post(`${API_PUSH}/Envios/${idEnvio}/marcar-cancelado?MarcarCancelado=${enviado}&obs=${obs}`,{})
  }

  setObservacoes(idEnvio,obs=""){
    return this.http
               .post(`${API_PUSH}/Envios/${idEnvio}/gravar-observacao?obs=${obs}`,{})
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

  getTipoCategoriaSolicitacao() {
    return this.http
               .get<TipoCategoriaSolicitacao[]>(`${API_PUSH}/Tipo_Categoria_Solicitacao`)
  }

  getCanais() {
    return this.http
               .get<Canal[]>(`${API_PUSH}/Canais`)
  }

  getSolicitacoes(recontar:boolean=true,cgc="-1" , order="priority",soFila:boolean=true,limit=-1,de='',ate='',matricula='', idSol = -1, dataEnvio = null){
    if (dataEnvio){
      if(cgc === "-1")
        return this.http.get<Solicitacao[]>(`${API_PUSH}/solicitacao/lista?recount=${recontar}&CGC=${cgc}&order=${order}&soFila=${soFila}&limit=${limit}&de=${de}&ate=${ate}&matricula=${matricula??''}&id=${idSol??-1}&enviarParaODia=${dataEnvio}`);
      else
        return this.http.get<Solicitacao[]>(`${API_PUSH}/solicitacao/lista/${cgc}?recount=${recontar}&CGC=${cgc}&order=${order}&soFila=${soFila}&limit=${limit}&de=${de}&ate=${ate}&matricula=${matricula??''}&id=${idSol??-1}&enviarParaODia=${dataEnvio}`);

    } else {
      if(cgc === "-1")
        return this.http.get<Solicitacao[]>(`${API_PUSH}/solicitacao/lista?recount=${recontar}&CGC=${cgc}&order=${order}&soFila=${soFila}&limit=${limit}&de=${de}&ate=${ate}&matricula=${matricula??''}&id=${idSol??-1}`);
      else
        return this.http.get<Solicitacao[]>(`${API_PUSH}/solicitacao/lista/${cgc}?recount=${recontar}&CGC=${cgc}&order=${order}&soFila=${soFila}&limit=${limit}&de=${de}&ate=${ate}&matricula=${matricula??''}&id=${idSol??-1}`);
    }
  }

  getEnviosResumo(data){
    if (!data) data = moment().format("YYYY-MM-DD");
    return this.http.get<EnvioResumo[]>(`${API_PUSH}/envios/resumo?Data_Resumo=${data}`);
  }

  getClientesSolicitacao(id,skip=0,lim=30,cpf=null){
    return this.http
               .get<SolicitacaoCliente[]>(`${API_PUSH}/clientes/solicitacao/${id}?skip=${skip}&lim=${lim}&cpf=${cpf}`);
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

  setTipoCategoria(sol:Solicitacao,tipoCategoria){
    return this.http
               .post(`${API_PUSH}/solicitacao/${sol?.idSolicitacao_PUSH}/set-tipo-categoria?tipoCategoria=${tipoCategoria}`,{})
  }

  deletarEnvio(envio:EnviosResponse){
    return this.http
               .post(`${API_PUSH}/envios/${envio?.idSolicitacao_Simulacao_Envio}/delete`,{})
  }

}
