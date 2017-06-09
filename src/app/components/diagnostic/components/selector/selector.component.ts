/*
 * Copyright (c) 2017
 *  
 *  @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import { Component, Input, ViewChild } from '@angular/core';
import { SelectDiagnosticsComponent } from '../select/select.component';
import { Diagnostic } from '../../diagnostic';
import { CasesService } from '../../../case/cases.service';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { Logger } from 'angular2-logger/core';

@Component({
  selector: 'diagnostics-selector',
  templateUrl: 'selector.html'
})
export class DiagnosticsSelectorComponent {

  @Input() caseId: number = 0;

  @ViewChild('selectDiagnostics')
    private selectDiagnosticsComponent: SelectDiagnosticsComponent;

  isLoaded: boolean = false;
  caseDiagnostics: Array<Diagnostic> = [];

  constructor (
    private casesService: CasesService,
    private loadingBar: SlimLoadingBarService,
    private _logger: Logger
  ) {
  }

  ngOnInit () {
    this.isLoaded = true;
  }

  onDelete (diagnostic: Diagnostic): void {
    if (this.hasDiagnostic(diagnostic)) {
      this.caseDiagnostics = this.caseDiagnostics.filter(function (el) {
        return el.id !== diagnostic.id;
      });
      this.selectDiagnosticsComponent.reloadChosenDiagnostics(this.caseDiagnostics);
    }
  }

  onSelectDiagnosticsLoaded(): void {
    if (this.caseId) {
      this.loadingBar.start();
      this.casesService.getCaseDiagnostics(this.caseId).then(diagnostics => {
        this.caseDiagnostics = diagnostics;
        this.selectDiagnosticsComponent.reloadChosenDiagnostics(this.caseDiagnostics);
        this.loadingBar.complete();
      }).catch((err) => {
        this.loadingBar.complete();
        this._logger.error(err);
      });
    }
  }

  private hasDiagnostic (diagnostic: Diagnostic): boolean {
    const result = this.caseDiagnostics.find(function (el) {
      return el.id === diagnostic.id;
    });

    return !!result;
  }
}
