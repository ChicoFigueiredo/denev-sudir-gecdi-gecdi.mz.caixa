import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GecdiRoutingModule } from './gecdi-routing.module';
import { GecdiComponent } from './gecdi.component';

import { ThemeModule } from '../@theme/theme.module';
import { NbMenuModule } from '@nebular/theme';
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
