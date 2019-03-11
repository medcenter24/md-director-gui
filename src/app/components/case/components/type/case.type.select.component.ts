/*
 * Copyright (c) 2017
 *
 *  @author Alexander Zagovorichev <zagovorichev@gmail.com>
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
