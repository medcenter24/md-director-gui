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

import { OnInit, ViewChild } from '@angular/core';
import {
    DatatableAction,
    DatatableCol,
    DatatableComponent,
    DatatableConfig, DatatableTransformer,
} from '../datatable';
import { TranslateService } from '@ngx-translate/core';
import { LoadingComponent } from '../../core/components/componentLoader';
import { ObjectHelper } from '../../../helpers/object.helper';
import { LoadableServiceInterface } from '../../core/loadable';

export abstract class AbstractDatatableController extends LoadingComponent implements OnInit {

/**
 * Simplify the datatable injections
 */
  @ViewChild('datatable')
  private datatable: DatatableComponent;

  displayDialog: boolean;
  langLoaded: boolean = false;
  datatableConfig: DatatableConfig;

  /**
   * class which describe the model
   */
  model: any;

  protected abstract translateService: TranslateService;
  abstract getService(): LoadableServiceInterface;
  abstract getColumns(): DatatableCol[];
  abstract getActions(): DatatableAction[];
  abstract getSortBy(): string;
  abstract getEmptyModel(): Object;

  /**
   * @return {DatatableTransformer[]}
   */
  getTransformers(): DatatableTransformer[] {
    return [];
  }

  ngOnInit() {
    this.translateService.get('Yes').subscribe(() => {
      this.langLoaded = true;
      this.datatableConfig = DatatableConfig.factory({
        dataProvider: (filters: any) => {
          return this.getService().search(filters);
        },
        cols: this.getColumns(),
        refreshTitle: this.translateService.instant('Refresh'),
        controlPanel: true,
        controlPanelActions: this.getActions(),
        onRowSelect: event => {
          this.onRowSelect(event);
        },
        sortBy: this.getSortBy(),
        transformers: this.getTransformers(),
      });
    });
  }

  protected setModel(model: Object = null): void {
    this.model = model;
  }

  save() {
    const postfix = 'Save';
    this.startLoader(postfix);
    this.getService().save(this.model)
      .then((model: Object) => {
        this.stopLoader(postfix);
        this.displayDialog = false;
        if (!this.model.id) {
          // refresh on adding
          this.refresh();
        } else {
          this.updateModel(model);
        }
        // to close popup
        this.setModel();
      })
      .catch(() => this.stopLoader(postfix));
  }

  protected onRowSelect(event) {
    if (this.model && event.data && this.model.id === event.data.id && this.displayDialog) {
      // do nothing, already opened
    } else {
      this.setModel(this.cloneModel(event.data));
      this.displayDialog = true;
    }
  }

  protected cloneModel(model: Object): Object {
    const cloned = this.getEmptyModel();
    ObjectHelper.clone(model, cloned);
    return cloned;
  }

  refresh(): void {
    this.datatable.refresh();
  }

  updateModel(model: Object): boolean {
    return this.datatable.updateModel(model);
  }

  delete(): void {
    const postfix = 'Delete';
    this.startLoader(postfix);
    this.getService().destroy(this.model)
      .then(() => {
        this.stopLoader(postfix);
        this.setModel();
        this.displayDialog = false;
        this.datatable.refresh();
      })
      .catch(() => this.stopLoader(postfix));
  }
}
