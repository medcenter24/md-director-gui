/*
 * Copyright (c) 2018.
 *
 * @author Zagovorychev Olexandr <zagovorichev@gmail.com>
 */

import { Component, OnInit, ViewChild } from '@angular/core';
import { LoadingComponent } from '../../../core/components/componentLoader/LoadingComponent';
import { DatePeriod } from '../../datePeriod';
import { DatePeriodService } from '../../datePeriod.service';
import { DatatableConfig } from '../../../ui/datatable/datatable.config';
import { DatatableCol } from '../../../ui/datatable/datatableCol';
import { DatatableAction } from '../../../ui/datatable/datatable.action';
import { DatatableComponent } from '../../../ui/datatable/datatable.component';

@Component({
  selector: 'nga-date-period-list',
  templateUrl: './datePeriodList.html',
})
export class DatePeriodListComponent extends LoadingComponent implements OnInit {
  protected componentName: string = 'DatePeriodListComponent';

  @ViewChild('periodDatatable')
    private periodDatatable: DatatableComponent;

  displayDialog: boolean;
  datePeriod: DatePeriod;
  datatableConfig: DatatableConfig;

  constructor(private datePeriodService: DatePeriodService) {
    super();
    this.datePeriod = new DatePeriod();
  }

  ngOnInit() {
    this.datatableConfig = DatatableConfig.factory({
      dataProvider: (filters: Object) => {
        return this.datePeriodService.getPeriods(filters);
      },
      cols: [
        new DatatableCol('title', 'Title'),
        new DatatableCol('from', 'From'),
        new DatatableCol('to', 'To'),
      ],
      controlPanel: true,
      controlPanelActions: [
        new DatatableAction('Add', 'fa-plus', () => {
          this.showDialogToAdd();
        }),
        new DatatableAction('Refresh', 'fa-refresh', () => {
          this.periodDatatable.refresh();
        }),
      ],
      onRowSelect: event => {
        this.onRowSelect(event);
      },
    });
  }

  showDialogToAdd() {
    this.datePeriod = new DatePeriod();
    this.displayDialog = true;
  }

  save() {
    this.datePeriodService.save(this.datePeriod)
      .then(() => {
        this.datePeriod = null;
        this.displayDialog = false;
        this.periodDatatable.refresh();
      });
  }

  delete() {
    // const index = this.datePeriods.indexOf(this.selectedDatePeriod);
    // this.datePeriods = this.datePeriods.filter((val, i) => i !== index);
    this.datePeriod = null;
    this.displayDialog = false;
  }

  onRowSelect(event) {
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
