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

import { Component, ElementRef, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { GlobalState } from '../../../../global.state';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { AbstractDatatableController } from '../../../ui/tables/abstract.datatable.controller';
import { DatatableAction, DatatableCol, DatatableComponent, DatatableTransformer } from '../../../ui/datatable';
import { ObjectHelper } from '../../../../helpers/object.helper';
import { LoadableServiceInterface } from '../../../core/loadable';
import { DiagnosticEditorComponent } from '../editor';
import { DiagnosticService } from '../../diagnostic.service';
import { Diagnostic } from '../../diagnostic';
import { LoggerComponent } from '../../../core/logger/LoggerComponent';
import { FilterMetadata } from 'primeng/api';

@Component({
  selector: 'nga-diagnostic-datatable',
  templateUrl: './diagnostic.datatable.html',
})
export class DiagnosticDatatableComponent extends AbstractDatatableController {
  protected componentName: string = 'DiagnosticDatatableComponent';

  @ViewChild('diagnosticEditor')
    private diagnosticEditor: DiagnosticEditorComponent;

  @ViewChild('diagnosticDatatableComponent')
    private diagnosticDatatableComponent: DatatableComponent;

  constructor (
    protected loadingBar: SlimLoadingBarService,
    protected _logger: LoggerComponent,
    protected _state: GlobalState,
    protected translateService: TranslateService,
    private diagnosticService: DiagnosticService,
    protected datatable: ElementRef,
  ) {
    super();
  }

  protected getDatatableComponent (): DatatableComponent {
    return this.diagnosticDatatableComponent;
  }

  protected getTranslateService (): TranslateService {
    return this.translateService;
  }

  getService(): LoadableServiceInterface {
    return this.diagnosticService;
  }

  getEmptyModel(): Object {
    return new Diagnostic();
  }

  getColumns(): DatatableCol[] {
    return [
      new DatatableCol('title', this.translateService.instant('Title')),
      new DatatableCol('description', this.translateService.instant('Description')),
      new DatatableCol('diseaseCode', this.translateService.instant('Disease Code')),
    ];
  }

  protected setModel(model: Object = null): void {
    this.model = model;
    if (this.displayDialog && this.diagnosticEditor) {
      this.diagnosticEditor.editDiagnostic(this.model);
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

  getFilters(): { [s: string]: FilterMetadata } {
    const status = { value: 'active', matchMode: 'eq' } as FilterMetadata;
    return { status };
  }

  closeDiagnosticEditor(): void {
    this.displayDialog = false;
  }

  onDiagnosticChanged(diagnostic: Diagnostic): void {
    let nDiag;
    if (!diagnostic || !this.updateModel(diagnostic)) {
      nDiag = this.getEmptyModel();
      this.refresh();
    } else {
      nDiag = ObjectHelper.clone(diagnostic, this.getEmptyModel());
    }
    this.setModel(nDiag);
    this.closeDiagnosticEditor();
  }

  protected hasCaptionPanel (): boolean {
    return true;
  }

  protected getCaptionActions (): DatatableAction[] {
    return [
      new DatatableAction(this.translateService.instant('Show hidden'), 'fa fa-toggle-on', event => {
        const btnEl = event.target.parentNode;
        let st = btnEl.className;
        const filters = this.getFiltersWithoutStatus();
        if (st.includes('ui-button-success')) { // show hidden
          st = st.replace('ui-button-success', '');
          st = st.trim();
          filters['status'] = { value: 'active', matchMode: 'eq' } as FilterMetadata;
        } else {
          // hide hidden
          st += ' ui-button-success';
        }
        this.applyFilters(filters);
        btnEl.className = st;
      }),
    ];
  }

  private getFiltersWithoutStatus(): Object {
    const newFilters = {};
    const filters = this.getDatatableComponent().getConfig().get('filters');
    Object.keys(filters).forEach(function (item: string) {
      if (item !== 'status') {
        newFilters[ item ] = filters[ item ];
      }
    });
    return newFilters;
  }

  getTransformers (): DatatableTransformer[] {
    const transformers = super.getTransformers();
    transformers.push(new DatatableTransformer('title', (val, row) => {
      if (row.status !== 'active') {
        const inactive = this.translateService.instant('Inactive');
        return `<span class="text-danger" title="${inactive}">${val}</span>`;
      }
      return val;
    }));
    return transformers;
  }
}
