/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Component, OnInit } from '@angular/core';
import { NbIconLibraries } from '@nebular/theme';
import { AnalyticsService } from './@core/utils/analytics.service';
import { SeoService } from './@core/utils/seo.service';
import { GECDI_ICONS } from './gecdi/icons/custom-icons';

@Component({
  selector: 'ngx-app',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent implements OnInit {

  evaIcons:any;

  constructor(
    private analytics: AnalyticsService,
    private seoService: SeoService,
    iconsLibrary: NbIconLibraries
  ) {
    this.evaIcons = Array.from(iconsLibrary.getPack('eva').icons.keys())
                        .filter(icon => icon.indexOf('outline') === -1);

    iconsLibrary.registerFontPack('font-awesome', { iconClassPrefix: 'fa', packClass: 'fa' });
    iconsLibrary.setDefaultPack('font-awesome');
    iconsLibrary.registerSvgPack('gecdi-icons', GECDI_ICONS)
  }

  ngOnInit(): void {
    this.analytics.trackPageViews();
    this.seoService.trackCanonicalChanges();
  }
}

/*
constructor(iconsLibrary: NbIconLibraries) {
  this.evaIcons = Array.from(iconsLibrary.getPack('eva').icons.keys())
  .filter(icon => icon.indexOf('outline') === -1);

  iconsLibrary.registerFontPack('font-awesome');
  iconsLibrary.setDefaultPack('font-awesome');
}
*/
