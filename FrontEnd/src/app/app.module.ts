/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LOCALE_ID, NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CoreModule } from './@core/core.module';
import { ThemeModule } from './@theme/theme.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { APP_BASE_HREF, registerLocaleData } from '@angular/common';
import {
  NbChatModule,
  NbDatepickerModule,
  NbDialogModule,
  NbMenuModule,
  NbSidebarModule,
  NbTimepickerModule,
  NbToastrModule,
  NbWindowModule,
} from '@nebular/theme';
import { NbAuthJWTToken, NbAuthModule, NbPasswordAuthStrategy } from '@nebular/auth';
import { JwtHeaderInterceptor } from './gecdi/services/interceptor/interceptor.service';

// Linguagem brazil
import localePt from '@angular/common/locales/pt';
import { environment } from '../environments/environment';
import { UserDataInterceptor } from './gecdi/services/interceptor/login.interceptor.service';
import * as moment from 'moment';

registerLocaleData(localePt, 'pt-BR');
moment.updateLocale('pt-BR', {
  monthsShort: moment.monthsShort('-MMM-')
});

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    NbSidebarModule.forRoot(),
    NbMenuModule.forRoot(),
    NbDatepickerModule.forRoot(),
    NbTimepickerModule.forRoot(),
    NbDialogModule.forRoot(),
    NbWindowModule.forRoot(),
    NbToastrModule.forRoot(),
    NbChatModule.forRoot({
      messageGoogleMapKey: 'AIzaSyA_wNuCzia92MAmdLRzmqitRGvCF7wCZPY',
    }),
    CoreModule.forRoot(),
    ThemeModule.forRoot(),

    NbAuthModule.forRoot({
      strategies: [
        NbPasswordAuthStrategy.setup({
          name: environment.authname,
          baseEndpoint: environment.urlAPI,
           login: {
             endpoint: '/api/user/login',
           },
           token: {
             class: NbAuthJWTToken,
             key: 'token', // this parameter tells where to look for the token
           }
        })
      ],
      forms: {
        login: {
          strategy: environment.authname,  // strategy id key.
          rememberMe: true,   // whether to show or not the `rememberMe` checkbox
          showMessages: {
            success: true,
          },
        }
      },
    }),

  ],
  exports: [],
  bootstrap: [AppComponent],
  providers: [
    { provide: APP_BASE_HREF, useValue: '/' },
    { provide: LOCALE_ID, useValue: 'pt-BR' },
    { provide: HTTP_INTERCEPTORS, multi: true, useClass: JwtHeaderInterceptor },
    { provide: HTTP_INTERCEPTORS, multi: true, useClass: UserDataInterceptor  },
  ],
})
export class AppModule {
}
