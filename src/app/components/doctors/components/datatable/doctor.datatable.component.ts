/*
 * Copyright (c) 2018.
 *
 * @author Zagovorychev Olexandr <zagovorichev@gmail.com>
 */

import { Component, OnInit, ViewChild } from '@angular/core';
import { Logger } from 'angular2-logger/core';
import { TranslateService } from '@ngx-translate/core';
import { GlobalState } from '../../../../global.state';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { Doctor } from '../../doctor';
import { DoctorsService } from '../../doctors.service';
import { AbstractDatatableController } from '../../../ui/tables/abstract.datatable.controller';
import { DatatableAction, DatatableCol } from '../../../ui/datatable';
import { ObjectHelper } from '../../../../helpers/object.helper';
import { DoctorEditorComponent } from '../editor';
import { LoadableServiceInterface } from '../../../core/loadable';

@Component({
  selector: 'nga-doctor-datatable',
  templateUrl: './doctor.datatable.html',
})
export class DoctorDatatableComponent extends AbstractDatatableController implements OnInit {
  protected componentName: string = 'DoctorDatatableComponent';

  @ViewChild('doctorEditor')
  private doctorEditor: DoctorEditorComponent;

  constructor (
    protected loadingBar: SlimLoadingBarService,
    protected _logger: Logger,
    protected _state: GlobalState,
    protected translateService: TranslateService,
    private doctorsService: DoctorsService,
  ) {
    super();
  }

  getService(): LoadableServiceInterface {
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

  protected setModel(model: Object = null): void {
    this.model = model;
    if (this.displayDialog && this.doctorEditor) {
      this.doctorEditor.editDoctor(this.model);
    }
  }

  getActions(): DatatableAction[] {
    return [
      new DatatableAction(this.translateService.instant('Add'), 'fa fa-plus', () => {
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
    this.displayDialog = false;
  }

}
