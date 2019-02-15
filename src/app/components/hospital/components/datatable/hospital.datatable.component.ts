/*
 * Copyright (c) 2018.
 *
 * @author Zagovorychev Olexandr <zagovorichev@gmail.com>
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
    this.startLoader(`${this.componentName}Save`);
    this.hospitalService.save(this.hospital)
      .then(() => {
        this.stopLoader(`${this.componentName}Save`);
        this.setHospital();
        this.displayDialog = false;
        this.datatable.refresh();
      })
      .catch(() => {
        this.stopLoader(`${this.componentName}Save`);
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
    this.startLoader(`${this.componentName}Delete`);
    this.hospitalService.destroy(this.hospital)
      .then(() => {
        this.stopLoader(`${this.componentName}Delete`);
        this.setHospital();
        this.displayDialog = false;
        this.datatable.refresh();
      })
      .catch(() => {
        this.stopLoader(`${this.componentName}Delete`);
      });
  }
}
