import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { Atendente, ResponseAtendentes } from './atendentes';

const API_USER = environment.urlAPI + '/api/atendentes';

@Injectable({
  providedIn: 'root'
})
export class AtendentesService {

  public atendentes : Atendente[] = [];

  constructor(
    private http: HttpClient
  ) {

    //this.getAtendentes().subscribe(u => this.atendentes = u);

   }

  getAtendentes():Observable<Atendente[]> {

    return this.http
      .get<Atendente[]>(`${API_USER}`)
      .pipe(
        map(at => {
          this.atendentes = at; // at.$values;
          return at; //at.$values;
        })
      );


  }

}
