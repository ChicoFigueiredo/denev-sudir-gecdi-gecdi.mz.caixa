import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NbMenuItem } from '@nebular/theme';
import { BehaviorSubject } from 'rxjs';
//import { MENU_ITEMS } from '../../../pages/pages-menu';
import { MENU_DA_ROLE, MENU_LOGIN } from './menu.por.role';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  public Menu_Atual: NbMenuItem[] = MENU_LOGIN; //[];//MENU_ITEMS;
  public _changeMenu: BehaviorSubject<NbMenuItem[]> = new BehaviorSubject<NbMenuItem[]>(this.Menu_Atual);
  public changeMenu() {
    return this._changeMenu.asObservable();
  }

  constructor(
    private router:Router,
  ) {
      this._changeMenu.next(this.Menu_Atual);
   }

   public SetMenu(role:string){
     let url="";
     if(role === '-1'){
        this.Menu_Atual = MENU_LOGIN; //[];//MENU_ITEMS;
        url="/gecdi/security/login";
     } else {
        this.Menu_Atual = MENU_DA_ROLE[role].menu;
        url = MENU_DA_ROLE[role].rota;
     }
     this._changeMenu.next(this.Menu_Atual);
     //this.router.navigateByUrl(url);
   }

   public GetRota(role:string){
     return MENU_DA_ROLE[role].rota;
   }
}
