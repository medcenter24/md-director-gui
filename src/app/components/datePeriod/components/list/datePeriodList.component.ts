/*
 * Copyright (c) 2018.
 *
 * @author Zagovorychev Olexandr <zagovorichev@gmail.com>
 */

import { Component, OnInit } from '@angular/core';
import { LoadingComponent } from '../../../core/components/componentLoader/LoadingComponent';
import { DatePeriod } from '../../datePeriod';
import { DatePeriodService } from '../../datePeriod.service';

@Component({
  selector: 'nga-date-period-list',
  templateUrl: './datePeriodList.html',
})
export class DatePeriodListComponent extends LoadingComponent implements OnInit {
  protected componentName: string = 'DatePeriodListComponent';

  displayDialog: boolean;

  datePeriod: DatePeriod;

  selectedDatePeriod: DatePeriod;

  newDatePeriod: boolean;

  datePeriods: DatePeriod[];

  cols: any[];

  constructor(private datePeriodService: DatePeriodService) {
    super();
  }

  ngOnInit() {
    this.datePeriodService.getPeriods().then((datePeriods: DatePeriod[]) => this.datePeriods = datePeriods);

    this.cols = [
      { field: 'vin', header: 'Vin' },
      { field: 'year', header: 'Year' },
      { field: 'brand', header: 'Brand' },
      { field: 'color', header: 'Color' },
    ];
  }

  showDialogToAdd() {
    this.newDatePeriod = true;
    this.datePeriod = new DatePeriod();
    this.displayDialog = true;
  }

  save() {
    const periods = [...this.datePeriods];
    if (this.newDatePeriod) {
      periods.push(this.datePeriod);
    } else {
      periods[this.datePeriods.indexOf(this.selectedDatePeriod)] = this.datePeriod;
    }
    this.datePeriods = periods;
    this.datePeriod = null;
    this.displayDialog = false;
  }

  delete() {
    const index = this.datePeriods.indexOf(this.selectedDatePeriod);
    this.datePeriods = this.datePeriods.filter((val, i) => i !== index);
    this.datePeriod = null;
    this.displayDialog = false;
  }

  onRowSelect(event) {
    this.newDatePeriod = false;
    this.datePeriod = this.cloneDatePeriod(event.data);
    this.displayDialog = true;
  }

  cloneDatePeriod(c: DatePeriod): DatePeriod {
    const datePeriod = new DatePeriod();
    for (const prop of Object.keys(c)) {
      datePeriod[prop] = c[prop];
    }
    return datePeriod;
  }

}
