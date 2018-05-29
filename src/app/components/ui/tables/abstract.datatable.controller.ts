/*
 * Copyright (c) 2018.
 *
 * @author Zagovorychev Oleksandr <zagovorichev@gmail.com>
 */

import { OnInit, ViewChild } from '@angular/core';
import {
  DatatableAction,
  DatatableCol,
  DatatableComponent,
  DatatableConfig,
} from '../datatable/index';
import { TranslateService } from '@ngx-translate/core';
import { LoadingComponent } from '../../core/components/componentLoader/index';
import { ObjectHelper } from '../../../helpers/object.helper';
import { LoadableServiceInterface } from '../../core/loadable/index';

/**
 * Simplify the datatable injections
 */
export abstract class AbstractDatatableController extends LoadingComponent implements OnInit {

  @ViewChild('datatable')
  private datatable: DatatableComponent;

  displayDialog: boolean;
  langLoaded: boolean = false;
  datatableConfig: DatatableConfig;

  /**
   * class which describe the model
   */
  model: any;

  protected constructor (
    protected translateService: TranslateService,
  ) {
    super();
  }

  abstract getService(): LoadableServiceInterface;
  abstract getColumns(): DatatableCol[];
  abstract getActions(): DatatableAction[];
  abstract getSortBy(): string;
  abstract getEmptyModel(): Object;

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
