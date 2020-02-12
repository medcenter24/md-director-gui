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

import { Component, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { GlobalState } from '../../../../global.state';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { Doctor } from '../../doctor';
import { DoctorsService } from '../../doctors.service';
import { AbstractDatatableController } from '../../../ui/tables/abstract.datatable.controller';
import { DatatableAction, DatatableCol, DatatableComponent } from '../../../ui/datatable';
import { ObjectHelper } from '../../../../helpers/object.helper';
import { DoctorEditorComponent } from '../editor';
import { LoadableServiceInterface } from '../../../core/loadable';
import { LoggerComponent } from '../../../core/logger/LoggerComponent';
import { Breadcrumb } from '../../../../theme/components/baContentTop/breadcrumb';

@Component({
  selector: 'nga-doctor-datatable',
  templateUrl: './doctor.datatable.html',
})
export class DoctorDatatableComponent extends AbstractDatatableController {
  protected componentName: string = 'DoctorDatatableComponent';

  @ViewChild('doctorEditor')
  private doctorEditor: DoctorEditorComponent;

  @ViewChild('doctorDatatable')
  private doctorDatatable: DatatableComponent;

  constructor (
    protected loadingBar: SlimLoadingBarService,
    protected _logger: LoggerComponent,
    protected _state: GlobalState,
    protected translateService: TranslateService,
    private doctorsService: DoctorsService,
  ) {
    super();
  }

  protected onLangLoaded () {
    super.onLangLoaded();
    const breadcrumbs = [];
    breadcrumbs.push(new Breadcrumb('Stuff', '/pages/doctors/stuff', true));
    this._state.notifyDataChanged('menu.activeLink', breadcrumbs);
  }

  protected getDatatableComponent (): DatatableComponent {
    return this.doctorDatatable;
  }

  protected getTranslateService (): TranslateService {
    return this.translateService;
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

  protected hasControlPanel (): boolean {
    return true;
  }

  protected getControlPanelActions (): DatatableAction[] {
    return [
      new DatatableAction(this.translateService.instant('Add'), 'fa fa-plus', () => {
        this.setModel(this.getEmptyModel());
        this.displayDialog = true;
      }),
    ];
  }

  closeDoctorEditor(): void {
    this.displayDialog = false;
    this.deselectAll();
  }

  onDoctorChanged(doctor: Doctor): void {
    let nDoctor;
    if (!doctor || !this.updateModel(doctor)) {
      nDoctor = this.getEmptyModel();
      this.refresh();
    } else {
      nDoctor = ObjectHelper.clone(doctor, this.getEmptyModel());
    }
    this.setModel(nDoctor);
    this.displayDialog = false;
  }
}
