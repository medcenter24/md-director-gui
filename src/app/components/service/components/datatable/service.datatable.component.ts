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

import { Component } from '@angular/core';
import { AbstractDatatableController } from '../../../ui/tables/abstract.datatable.controller';
import { GlobalState } from '../../../../global.state';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { Logger } from 'angular2-logger/core';
import { TranslateService } from '@ngx-translate/core';
import { ServicesService } from '../../services.service';
import { LoadableServiceInterface } from '../../../core/loadable';
import { Service } from '../../service';
import { DatatableAction, DatatableCol } from '../../../ui/datatable';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'nga-service-datatable',
  templateUrl: './service.datatable.html',
})
export class ServiceDatatableComponent extends AbstractDatatableController {
  protected componentName: string = 'ServiceDatatableComponent';

  constructor (
    protected loadingBar: SlimLoadingBarService,
    protected _logger: Logger,
    protected _state: GlobalState,
    protected translateService: TranslateService,
    private servicesService: ServicesService,
    private confirmationService: ConfirmationService,
  ) {
    super();
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
      new DatatableCol('diseaseCode', this.translateService.instant('Disease Code')),
      new DatatableCol('type', this.translateService.instant('Type')),
    ];
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
    return 'title';
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
}
