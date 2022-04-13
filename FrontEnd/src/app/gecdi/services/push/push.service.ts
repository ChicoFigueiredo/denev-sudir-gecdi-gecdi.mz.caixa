import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import * as moment from 'moment';
import { EnviosResponse } from './classes/envios';
import { FilaResponse } from './classes/fila';

const API_PUSH = environment.urlAPI + '/api'

@Injectable({
  providedIn: 'root'
})
export class PushService {

  constructor(
    private http: HttpClient
  ) {

  }

  getSolicitacoesEnvio(de = null,ate = null, enviados = -1, antigos = true){
    if (!de) de = moment().format("YYYY-MM-DD");
    if (!ate) ate = moment().format("YYYY-MM-DD");
    const xDe = moment(de);
    const xAte = moment(ate);
    return this.http
               .get<EnviosResponse>(`${API_PUSH}/envios/lista?De=${xDe.format("YYYY-MM-DD")}&Ate=${xAte.format("YYYY-MM-DD")}&Enviados=${enviados}&NaoEnviadosAntigos=${antigos}`)
  }


  setEnviado(idEnvio,enviado){
    return this.http
               .post(`${API_PUSH}/Envios/${idEnvio}/MarcarEnviado?MarcarEnvioRealizado=${enviado}`,{})
  }


  setCancelado(idEnvio,enviado){
    return this.http
               .post(`${API_PUSH}/Envios/${idEnvio}/MarcarCancelado?MarcarCancelado=${enviado}`,{})
  }

  getFila(recount=true,historic=false){
    if (historic)
        return this.http.post<FilaResponse>(`${API_PUSH}/fila/historico?recount=${recount}`,{});
    else
        return this.http.post<FilaResponse>(`${API_PUSH}/fila/status?recount=${recount}`,{});
  }

}
