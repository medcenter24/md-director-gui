/*
 * Copyright (c) 2018.
 *
 * @author Zagovorychev Olexandr <zagovorichev@gmail.com>
 */

import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'nga-date-dow-dropdown',
  template: `
      <p-dropdown [options]="days"
                  [style]="{'width':'150px'}"
                  appendTo="body"
                  placeholder="{{ 'Day of week' | translate }}"
                  [(ngModel)]="selectedDay" filter="true" [showClear]="true"></p-dropdown>
  `,
})
export class UiDateDowDropdownComponent {

  selectedDay: string = '';
  days: Object[];

  constructor(
    private translate: TranslateService,
  ) {
    this.translate.get('mon').subscribe(res => {
      // to be sure that languages were loaded
      this.days = [
        { label: 'mon', value: this.translate.instant('mon') },
        { label: 'tues', value: this.translate.instant('tues') },
        { label: 'wed', value: this.translate.instant('wed') },
        { label: 'thurs', value: this.translate.instant('thurs') },
        { label: 'fri', value: this.translate.instant('fri') },
        { label: 'sat', value: this.translate.instant('sat') },
        { label: 'sun', value: this.translate.instant('sun') },
      ];
    });
  }
}
