/*
 * Copyright (c) 2018.
 *
 * @author Zagovorychev Olexandr <zagovorichev@gmail.com>
 */

import { OnInit, ViewChild } from '@angular/core';
import {
  DatatableAction,
  DatatableCol,
  DatatableComponent,
  DatatableConfig,
} from './datatable';
import { TranslateService } from '@ngx-translate/core';
import { LoadingComponent } from '../core/components/componentLoader';
import { ObjectHelper } from '../../helpers/object.helper';
import { LoadableServiceInterface } from '../core/loadable';

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
        dataProvider: (filters: Object) => {
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

  private beforeAction(name: string): void {
    this.startLoader(`${this.componentName}${name}`);
  }
  private afterAction(name: string): void {
    this.stopLoader(`${this.componentName}${name}`);
  }

  save() {
    this.beforeAction('Save');
    this.getService().save(this.model)
      .then(() => {
        this.afterAction('Save');
        this.setModel();
        this.displayDialog = false;
        this.datatable.refresh();
      })
      .catch(() => {
        this.afterAction('Save');
      });
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

  delete() {
    this.beforeAction('Delete');
    this.getService().destroy(this.model)
      .then(() => {
        this.afterAction('Delete');
        this.setModel();
        this.displayDialog = false;
        this.datatable.refresh();
      })
      .catch(() => {
        this.afterAction('Delete');
      });
  }
}
