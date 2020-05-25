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
import { FormType } from '../form.type';

@Component({
  selector: 'nga-forms-types-select',
  templateUrl: './forms.types.select.html',
})
export class FormsTypesSelectComponent {

  /**
   * Type which determine possible parameters
   * @type {string}
   */
  @Input() set formableType(type: string) {
    this.translateService.get('Yes').subscribe(() => {
      if (!this.currentType) {
        this.currentType = new FormType('accident', this.translateService.instant('Case'));
      }

      this.filteredFormableTypes = this.formableTypes = [
        this.currentType,
      ];

      const foundType = this.formableTypes.filter(v => v.key === type)[0];
      if (foundType) {
        this.currentType = foundType;
      } else {
        this.selected.emit(this.currentType.key);
      }
    });
  }

  /**
   * Selected parameter
   * @type {EventEmitter<string>}
   */
  @Output() selected: EventEmitter<string> = new EventEmitter<string>();

  currentType: FormType;
  formableTypes: FormType[] = [];
  filteredFormableTypes: FormType[] = [];

  constructor(public translateService: TranslateService) {}

  filterFormableTypes(event): void {
    this.filteredFormableTypes = this.formableTypes;
    this.filteredFormableTypes = [];
    for (const type of this.formableTypes) {
      if (type.title.toLowerCase().indexOf(event.query.toLowerCase()) !== -1) {
        this.filteredFormableTypes.push(type);
      }
    }
  }

}
