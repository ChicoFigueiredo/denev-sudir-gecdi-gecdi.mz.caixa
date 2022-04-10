import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GecdiRoutingModule } from './gecdi-routing.module';
import { GecdiComponent } from './gecdi.component';


import { NbMenuModule } from '@nebular/theme';
import { ThemeModule } from '../@theme/theme.module';

@NgModule({
  declarations: [
    GecdiComponent
  ],
  imports: [
    CommonModule,
    GecdiRoutingModule,
    NbMenuModule,
    ThemeModule,
  ]
})
export class GecdiModule { }
