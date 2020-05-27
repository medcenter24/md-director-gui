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
import { AbstractDatatableController } from '../../../ui/tables/abstract.datatable.controller';
import { GlobalState } from '../../../../global.state';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { LoggerComponent } from '../../../core/logger/LoggerComponent';
import { TranslateService } from '@ngx-translate/core';
import { ServicesService } from '../../services.service';
import { LoadableServiceInterface } from '../../../core/loadable';
import { Service } from '../../service';
import { DatatableAction, DatatableCol, DatatableComponent, DatatableTransformer } from '../../../ui/datatable';
import { ConfirmationService } from 'primeng/api';
import { Breadcrumb } from '../../../../theme/components/baContentTop/breadcrumb';
import { Disease, DiseaseService } from '../../../disease';

@Component({
  selector: 'nga-service-datatable',
  templateUrl: './service.datatable.html',
})
export class ServiceDatatableComponent extends AbstractDatatableController {

  isActive: boolean = true;

  protected componentName: string = 'ServiceDatatableComponent';

  @ViewChild('servicesDatatable')
    protected servicesDatatableComponent: DatatableComponent;

  constructor (
    protected loadingBar: SlimLoadingBarService,
    protected _logger: LoggerComponent,
    protected _state: GlobalState,
    protected translateService: TranslateService,
    private servicesService: ServicesService,
    private confirmationService: ConfirmationService,
    public diseaseService: DiseaseService,
  ) {
    super();
  }

  protected onLangLoaded () {
    super.onLangLoaded();
    const breadcrumbs = [];
    breadcrumbs.push(new Breadcrumb('Services', '/pages/doctors/services', true));
    this._state.notifyDataChanged('menu.activeLink', breadcrumbs);
  }

  save () {
    this.model.status = this.isActive ? 'active' : 'disabled';
    super.save();
  }

  protected getTranslateService (): TranslateService {
    return this.translateService;
  }

  getDatatableComponent(): DatatableComponent {
    return this.servicesDatatableComponent;
  }

  getService(): LoadableServiceInterface {
    return this.servicesService;
  }

  getEmptyModel(): Object {
    return new Service();
  }

  getColumns(): DatatableCol[] {
    return [
      new DatatableCol('title', this.translateService.instant('Title')),
      new DatatableCol('description', this.translateService.instant('Description')),
      new DatatableCol('diseases', this.translateService.instant('Diseases')),
      new DatatableCol('type', this.translateService.instant('Type')),
    ];
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

  confirmDelete(): void {
    this.confirmationService.confirm({
      header: this.translateService.instant('Delete'),
      message: this.translateService.instant('Are you sure that you want to remove the service?'),
      accept: () => {
        this.delete();
      },
    });
  }

  protected hasCaptionPanel (): boolean {
    return true;
  }

  protected getCaptionActions (): DatatableAction[] {
    return [
      new DatatableAction(this.translateService.instant('Add'), 'fa fa-plus', () => {
        this.setModel(this.getEmptyModel());
        this.displayDialog = true;
      }),
    ];
  }

  protected setModel ( model: Object = null ): void {
    this.isActive = model && model.hasOwnProperty('status') && model['status'] === 'active';
    super.setModel( model );
  }

  getTransformers(): DatatableTransformer[] {
    const transformers = super.getTransformers();
    transformers.push(new DatatableTransformer('title', (val, row) => {
      if (row.status !== 'active') {
        const inactive = this.translateService.instant('Inactive');
        return `<span class="text-danger" title="${inactive}">${val}</span>`;
      }
      return val;
    }));
    transformers.push(new DatatableTransformer('diseases', (val, row) => {
      if (!val || !val.length) {
        const noDiseasesMsg = this.translateService.instant('no_diseases_assigned');
        return `<span class="text-muted">${noDiseasesMsg}</span>`;
      } else {
        const diseaseList = [];
        val.forEach((v: Disease) => diseaseList.push(v.title));
        return diseaseList.join(', ');
      }
    }));
    transformers.push(new DatatableTransformer('type', val => this.translateService.instant(val)));
    return transformers;
  }

  diseasesChanged(event): void {
    this.model.diseases = event;
  }
}
