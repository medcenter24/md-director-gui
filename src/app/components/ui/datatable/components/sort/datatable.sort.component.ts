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
import { DatatableConfig } from '../../entities/datatable.config';
import { RequestBuilder } from '../../../../core/http/request/request.builder';

@Component({
  selector: 'nga-datatable-sort',
  template: `<nga-sort
      [fieldName]="field"
      [status]="config.get('sortBy')"
      (sorted)="sort($event)"
    ></nga-sort>`,
})
export class DatatableSortComponent implements OnInit {

  @Input() field: string;
  @Input() config: DatatableConfig;

  @Output() sorted: EventEmitter<RequestBuilder> = new EventEmitter<RequestBuilder>();

  private sortStatus: RequestBuilder;

  ngOnInit (): void {
    this.sortStatus = this.config.get('sortBy');
    this.updateFromUri();
  }

  // todo we need to run this sorting in order, what was pressed firstly
  sort(sortStatus: RequestBuilder): void {
    this.changeUri();
    this.sorted.emit(sortStatus);
  }

  private changeUri(): void {
    // todo
  }

  private updateFromUri(): void {
    // todo
  }
}
