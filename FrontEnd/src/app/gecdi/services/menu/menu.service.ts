import { Injectable } from '@angular/core';
import { NbMenuItem } from '@nebular/theme';
import { BehaviorSubject } from 'rxjs';
import { MENU_ITEMS } from '../../../pages/pages-menu';
import { MENU_DA_ROLE } from './menu.por.role';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  public Menu_Atual: NbMenuItem[] = MENU_ITEMS;
  public _changeMenu: BehaviorSubject<NbMenuItem[]> = new BehaviorSubject<NbMenuItem[]>(this.Menu_Atual);
  public changeMenu() {
    return this._changeMenu.asObservable();
  }

  constructor() {
      this._changeMenu.next(this.Menu_Atual);
   }

   public SetMenu(role:string){
      this.Menu_Atual = MENU_DA_ROLE[role].menu;
      this._changeMenu.next(this.Menu_Atual);
   }

   public GetRota(role:string){
     return MENU_DA_ROLE[role].rota;
   }
}
