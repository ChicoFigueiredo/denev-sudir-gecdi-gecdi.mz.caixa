import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Unidade } from './classes/unidades';

const API_PUSH = environment.urlAPI + '/api'

@Injectable({ providedIn: 'root' })
export class UnidadesService {

  constructor(
    private http: HttpClient
  ) { }


  getUnidades(q:string="",limit:number=5) {
    return this.http
               .get<Unidade[]>(`${API_PUSH}/unidades?q=${q}&limit=${limit}`)
  }
}
