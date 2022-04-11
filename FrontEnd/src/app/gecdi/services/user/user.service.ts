import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NbAuthJWTToken, NbAuthService } from '@nebular/auth';
import { BehaviorSubject } from 'rxjs';
import { MenuService } from '../menu/menu.service';
import { User } from './User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public currentUser: User = null;
  public _changeUser: BehaviorSubject<any> = new BehaviorSubject<any>(this.currentUser);
  public changeUser() {
    return this._changeUser.asObservable();
  }


  constructor(
    private authService: NbAuthService,
    private menuService: MenuService,
    private router:Router
  ) {

    this.authService.onTokenChange()
      .subscribe((token: NbAuthJWTToken) => {
        if (token.isValid()) {

          this.currentUser = <User> JSON.parse(localStorage.getItem("gecdi.user.data"));

          this._changeUser.next(this.currentUser);

          this.menuService.SetMenu(`${this.currentUser.user.idRole}`);

          this.router.navigateByUrl(this.menuService.GetRota(`${this.currentUser.user.idRole}`));

        }

    });

  }
}
