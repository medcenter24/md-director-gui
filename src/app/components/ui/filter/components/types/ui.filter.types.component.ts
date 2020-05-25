/*
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU General Public License
 * as published by the Free Software Foundation; under version 2
 * of the License (non-upgradable).
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
 *
 * Copyright (c) 2020 (original work) MedCenter24.com;
 */

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AutoCompleteSrcConfig } from '../../../autosuggest/src';
import { FilterRequestField } from '../../../../core/http/request/fields';
import { DateHelper } from '../../../../../helpers/date.helper';

@Component({
  selector: 'nga-ui-filter',
  templateUrl: './ui.filter.types.html',
})
export class UiFilterTypesComponent {

  @Input() type: string;
  @Input() value: string;
  @Input() autoCompleteConfig: AutoCompleteSrcConfig;

  @Output() changed: EventEmitter<string> = new EventEmitter<string>();

  datePickerConfig: Object = {
    mode: 'range',
    dateFormat: DateHelper.EUROPE_DATE_FORMAT,
  };

  loading: boolean = false;

  onChange(newVal: string): void {
    this.changed.emit(newVal);
  }

  isText(): boolean {
    return this.type === FilterRequestField.TYPE_TEXT;
  }

  isDateRange(): boolean {
    return this.type === FilterRequestField.TYPE_DATE_RANGE;
  }

  isSelect(): boolean {
    return this.type === FilterRequestField.TYPE_SELECT;
  }

  isUndefined(): boolean {
    return ![
      FilterRequestField.TYPE_TEXT,
      FilterRequestField.TYPE_DATE_RANGE,
      FilterRequestField.TYPE_SELECT,
    ].includes(this.type);
  }

  onSearch(val: string): void {
    this.changed.emit(val);
  }

  onAutoCompleteSearch(event): void {
    const key = this.autoCompleteConfig.fieldKey;
    const res = [];
    if (event.length) {
      event.forEach( v => {
        res.push(v[key]);
      } );
    }
    this.onSearch(res.join(','));
  }

  startLoader(): void {
    this.loading = true;
  }

  stopLoader(): void {
    this.loading = false;
  }
}
