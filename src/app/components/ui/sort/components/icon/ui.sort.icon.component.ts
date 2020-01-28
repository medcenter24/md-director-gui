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
import { SortRequestField } from '../../../../core/http/request/fields';
import { RequestBuilder } from '../../../../core/http/request';

@Component( {
  selector: 'nga-sort',
  template: `<span *ngIf="visible()" class="c-pointer" [ngClass]="directionClass" (click)="sort()"></span>`,
})
export class UiSortIconComponent implements OnInit {

  @Input() status: RequestBuilder;
  @Input() fieldName: string = '';

  @Output() sorted: EventEmitter<RequestBuilder> = new EventEmitter<RequestBuilder>();

  directionClass: string = 'fa fa-spinner fa-spin';
  uiSort: SortRequestField;

  ngOnInit (): void {
    this.initUiSort();
    this.setIcon();
  }

  visible(): boolean {
    return this.status.hasField(this.fieldName);
  }

  sort(): void {
    this.nextState();
    this.setIcon();
    this.sorted.emit(this.status);
  }

  initUiSort(): void {
    this.uiSort = this.status.hasField( this.fieldName )
      ? <SortRequestField>this.status.getRequestField( this.fieldName )
      : null;
  }

  private setIcon(): void {
    switch (this.uiSort && this.uiSort.getValue()) {
      case 'asc':
        this.directionClass = 'fa fa-sort-amount-asc';
        break;
      case 'desc':
        this.directionClass = 'fa fa-sort-amount-desc';
        break;
      case 'none':
      default:
        this.directionClass = 'fa fa-sort';
    }
  }

  private nextState(): void {
    this.uiSort.moveNext();
  }
}
