import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NbAuthJWTToken, NbAuthService } from '@nebular/auth';
import { BehaviorSubject } from 'rxjs';
import { User } from './User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public currentUser: User = null;
  public _changeUser: BehaviorSubject<any> = new BehaviorSubject<any>(this.currentUser);
  get changeUser() { return this._changeUser.asObservable(); }


  constructor(
    private authService: NbAuthService,
    private router:Router
  ) {

    this.authService.onTokenChange()
      .subscribe((token: NbAuthJWTToken) => {
        if (token.isValid()) {

          this.currentUser = <User> JSON.parse(localStorage.getItem("gecdi.user.data"));

          this._changeUser.next(this.currentUser);

          if (this.currentUser.user.idRole = 2) {
            this.router.navigateByUrl('/gecdi/dashboard')
          } else {
            this.router.navigateByUrl('/')
          }

          //this.user = token.getPayload(); // here we receive a payload from the token and assigns it to our `user` variable
        }

    });

  }
}
