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
import { LoadableComponent } from '../../../core/components/componentLoader';
import { CaseDatatableFilter } from './case.datatable.filter';

@Component({
  selector: 'nga-case-filter',
  templateUrl: './case.filter.html',
})
export class CaseFilterComponent extends LoadableComponent {

  protected componentName: string = 'CaseFilterComponent';

  @Output() protected runFilter: EventEmitter<CaseDatatableFilter> = new EventEmitter<CaseDatatableFilter>();
  @Input() filter: CaseDatatableFilter;

  onFilter(): void {
    this.runFilter.emit(this.filter);
  }
}
