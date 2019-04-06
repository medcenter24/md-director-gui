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
import { Logger } from 'angular2-logger/core';
import { TranslateService } from '@ngx-translate/core';
import { GlobalState } from '../../../../global.state';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { Hospital } from '../../hospital';
import { HospitalsService } from '../../hospitals.service';
import { DatatableAction, DatatableCol, DatatableComponent, DatatableConfig } from '../../../ui/datatable';

@Component({
  selector: 'nga-hospital-datatable',
  templateUrl: './hospital.datatable.html',
})
export class HospitalDatatableComponent extends LoadingComponent implements OnInit {
  protected componentName: string = 'HospitalDatatableComponent';

  @ViewChild('datatable')
    private datatable: DatatableComponent;

  displayDialog: boolean;
  langLoaded: boolean = false;
  datatableConfig: DatatableConfig;

  hospital: Hospital;

  constructor(
    protected loadingBar: SlimLoadingBarService,
    protected _logger: Logger,
    protected _state: GlobalState,
    protected translateService: TranslateService,
    private hospitalService: HospitalsService,
  ) {
    super();
  }

  ngOnInit() {
    this.translateService.get('Yes').subscribe(() => {
      this.langLoaded = true;
      this.datatableConfig = DatatableConfig.factory({
        dataProvider: (filters: Object) => {
          return this.hospitalService.search(filters);
        },
        cols: [
          new DatatableCol('title', this.translateService.instant('Title')),
          new DatatableCol('refKey', this.translateService.instant('Ref. Key')),
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
        sortBy: 'title',
      });
    });
  }

  showDialogToAdd() {
    this.setHospital(new Hospital());
    this.displayDialog = true;
  }

  private setHospital(hospital: Hospital = null): void {
    this.hospital = hospital;
  }

  save() {
    const postfix = 'Save';
    this.startLoader(postfix);
    this.hospitalService.save(this.hospital)
      .then(() => {
        this.stopLoader(postfix);
        this.setHospital();
        this.displayDialog = false;
        this.datatable.refresh();
      })
      .catch(() => {
        this.stopLoader(postfix);
      });
  }

  onRowSelect(event) {
    this.setHospital(this.cloneHospital(event.data));
    this.displayDialog = true;
  }

  cloneHospital(hospital: Hospital): Hospital {
    const hospital1 = new Hospital();
    for (const prop of Object.keys(hospital)) {
      hospital1[prop] = hospital[prop];
    }
    return hospital1;
  }

  delete() {
    this._state.notifyDataChanged('confirmDialog',
      {
        header: this.translateService.instant('Delete'),
        message: this.translateService.instant('Are you sure that you want to delete this hospital?'),
        accept: () => {
          const postfix = 'Delete';
          this.startLoader(postfix);
          this.hospitalService.destroy(this.hospital)
            .then(() => {
              this.stopLoader(postfix);
              this.setHospital();
              this.displayDialog = false;
              this.datatable.refresh();
            })
            .catch(() => {
              this.stopLoader(postfix);
            });
        },
        icon: 'fa fa-window-close-o red',
      },
    );
  }
}
