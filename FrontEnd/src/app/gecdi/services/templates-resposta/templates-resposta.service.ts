import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { TemplateResposta, TemplateRespostaResponse } from './templates_respostas_interfaces';

const API_USER = environment.urlAPI + '/api/templates_resposta';

@Injectable({
  providedIn: 'root'
})
export class TemplatesRespostaService {

  public templates: TemplateResposta[] = null;
  public _changeTemplatesRespostas: BehaviorSubject<any> = new BehaviorSubject<any>(this.templates);
  get changeTemplatesRespostas() { return this._changeTemplatesRespostas.asObservable(); }

  constructor(
    private http: HttpClient
  ) {
    this.getTemplatesRespostas().subscribe(u => {return null});
  }


  getTemplatesRespostas():Observable<TemplateResposta[]> {
    return this.http
      .get<TemplateResposta[]>(`${API_USER}`)
      .pipe(
        map(tr => {
          this.templates = tr; //tr.$values;
          this._changeTemplatesRespostas.next(this.templates);
          return tr; //tr.$values;
        })
      );
  }
}
