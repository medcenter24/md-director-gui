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
import { AbstractDatatableController } from '../../../../components/ui/tables/abstract.datatable.controller';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { LoggerComponent } from '../../../../components/core/logger/LoggerComponent';
import { GlobalState } from '../../../../global.state';
import {
  DatatableAction,
  DatatableCol,
  DatatableComponent,
  DatatableTransformer,
} from '../../../../components/ui/datatable';
import { LoadableServiceInterface } from '../../../../components/core/loadable';
import { TranslateService } from '@ngx-translate/core';
import { PreviewDataService } from './preview.data.service';
import { Breadcrumb } from '../../../../theme/components/baContentTop/breadcrumb';
import { FilterMetadata } from 'primeng/api';

@Component({
  selector: 'nga-development-datatable-preview',
  templateUrl: './development.datatable.preview.html',
})
export class DevelopmentDatatablePreviewComponent extends AbstractDatatableController {

  protected componentName: string = 'DevelopmentDatatablePreview';

  @ViewChild('datatableComponentView')
  protected datatableComponentView: DatatableComponent;

  constructor (
    protected loadingBar: SlimLoadingBarService,
    protected _logger: LoggerComponent,
    protected _state: GlobalState,
    private previewDataService: PreviewDataService,
    protected translateService: TranslateService,
  ) {
    super();
    const breadcrumbs = [];
    breadcrumbs.push(new Breadcrumb('Development', '/pages/development/gui'));
    breadcrumbs.push(new Breadcrumb('Datatable', `/pages/development/gui/datatable/preview`, true, false));
    this._state.notifyDataChanged('menu.activeLink', breadcrumbs);
  }

  protected getTranslateService (): TranslateService {
    return this.translateService;
  }

  getDatatableComponent(): DatatableComponent {
    return this.datatableComponentView;
  }

  getService(): LoadableServiceInterface {
    return this.previewDataService;
  }

  getColumns(): DatatableCol[] {
    return [
      new DatatableCol('title', 'Title'),
      new DatatableCol('value', 'Value'),
      new DatatableCol('icon', 'Transformed icon'),
    ];
  }

  getActions(): DatatableAction[] {
    return [
      new DatatableAction('Action', 'fa fa-plus', () => {
        this.setModel(this.getEmptyModel());
        this.displayDialog = true;
      }),
    ];
  }

  getSortBy(): string {
    return 'title';
  }

  getEmptyModel(): Object {
    return new PreviewDataService();
  }

  getTransformers (): DatatableTransformer[] {
    const transformers = super.getTransformers();
    transformers.push(new DatatableTransformer('icon', (val, row) => {
      return `<span class="text-danger" >${val}, ${row.title}</span>`;
    }));
    return transformers;
  }

  protected hasCaptionPanel(): boolean {
    return true;
  }

  protected getCaptionActions(): DatatableAction[] {
    return [
      new DatatableAction('Action', 'fa fa-download', () => {
      }),
      new DatatableAction('Setup filter', 'fa fa-gears', () => {
        const filter = { value: 'text', matchMode: 'eq' } as FilterMetadata;
        this.applyFilters({ filter });
      }),
      new DatatableAction('Clean filter', 'fa fa-gears', () => {
        this.applyFilters({});
      }),
    ];
  }
}
