/*
 * Copyright (c) 2018.
 *
 * @author Zagovorychev Olexandr <zagovorichev@gmail.com>
 */

import { Component, OnInit, ViewChild } from '@angular/core';
import { Logger } from 'angular2-logger/core';
import { TranslateService } from '@ngx-translate/core';
import { GlobalState } from '../../../../global.state';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { AbstractDatatableController } from '../../../ui/abstract.datatable.controller';
import { DatatableAction, DatatableCol } from '../../../ui/datatable';
import { ObjectHelper } from '../../../../helpers/object.helper';
import { LoadableServiceInterface } from '../../../core/loadable';
import { DiagnosticEditorComponent } from '../editor';
import { DiagnosticService } from '../../diagnostic.service';
import { Diagnostic } from '../../diagnostic';

@Component({
  selector: 'nga-diagnostic-datatable',
  templateUrl: './diagnostic.datatable.html',
})
export class DiagnosticDatatableComponent extends AbstractDatatableController implements OnInit {
  protected componentName: string = 'DoctorDatatableComponent';

  @ViewChild('diagnosticEditor')
  private diagnosticEditor: DiagnosticEditorComponent;

  constructor (
    protected loadingBar: SlimLoadingBarService,
    protected _logger: Logger,
    protected _state: GlobalState,
    protected translateService: TranslateService,
    private diagnosticService: DiagnosticService,
  ) {
    super(translateService);
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
    return 'name';
  }

  closeDoctorEditor(): void {
    this.displayDialog = false;
  }

  onDiagnosticChanged(diagnostic: Diagnostic): void {
    if (!this.updateModel(diagnostic)) {
      this.refresh();
    }
    this.setModel(ObjectHelper.clone(diagnostic, this.getEmptyModel()));
  }

}
