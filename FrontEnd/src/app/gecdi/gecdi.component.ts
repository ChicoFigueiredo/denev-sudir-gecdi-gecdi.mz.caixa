import { Component, OnInit } from '@angular/core';
import { MENU_ITEMS } from '../pages/pages-menu';

@Component({
  selector: 'ngx-gecdi',
  templateUrl: './gecdi.component.html',
  styleUrls: ['./gecdi.component.scss']
})
export class GecdiComponent implements OnInit {

  menu = MENU_ITEMS;

  constructor() { }

  ngOnInit(): void {
  }

}
