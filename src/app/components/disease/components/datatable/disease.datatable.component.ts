/*
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU General Public License
 * as published by the Free Software Foundation; under version 2
 * of the License (non-upgradable).
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
 *
 * Copyright (c) 2020 (original work) MedCenter24.com;
 */

import { Component, ViewChild } from '@angular/core';
import { AbstractDatatableController } from '../../../ui/tables/abstract.datatable.controller';
import { DatatableAction, DatatableCol, DatatableComponent } from '../../../ui/datatable';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { LoggerComponent } from '../../../core/logger/LoggerComponent';
import { GlobalState } from '../../../../global.state';
import { TranslateService } from '@ngx-translate/core';
import { ConfirmationService } from 'primeng/api';
import { Breadcrumb } from '../../../../theme/components/baContentTop/breadcrumb';
import { LoadableServiceInterface } from '../../../core/loadable';
import { DatatableRequestBuilder } from '../../../ui/datatable/request/datatable.request.builder';
import { RequestBuilder } from '../../../core/http/request';
import { FilterRequestField, SortRequestField } from '../../../core/http/request/fields';
import { DiseaseService } from '../../disease.service';
import { Disease } from '../../disease';

@Component({
  selector: 'nga-survey-datatable',
  templateUrl: './disease.datatable.html',
})
export class DiseaseDatatableComponent extends AbstractDatatableController {
  protected componentName: string = 'DiseaseDatatableComponent';

  @ViewChild('diseaseDatatableComponent')
  private datatable: DatatableComponent;

  constructor (
    protected loadingBar: SlimLoadingBarService,
    protected _logger: LoggerComponent,
    protected _state: GlobalState,
    protected translateService: TranslateService,
    private diseaseService: DiseaseService,
    private confirmationService: ConfirmationService,
  ) {
    super();
  }

  protected onLangLoaded () {
    super.onLangLoaded();
    const breadcrumbs = [];
    const title = this.translateService.instant('Diseases');
    breadcrumbs.push(new Breadcrumb(title, '/pages/settings/diseases', true));
    this._state.notifyDataChanged('menu.activeLink', breadcrumbs);
    this._state.notifyDataChanged('changeTitle', title);
  }

  protected getTranslateService (): TranslateService {
    return this.translateService;
  }

  protected getDatatableComponent (): DatatableComponent {
    return this.datatable;
  }

  getService(): LoadableServiceInterface {
    return this.diseaseService;
  }

  getEmptyModel(): Object {
    return new Disease();
  }

  getColumns(): DatatableCol[] {
    return [
      new DatatableCol('title', this.translateService.instant('Title')),
      new DatatableCol('description', this.translateService.instant('Description')),
      new DatatableCol('code', this.translateService.instant('Code')),
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
      message: this.translateService.instant('Are you sure that you want to perform this action?'),
      accept: () => {
        this.delete();
      },
    });
  }

  protected hasFilterRow (): boolean {
    return true;
  }

  protected getRequestBuilder (): DatatableRequestBuilder {
    const requestBuilder = super.getRequestBuilder();
    requestBuilder.setSorter(new RequestBuilder([
      new SortRequestField('title'),
    ]));
    requestBuilder.setFilter(new RequestBuilder([
      new FilterRequestField('title', null, FilterRequestField.MATCH_CONTENTS, FilterRequestField.TYPE_TEXT),
      new FilterRequestField('code', null, FilterRequestField.MATCH_CONTENTS, FilterRequestField.TYPE_TEXT),
    ]));
    return requestBuilder;
  }
}
