/*
 * Copyright (c) 2018.
 *
 * @author Zagovorychev Olexandr <zagovorichev@gmail.com>
 */

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'nga-date-dow-dropdown',
  template: `
      <p-dropdown [options]="days"
                  [style]="{'width':'100px'}"
                  appendTo="body"
                  placeholder="{{ 'all' | translate }}"
                  [(ngModel)]="selectedDay"
                  (onChange)="changed($event)"
                  filter="true"
                  [showClear]="true"></p-dropdown>
  `,
})
export class UiDateDowDropdownComponent {

  @Output() change: EventEmitter<string> = new EventEmitter<string>();

  selectedDay: string = '';
  days: any[];

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

  changed(event): void {
    this.change.emit(event.value);
  }

  set(dowLabel: string): void {
    this.selectedDay = '';
    const selected = this.days.find(x => x.label === dowLabel);
    if (selected) {
      this.selectedDay = selected.label;
    }
  }
}
