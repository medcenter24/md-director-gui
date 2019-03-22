/*
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU General Public License
 * as published by the Free Software Foundation; under version 2
 * of the License (non-upgradable).
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
 *
 * Copyright (c) 2019 (original work) MedCenter24.com;
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
