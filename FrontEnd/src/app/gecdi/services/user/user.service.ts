import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { NbAuthJWTToken, NbAuthService } from '@nebular/auth';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { MenuService } from '../menu/menu.service';
import { Role } from './classes/Role';
import { User } from './classes/User';
import { UserListRequest } from './classes/user-request';
import { Usuario } from './classes/Usuario';

const API_PUSH = environment.urlAPI + '/api'
@Injectable({
  providedIn: 'root'
})
export class UserService {

  public currentUser: User = null;
  public _changeUser: BehaviorSubject<any> = new BehaviorSubject<any>(this.currentUser);
  public changeUser() {
    return this._changeUser.asObservable();
  }

  public roles:Role[];


  constructor(
    private authService: NbAuthService,
    private menuService: MenuService,
    private http: HttpClient,
    private router:Router,
    private leftMenuService: MenuService,
  ) {

    this.authService.onTokenChange()
      .subscribe((token: NbAuthJWTToken) => {
        if (token.isValid()) {
          this.currentUser = <User> JSON.parse(localStorage.getItem("gecdi.user.data"));
          this._changeUser.next(this.currentUser);
          this.menuService.SetMenu(`${this.currentUser.user.idRole}`);
          //const lastUrl = localStorage.getItem('gecdi.url.route')
          //this.router.navigateByUrl(lastUrl ? lastUrl : this.menuService.GetRota(`${this.currentUser.user.idRole}`));

        }
    });

    this.router.events.pipe(
      filter(event => event instanceof NavigationStart)
    ).subscribe((event:NavigationStart) => {
        localStorage.setItem('gecdi.url.route',event.url);
    });

    this.getRoles().subscribe(e => this.roles = e)
  }

  public logoff(){
    localStorage.removeItem('gecdi.user.data');
    localStorage.removeItem('auth_app_token');
    this._changeUser.next(null);
    this.leftMenuService.SetMenu('-1');
    this.router.navigateByUrl('/gecdi/security/login');
  }

  public get e_admin():boolean {
    return this.currentUser.user.idRole == 1
  }

  getRoles() {
    return this.http
               .get<Role[]>(`${API_PUSH}/user/roles`);
  }


  getUsers(lim:number=25,q:string=''):Observable<Usuario[]> {
    return this.http
               .get<Usuario[]>(`${API_PUSH}/user?lim=${lim}&busca=${q}`);
  }

  getUsersFind(q:string='',lim:number=25):Observable<UserListRequest[]> {
    return this.http
               .get<UserListRequest[]>(`${API_PUSH}/user/find?lim=${lim}&q=${q}`);
  }



  deleteUser(id:number){
    return this.http
               .post(`${API_PUSH}/user/${id}/delete`,{});
  }


  postNewUser(_matricula, _role){
    return this.http
               .post(`${API_PUSH}/User/register`,{ matricula:_matricula, role:_role });
  }

  postChangeRole(_idUsuario, _role){
    return this.http
               .post(`${API_PUSH}/user/${_idUsuario}/alter?role=${_role}`,{});
  }
}
