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

import { Component, OnInit, ViewChild } from '@angular/core';
import { LoadingComponent } from '../../../core/components/componentLoader';
import { Period } from '../../period';
import { PeriodService } from '../../period.service';
import { DatatableConfig } from '../../../ui/datatable';
import { DatatableCol } from '../../../ui/datatable';
import { DatatableAction } from '../../../ui/datatable';
import { DatatableComponent } from '../../../ui/datatable';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { GlobalState } from '../../../../global.state';
import { Logger } from 'angular2-logger/core';
import { UiDateDowDropdownComponent } from '../../../ui/date/dow/dropdown/ui.date.dow.dropdown.component';
import { TranslateService } from '@ngx-translate/core';
import { ObjectHelper } from '../../../../helpers/object.helper';

@Component({
  selector: 'nga-period-datatable',
  templateUrl: './period.datatable.html',
})
export class PeriodDatatableComponent extends LoadingComponent implements OnInit {
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
          return this.datePeriodService.search(filters);
        },
        cols: [
          new DatatableCol('title', this.translateService.instant('Title')),
          new DatatableCol('from', this.translateService.instant('From')),
          new DatatableCol('to', this.translateService.instant('To')),
        ],
        refreshTitle: this.translateService.instant('Refresh'),
        controlPanel: true,
        controlPanelActions: [
          new DatatableAction(this.translateService.instant('Add'), 'fa fa-plus', () => {
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
    const postfix = 'Save';
    this.startLoader(postfix);
    if (this.timeFrom === '') {
      this.timeFrom = '00:00';
    }
    if (this.timeTo === '') {
      this.timeTo = '00:00';
    }
    this.datePeriod.from = `${this.dowFrom} ${this.timeFrom}`;
    this.datePeriod.to = `${this.dowTo} ${this.timeTo}`;
    this.datePeriodService.save(this.datePeriod)
      .then(() => {
        this.stopLoader(postfix);
        this.setPeriod();
        this.displayDialog = false;
        this.periodDatatable.refresh();
      })
      .catch(() => this.stopLoader(postfix));
  }

  delete() {
    this._state.notifyDataChanged('confirmDialog',
      {
        header: this.translateService.instant('Delete'),
        message: this.translateService.instant('Are you sure that you want to delete this date period?'),
        accept: () => {
          const postfix = 'Delete';
          this.startLoader(postfix);
          this.datePeriodService.destroy(this.datePeriod)
            .then(() => {
              this.stopLoader(postfix);
              this.setPeriod();
              this.displayDialog = false;
              this.periodDatatable.refresh();
            })
            .catch(() => this.stopLoader(postfix));
        },
        icon: 'fa fa-window-close-o red',
      },
    );
  }

  onRowSelect(event) {
    const datePeriod = new Period();
    ObjectHelper.clone(event.data, datePeriod);
    this.setPeriod(datePeriod);
    this.displayDialog = true;
  }

  setToDow(dow: string): void {
    this.dowTo = dow === null ? '' : dow;
  }

  setFromDow(dow: string): void {
    this.dowFrom = dow === null ? '' : dow;
  }

}
