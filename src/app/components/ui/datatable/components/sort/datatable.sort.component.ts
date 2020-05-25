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

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RequestBuilder } from '../../../../core/http/request';
import { SortRequestField } from '../../../../core/http/request/fields';

@Component({
  selector: 'nga-datatable-sort',
  template: `
    <nga-ui-sort-icon
      *ngIf="isSortable"
      [fieldName]="fieldName"
      [state]="sortState"
      (click)="onClick()"
    ></nga-ui-sort-icon>`,
})
export class DatatableSortComponent implements OnInit {

  @Input() fieldName: string;
  @Input() sortRequestBuilder: RequestBuilder;

  @Output() changed: EventEmitter<SortRequestField> = new EventEmitter<SortRequestField>();

  sortState: string = '';
  private sortRequestField: SortRequestField;

  isSortable: boolean = false;

  ngOnInit (): void {
    this.isSortable = this.sortRequestBuilder.hasField( this.fieldName );
    this.sortRequestField = this.isSortable
      ? <SortRequestField>this.sortRequestBuilder.getRequestField( this.fieldName )
      : null;
    this.sortState = this.isSortable ? this.sortRequestField.getValue() : '';
  }

  onClick(): void {
    this.sortRequestField = this.sortRequestField.moveNext();
    this.sortState = this.sortRequestField.getValue();
    this.changed.emit(this.sortRequestField);
  }
}
