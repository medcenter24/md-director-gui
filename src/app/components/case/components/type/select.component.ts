/*
 * Copyright (c) 2017
 *
 *  @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import { Component, Output, EventEmitter, Input, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/primeng';

@Component({
  selector: 'nga-select-case-type',
  templateUrl: './select.html',
})
export class SelectCaseTypeComponent implements OnInit {

  @Input() selectedCaseTypeId: string;
  @Output() selected: EventEmitter<string> = new EventEmitter<string>();

  caseTypes: SelectItem[] = [];

  constructor () { }

  ngOnInit () {
    this.caseTypes = [];
    this.caseTypes.push({ label: 'Doctor Case', value: 'App\\DoctorAccident' });
    this.caseTypes.push({ label: 'Hospital Case', value: 'App\\HospitalAccident' });

    if (!this.selectedCaseTypeId) {
      this.selectedCaseTypeId = 'App\\DoctorAccident';
      this.onChanged({ value: this.selectedCaseTypeId });
    }
  }

  onChanged(event): void {
    this.selected.emit(event.value);
  }
}
