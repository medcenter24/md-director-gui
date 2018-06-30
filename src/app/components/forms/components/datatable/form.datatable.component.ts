/*
 * Copyright (c) 2018.
 *
 * @author Zagovorychev Oleksandr <zagovorichev@gmail.com>
 */

import { Component } from '@angular/core';
import { AbstractDatatableController } from '../../../ui/tables/abstract.datatable.controller';
import { GlobalState } from '../../../../global.state';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { Logger } from 'angular2-logger/core';
import { TranslateService } from '@ngx-translate/core';
import { LoadableServiceInterface } from '../../../core/loadable';
import { DatatableAction, DatatableCol } from '../../../ui/datatable';
import { Router } from '@angular/router';
import { FormService } from '../../form.service';
import { Form } from '../../form';

@Component({
  selector: 'nga-form-datatable',
  templateUrl: './form.datatable.html',
})
export class FormDatatableComponent extends AbstractDatatableController {
  protected componentName: string = 'FormDatatableComponent';

  constructor (
    protected loadingBar: SlimLoadingBarService,
    protected _logger: Logger,
    protected _state: GlobalState,
    protected translateService: TranslateService,
    private formService: FormService,
    private router: Router,
  ) {
    super();
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
      new DatatableCol('description', this.translateService.instant('Description')),
      new DatatableCol('formable_type', this.translateService.instant('Type')),
    ];
  }

  getActions(): DatatableAction[] {
    return [
      new DatatableAction(this.translateService.instant('Add'), 'fa-plus', () => {
        this.setModel(this.getEmptyModel());
        this.router.navigate(['pages/settings/form/new']);
      }),
    ];
  }

  protected onRowSelect(event): void {
    this.router.navigate([`pages/settings/form/${event.data.id}`]);
  }

  getSortBy(): string {
    return 'title';
  }
}
