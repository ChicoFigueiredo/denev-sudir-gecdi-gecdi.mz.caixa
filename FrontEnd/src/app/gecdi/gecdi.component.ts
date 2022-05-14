import { Component, OnInit } from '@angular/core';
//import { MENU_ITEMS } from '../pages/pages-menu';
import { MenuService } from './services/menu/menu.service';

@Component({
  selector: 'ngx-gecdi',
  templateUrl: './gecdi.component.html',
  styleUrls: ['./gecdi.component.scss']
})
export class GecdiComponent implements OnInit {

  menu = [];//MENU_ITEMS;

  constructor(
    menuService: MenuService
  ){
    menuService.changeMenu().subscribe(_menu => this.menu = _menu)
  }

  ngOnInit(): void {
  }

}
