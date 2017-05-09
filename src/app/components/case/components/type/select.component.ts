/*
 * Copyright (c) 2017
 *
 *  @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import { Component, Output, EventEmitter, Input } from '@angular/core';
import { SelectItem } from 'primeng/primeng';

@Component({
  selector: 'select-case-type',
  templateUrl: './select.html'
})
export class SelectCaseTypeComponent {

  @Input() selectedCaseTypeId: string;
  @Output() selected: EventEmitter<string> = new EventEmitter<string>();

  private caseTypes: Array<SelectItem> = [];

  constructor () { }

  ngOnInit () {
    this.caseTypes = [];
    this.caseTypes.push({label: 'Doctor Case', value: 'App/Doctor'});
    this.caseTypes.push({label: 'Hospital Case', value: 'App/Hospital'});

    if (!this.selectedCaseTypeId) {
      this.selectedCaseTypeId = 'App/Doctor';
      this.onChanged({value: this.selectedCaseTypeId})
    }
  }

  onChanged(event): void {
    this.selected.emit(event.value);
  }
}
