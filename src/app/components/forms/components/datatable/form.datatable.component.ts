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
import { TranslateService } from '@ngx-translate/core';
import { LoadableServiceInterface } from '../../../core/loadable';
import { DatatableAction, DatatableCol, DatatableComponent } from '../../../ui/datatable';
import { Router } from '@angular/router';
import { FormService } from '../../form.service';
import { Form } from '../../form';
import { LoggerComponent } from '../../../core/logger/LoggerComponent';

@Component({
  selector: 'nga-form-datatable',
  templateUrl: './form.datatable.html',
})
export class FormDatatableComponent extends AbstractDatatableController {
  protected componentName: string = 'FormDatatableComponent';

  @ViewChild('formDatatableComponent')
  private formDatatableComponent: DatatableComponent;

  constructor (
    protected loadingBar: SlimLoadingBarService,
    protected _logger: LoggerComponent,
    protected _state: GlobalState,
    protected translateService: TranslateService,
    private formService: FormService,
    private router: Router,
  ) {
    super();
  }

  protected getDatatableComponent (): DatatableComponent {
    return this.formDatatableComponent;
  }

  protected getTranslateService (): TranslateService {
    return this.translateService;
  }

  getService(): LoadableServiceInterface {
    return this.formService;
  }

  getEmptyModel(): Object {
    return new Form();
  }

  getColumns(): DatatableCol[] {
    return [
      new DatatableCol('title', this.translateService.instant('Title')),
      new DatatableCol('formableType', this.translateService.instant('Type')),
    ];
  }

  getActions(): DatatableAction[] {
    return [
      new DatatableAction(this.translateService.instant('Add'), 'fa fa-plus', () => {
        this.setModel(this.getEmptyModel());
        this.router.navigate(['pages/settings/forms/new']).then();
      }),
    ];
  }

  protected onRowSelect(event): void {
    this.router.navigate([`pages/settings/forms/${event.data.id}`]);
  }

  getSortBy(): string {
    return 'title';
  }
}
