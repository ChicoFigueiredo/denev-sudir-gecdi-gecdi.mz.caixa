import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Chamado, ChamadoMinimo, ResponseChamadoMinimo } from './chamados';

const API_USER = environment.urlAPI + '/api/chamados';


@Injectable({
  providedIn: 'root'
})
export class ChamadosService {

  constructor(
    private http: HttpClient
  ) { }

  getChamados(
    abertos     : boolean = true,
    sistema     : string  = null,
    top         : number  = -1,
    atendente   : string  = "",
    tipo        : string  = "<Todos>",
    origem      : string  = "<Todos>",
    item        : string  = "<Todos>",
    motivo      : string  = "<Todos>",
    tratado     : boolean = null,
    listaCampos : string  = "minimo"
  ):Observable<ChamadoMinimo[]> {

    return this.http
      .get<ResponseChamadoMinimo>(`${API_USER}?abertos=${abertos}&atendente=${atendente}&tratado=${tratado}`)
      //.map(r => r /*r.$values */)

  }

  getChamadoById(idChamado:number){
    return this.http
      .get<Chamado>(`${API_USER}/${idChamado}`)
  }

  getDesCarimbarChamadoById(idChamado:number){
    return this.http
      .post<Chamado>(`${API_USER}/${idChamado}/descarimbar`,null)
  }

  getCarimbarChamadoById(idChamado:number, carimbo = ""){
    return this.http
      .post<Chamado>(`${API_USER}/${idChamado}/carimbar/?carimbo=${encodeURI(carimbo)}`,null)
  }


  putTratarChamadoById(idChamado:number,tratado:boolean,atendente:string){
    return this.http
      .post<Chamado>(`${API_USER}/${idChamado}/tratado/?foiTratado=${tratado}&apelidoAtendente=${atendente}`,null)
      //.put<Chamado>(`${API_USER}/${idChamado}?foiTratado=${tratado}&apelidoAtendente=${atendente}`,null)
    //.put<Chamado>(`${API_USER}/${idChamado}/tratado`,{
      /*
    .put<Chamado>(`${API_USER}/${idChamado}`,{
        "idChamado" : `${idChamado}`,
        "foiTratado": tratado,
        "apelidoAtendente": atendente
     })
     */
  }

}
