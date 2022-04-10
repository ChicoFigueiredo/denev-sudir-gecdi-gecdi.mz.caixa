import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { NbAuthService, NbAuthResult } from '@nebular/auth';
import { tap, takeWhile } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  alive = false;
  constructor(private authService: NbAuthService, private router: Router) { }

  canActivate() {     // canActive can return Observable<boolean>, which is exactly what isAuhenticated returns
    return this.authService.isAuthenticated()
               .pipe(
                  tap(authenticated => {
                    if (!authenticated) {
                      //this.authService.requestPassword(environment.authname) //.authenticate(environment.authname) //.subscribe((authResult: NbAuthResult) => { });;
                      this.router.navigate(['gecdi/security/login']);
                    }
                  }),
                );;

  }

}
