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
import { SurveyService } from '../../survey.service';
import { LoadableServiceInterface } from '../../../core/loadable';
import { Survey } from '../../survey';
import { DatatableAction, DatatableCol } from '../../../ui/datatable';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'nga-survey-datatable',
  templateUrl: './survey.datatable.html',
})
export class SurveyDatatableComponent extends AbstractDatatableController {
  protected componentName: string = 'SurveyDatatableComponent';

  constructor (
    protected loadingBar: SlimLoadingBarService,
    protected _logger: Logger,
    protected _state: GlobalState,
    protected translateService: TranslateService,
    private surveyService: SurveyService,
    private confirmationService: ConfirmationService,
  ) {
    super();
  }

  getService(): LoadableServiceInterface {
    return this.surveyService;
  }

  getEmptyModel(): Object {
    return new Survey();
  }

  getColumns(): DatatableCol[] {
    return [
      new DatatableCol('title', this.translateService.instant('Title')),
      new DatatableCol('description', this.translateService.instant('Description')),
    ];
  }

  getActions(): DatatableAction[] {
    return [
      new DatatableAction(this.translateService.instant('Add'), 'fa-plus', () => {
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
      message: this.translateService.instant('Are you sure that you want to perform this action?'),
      accept: () => {
        this.delete();
      },
    });
  }
}
