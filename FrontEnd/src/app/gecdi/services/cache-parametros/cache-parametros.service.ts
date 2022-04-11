import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { CacheParametros } from './cache-parametros.interfaces';

const API_USER = environment.urlAPI + '/api/CacheParametroes';

@Injectable({ providedIn: 'root' })
export class CacheParametrosService {

  public parametros: CacheParametros = null;
  public _changeParametros: BehaviorSubject<CacheParametros> = new BehaviorSubject<CacheParametros>(this.parametros);
  get changeParametros() { return this._changeParametros.asObservable(); }

  constructor(
    private http: HttpClient
  ) { }


  getPatametros():Observable<CacheParametros> {
    return this.http
      .get<CacheParametros>(`${API_USER}`)
      .pipe(
        map(tr => {
          this.parametros = tr; //tr.$values;
          this._changeParametros.next(this.parametros);
          return tr; //tr.$values;
        })
      )

  }
}
