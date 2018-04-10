/*
 * Copyright (c) 2018.
 *
 * @author Zagovorychev Olexandr <zagovorichev@gmail.com>
 */

import { Component, OnInit, ViewChild } from '@angular/core';
import { LoadingComponent } from '../../../core/components/componentLoader/LoadingComponent';
import { Period } from '../../period';
import { PeriodService } from '../../period.service';
import { DatatableConfig } from '../../../ui/datatable/datatable.config';
import { DatatableCol } from '../../../ui/datatable/datatable.col';
import { DatatableAction } from '../../../ui/datatable/datatable.action';
import { DatatableComponent } from '../../../ui/datatable/datatable.component';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { GlobalState } from '../../../../global.state';
import { Logger } from 'angular2-logger/core';
import { UiDateDowDropdownComponent } from '../../../ui/date/dow/dropdown/ui.date.dow.dropdown.component';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'nga-period-list',
  templateUrl: './period.list.html',
})
export class PeriodListComponent extends LoadingComponent implements OnInit {
  protected componentName: string = 'PeriodListComponent';

  @ViewChild('dowFrom')
    private dowFromComponent: UiDateDowDropdownComponent;

  @ViewChild('dowTo')
    private dowToComponent: UiDateDowDropdownComponent;

  @ViewChild('periodDatatable')
    private periodDatatable: DatatableComponent;

  displayDialog: boolean;
  datePeriod: Period;
  datatableConfig: DatatableConfig;
  timeTo: string = '';
  timeFrom: string = '';
  dowTo: string = '';
  dowFrom: string = '';
  langLoaded: boolean = false;

  constructor(
    protected loadingBar: SlimLoadingBarService,
    private datePeriodService: PeriodService,
    protected _logger: Logger,
    protected _state: GlobalState,
    protected translateService: TranslateService,
  ) {
    super();
    this.datePeriod = new Period();
  }

  ngOnInit() {
    this.translateService.get('Yes').subscribe(() => {
      this.langLoaded = true;
      this.datatableConfig = DatatableConfig.factory({
        dataProvider: (filters: Object) => {
          return this.datePeriodService.getDatatableData(filters);
        },
        cols: [
          new DatatableCol('title', this.translateService.instant('Title')),
          new DatatableCol('from', this.translateService.instant('From')),
          new DatatableCol('to', this.translateService.instant('To')),
        ],
        controlPanel: true,
        controlPanelActions: [
          new DatatableAction('Add', 'fa-plus', () => {
            this.showDialogToAdd();
          }),
        ],
        onRowSelect: event => {
          this.onRowSelect(event);
        },
      });
    });
  }

  showDialogToAdd() {
    this.setPeriod(new Period());
    this.displayDialog = true;
  }

  private setPeriod(period: Period = null): void {
    this.datePeriod = period;
    this.timeFrom = this.timeTo = this.dowFrom = this.dowTo = '';

    if (this.datePeriod) {
      const from = this.datePeriod.from.trim();
      const to = this.datePeriod.to.trim();
      if (from.indexOf(' ') !== -1) {
        [this.dowTo, this.timeTo] = from.split(' ');
        if (this.dowToComponent && this.dowTo) {
          this.dowToComponent.set(this.dowTo);
        }
      } else {
        this.timeTo = to;
      }
      if (to.indexOf(' ') !== -1) {
        [this.dowFrom, this.timeFrom] = to.split(' ');
        if (this.dowFromComponent && this.dowFrom) {
          this.dowFromComponent.set(this.dowFrom);
        }
      } else {
        this.timeFrom = from;
      }
    }
  }

  save() {
    this.startLoader(this.componentName);
    this.datePeriod.from = `${this.dowFrom} ${this.timeFrom}`;
    this.datePeriod.to = `${this.dowTo} ${this.timeTo}`;
    this.datePeriodService.save(this.datePeriod)
      .then(() => {
        this.stopLoader(this.componentName);
        this.setPeriod();
        this.displayDialog = false;
        this.periodDatatable.refresh();
      })
      .catch(() => {
        this.stopLoader(this.componentName);
      });
  }

  delete() {
    this.startLoader(this.componentName);
    this.datePeriodService.destroy(this.datePeriod)
      .then(() => {
        this.stopLoader(this.componentName);
        this.setPeriod();
        this.displayDialog = false;
        this.periodDatatable.refresh();
      })
      .catch(() => {
        this.stopLoader(this.componentName);
      });
  }

  onRowSelect(event) {
    this.setPeriod(this.cloneDatePeriod(event.data));
    this.displayDialog = true;
  }

  cloneDatePeriod(c: Period): Period {
    const datePeriod = new Period();
    for (const prop of Object.keys(c)) {
      datePeriod[prop] = c[prop];
    }
    return datePeriod;
  }

  setToDow(dow: string): void {
    this.dowTo = dow;
  }

  setFromDow(dow: string): void {
    this.dowFrom = dow;
  }

}
