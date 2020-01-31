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
import { RequestBuilder } from '../../../../core/http/request';
import { FilterRequestField } from '../../../../core/http/request/fields';

@Component({
  selector: 'nga-datatable-filter',
  template: `
    <nga-ui-filter
      *ngIf="isFilterable"
      [type]="fieldType"
      [value]="fieldValue"
      (changed)="onChange($event)"
    ></nga-ui-filter>
  `,
  styleUrls: ['./datatable.filters.scss'],
})
export class DatatableFiltersComponent {
  /**
   * ID of the filter
   */
  @Input() fieldName: string;
  @Input() set filterRequestBuilder (rb: RequestBuilder) {
    this.isFilterable = rb.hasField( this.fieldName );
    if (this.isFilterable) {
      this.filterRequestField = <FilterRequestField>rb.getRequestField( this.fieldName );
      this.fieldType = this.filterRequestField.getElType();
      this.fieldValue = this.filterRequestField.getValue();
    }
  }

  /**
   * emit when needs to be filtered
   */
  @Output() changed: EventEmitter<void> = new EventEmitter<void>();

  fieldType: string = '';
  fieldValue: string = '';
  isFilterable: boolean = false;
  private filterRequestField: FilterRequestField;

  onChange(newVal: string): void {
    this.filterRequestField.setValue(newVal);
    this.changed.emit();
  }
}
