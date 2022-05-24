import { Component, OnInit } from '@angular/core';
import { NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
//import { MENU_ITEMS } from '../../../pages/pages-menu';
import { MenuService } from '../../services/menu/menu.service';
import { Role } from '../../services/user/classes/Role';
import { User } from '../../services/user/classes/User';
import { UserListRequest } from '../../services/user/classes/user-request';
import { Usuario } from '../../services/user/classes/Usuario';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'ngx-cadastro-usuarios',
  templateUrl: './cadastro-usuarios.component.html',
  styleUrls: ['./cadastro-usuarios.component.scss']
})
export class CadastroUsuariosComponent implements OnInit {

  menu = [];//MENU_ITEMS;

  public matricula:string = null;
  public role:number = 6;
  public roles:any[];
  public usuariosSelecionados:Observable<Usuario[]>
  public searchText:string;

  public matriculaSol:string = null;
  listMatriculas$:UserListRequest[];

  constructor(
    private menuService: MenuService,
    public userService:UserService,
    private serviceSticker: NbToastrService,
  ){
    menuService.changeMenu().subscribe(_menu => this.menu = _menu)
    this.userService.getRoles().subscribe(rls => this.roles = rls);
    this.usuariosSelecionados = this.userService.getUsers(environment.itemsPadrao,'');
  }

  ngOnInit(): void {
  }

  checkRow(u){
  }

  rowClick(u){

  }

  Search(q){
    this.usuariosSelecionados = this.userService.getUsers(environment.itemsPadrao,q);
  }

  excluirUsuario(u:Usuario){
    this.userService.deleteUser(u.idUsuario).subscribe(
      (res) => {
        this.serviceSticker.show(`Usuario ${u?.cUsuario} (${u?.nome}) excluido com sucesso`,'',{ status: 'success', duration: 2000})
        this.Search(this.searchText);
      },
      (err) => {
        if (err.status != 200){
          this.serviceSticker.show(`Erro ao excluir ${u?.cUsuario} (${u?.nome})`,'',{ status: 'danger', duration: 5000})
          this.Search(this.searchText);
        }
      }
    );
  }

  Cadastrar(){
    this.userService.postNewUser(this.matricula,this.role).subscribe(
      (res:Usuario) => {
        this.serviceSticker.show(`Usuario ${res?.cUsuario} (${res?.nome}) incluido com sucesso`,'',{ status: 'success', duration: 2000})
        this.Search(this.matricula);
      },
      (err) => {
        if (err.status != 200){
          this.serviceSticker.show(`Erro ao incluir ${this.matricula} - ${err.message}`,'',{ status: 'danger', duration: 5000})
          this.Search(this.searchText);
        }
      }
    );
  }

  ChangeRole(_idUsuario, _role){
    this.userService.postChangeRole(_idUsuario,_role).subscribe(
      (res:Usuario) => {
        this.serviceSticker.show(`Usuario ${res?.cUsuario} (${res?.nome}) alterado para role ${res?.idRole}`,'',{ status: 'success', duration: 2000})
        //this.Search(this.matricula);
      },
      (err) => {
        if (err.status != 200){
          this.serviceSticker.show(`Erro ao alterar a role ${this.matricula} - ${err.message}`,'',{ status: 'danger', duration: 5000})
          //this.Search(this.searchText);
        }
      }
    );
  }

  waitMatricula:any
  findMatricula(t){
    this.waitMatricula && clearTimeout(this.waitMatricula);
    if (t.length>=7)
      this.waitMatricula = setTimeout(() => this.userService.getUsersFind(t).subscribe(u => this.listMatriculas$=u),environment.intervalToGetAPI);
    else (t.length == 0)
      this.matriculaSol = null;
  }

}
