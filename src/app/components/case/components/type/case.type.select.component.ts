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

import { Component, Output, EventEmitter, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { SelectItem } from 'primeng/primeng';

@Component({
  selector: 'nga-case-type-select',
  templateUrl: './case.type.select.html',
})
export class CaseTypeSelectComponent implements OnInit {

  @Input() selectedCaseTypeId: string;
  @Output() selected: EventEmitter<string> = new EventEmitter<string>();

  caseTypes: SelectItem[] = [];

  constructor (
    private translate: TranslateService,
  ) { }

  ngOnInit () {
    this.translate.get('Yes').subscribe(() => {
      this.caseTypes = [];
      this.caseTypes.push({ label: this.translate.instant('Doctor Case'), value: 'App\\DoctorAccident' });
      this.caseTypes.push({ label: this.translate.instant('Hospital Case'), value: 'App\\HospitalAccident' });

      if (!this.selectedCaseTypeId) {
        this.selectedCaseTypeId = 'App\\DoctorAccident';
        this.onChanged({ value: this.selectedCaseTypeId });
      }
    });
  }

  onChanged(event): void {
    this.selected.emit(event.value);
  }
}
