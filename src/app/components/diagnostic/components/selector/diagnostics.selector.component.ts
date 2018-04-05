/*
 * Copyright (c) 2017
 *  
 *  @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Diagnostic } from '../../diagnostic';
import { CasesService } from '../../../case/cases.service';
import { Logger } from 'angular2-logger/core';
import { LoadableComponent } from '../../../core/components/componentLoader/LoadableComponent';
import { DiagnosticSelectComponent } from '../select/diagnostic.select.component';

@Component({
  selector: 'nga-diagnostics-selector',
  templateUrl: 'selector.html',
})
export class DiagnosticsSelectorComponent extends LoadableComponent implements OnInit {
  protected componentName: string = 'DiagnosticsSelectorComponent';

  @Input() caseId: number = 0;
  @Output() changed: EventEmitter<Diagnostic[]> = new EventEmitter<Diagnostic[]>();
  @ViewChild('selectDiagnostics')
    private selectDiagnosticsComponent: DiagnosticSelectComponent;

  isLoaded: boolean = false;
  caseDiagnostics: Diagnostic[] = [];

  constructor (
    private casesService: CasesService,
    private _logger: Logger,
  ) {
    super();
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
      this.changed.emit(this.caseDiagnostics);
    }
  }

  onChange(): void {
    this.changed.emit(this.caseDiagnostics);
  }

  onSelectDiagnosticsLoaded(name): void {
    this.onLoaded(name);
    if (this.caseId) {
      this.initComponent();
      this.casesService.getCaseDiagnostics(this.caseId).then(diagnostics => {
        this.caseDiagnostics = diagnostics;
        this.selectDiagnosticsComponent.reloadChosenDiagnostics(this.caseDiagnostics);
        this.changed.emit(this.caseDiagnostics);
        this.loadedComponent();
      }).catch((err) => {
        this._logger.error(err);
        this.loadedComponent();
      });
    }
  }

  onSelectDiagnosticsInit(name): void {
    this.onInit(name);
  }

  private hasDiagnostic (diagnostic: Diagnostic): boolean {
    const result = this.caseDiagnostics.find(function (el) {
      return el.id === diagnostic.id;
    });

    return !!result;
  }
}
