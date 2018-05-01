/*
 * Copyright (c) 2018.
 *
 * @author Zagovorychev Olexandr <zagovorichev@gmail.com>
 */

import { Component, OnInit } from '@angular/core';
import { Logger } from 'angular2-logger/core';
import { TranslateService } from '@ngx-translate/core';
import { GlobalState } from '../../../../global.state';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { Doctor } from '../../doctor';
import { DoctorsService } from '../../doctors.service';
import { AbstractDatatableController } from '../../../ui/abstract.datatable.controller';
import { DatatableAction, DatatableCol, DatatableServiceInterface } from '../../../ui/datatable';
import { ObjectHelper } from '../../../../helpers/object.helper';

@Component({
  selector: 'nga-city-datatable',
  templateUrl: './doctor.datatable.html',
})
export class DoctorDatatableComponent extends AbstractDatatableController implements OnInit {
  protected componentName: string = 'DoctorDatatableComponent';

  constructor (
    protected loadingBar: SlimLoadingBarService,
    protected _logger: Logger,
    protected _state: GlobalState,
    protected translateService: TranslateService,
    private doctorsService: DoctorsService,
  ) {
    super(translateService);
  }

  getService(): DatatableServiceInterface {
    return this.doctorsService;
  }

  getEmptyModel(): Object {
    return new Doctor();
  }

  getColumns(): DatatableCol[] {
    return [
      new DatatableCol('name', this.translateService.instant('Name')),
      new DatatableCol('refKey', this.translateService.instant('Ref. Key')),
      new DatatableCol('medicalBoardNumber', this.translateService.instant('Medical Board Number')),
    ];
  }

  getActions(): DatatableAction[] {
    return [
      new DatatableAction(this.translateService.instant('Add'), 'fa-plus', () => {
        this.setModel(this.getEmptyModel());
        this.displayDialog = true;
      }),
    ];
  }

  getSortBy(): string {
    return 'name';
  }

  closeDoctorEditor(): void {
    this.displayDialog = false;
  }

  onDoctorChanged(doctor: Doctor): void {
    if (!this.updateModel(doctor)) {
      this.refresh();
    }
    this.setModel(ObjectHelper.clone(doctor, this.getEmptyModel()));
  }

}
