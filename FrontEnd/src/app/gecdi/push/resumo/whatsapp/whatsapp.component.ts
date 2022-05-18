import { Component, ElementRef, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-whatsapp',
  templateUrl: './whatsapp.component.html',
  styleUrls: ['./whatsapp.component.scss']
})
export class WhatsappComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  maxValue = 100;
  data: Number[] = [
    10,20,30,-45,90,-90,-80,50,100
  ]

  getWidth(dataItem: number, bar: any):number {
    return (parseInt(bar.offsetWidth) / this.maxValue)  * Math.abs(dataItem);
  }
}
