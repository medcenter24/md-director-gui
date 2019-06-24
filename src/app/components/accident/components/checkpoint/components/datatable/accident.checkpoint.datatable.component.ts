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
import { DatatableCol } from '../../../../../ui/datatable';
import { DatatableAction } from '../../../../../ui/datatable';
import { TranslateService } from '@ngx-translate/core';
import { Logger } from 'angular2-logger/core';
import { GlobalState } from '../../../../../../global.state';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { DatatableComponent } from '../../../../../ui/datatable';
import { AccidentCheckpoint } from '../../checkpoint';
import { AccidentCheckpointsService } from '../../checkpoints.service';
import { AbstractDatatableController } from '../../../../../ui/tables/abstract.datatable.controller';
import { ConfirmationService } from 'primeng/api';
import { LoadableServiceInterface } from '../../../../../core/loadable';

@Component({
  selector: 'nga-accident-checkpoint-datatable',
  templateUrl: './accident.checkpoint.datatable.html',
})
export class AccidentCheckpointDatatableComponent extends AbstractDatatableController {

  protected componentName: string = 'AccidentCheckpointDatatableComponent';

  @ViewChild('checkpointDatatableComponent')
    private checkpointDatatableComponent: DatatableComponent;

  constructor(
    protected _logger: Logger,
    protected _state: GlobalState,
    protected loadingBar: SlimLoadingBarService,
    private translateService: TranslateService,
    private checkpointService: AccidentCheckpointsService,
    private confirmationService: ConfirmationService,
  ) {
    super();
  }

  protected getTranslateService (): TranslateService {
    return this.translateService;
  }

  protected getDatatableComponent (): DatatableComponent {
    return this.checkpointDatatableComponent;
  }

  getService (): LoadableServiceInterface {
    return this.checkpointService;
  }

  getEmptyModel (): Object {
    return new AccidentCheckpoint();
  }

  getColumns (): DatatableCol[] {
    return [
      new DatatableCol('title', this.translateService.instant('Title')),
      new DatatableCol('description', this.translateService.instant('Description')),
    ];
  }

  getActions (): DatatableAction[] {
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
      message: this.translateService.instant('Are you sure that you want to delete this checkpoint?'),
      accept: () => {
        this.delete();
      },
    });
  }
}

