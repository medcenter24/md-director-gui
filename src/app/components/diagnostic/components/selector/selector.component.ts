/*
 * Copyright (c) 2017
 *  
 *  @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { SelectDiagnosticsComponent } from '../select/select.component';
import { Diagnostic } from '../../diagnostic';
import { CasesService } from '../../../case/cases.service';
import { Logger } from 'angular2-logger/core';

@Component({
  selector: 'nga-diagnostics-selector',
  templateUrl: 'selector.html',
})
export class DiagnosticsSelectorComponent implements OnInit {

  @Input() caseId: number = 0;
  @Output() changed: EventEmitter<Diagnostic[]> = new EventEmitter<Diagnostic[]>();
  @Output() init: EventEmitter<string> = new EventEmitter<string>();
  @Output() loaded: EventEmitter<string> = new EventEmitter<string>();

  @ViewChild('selectDiagnostics')
    private selectDiagnosticsComponent: SelectDiagnosticsComponent;

  isLoaded: boolean = false;
  caseDiagnostics: Diagnostic[] = [];

  constructor (
    private casesService: CasesService,
    private _logger: Logger,
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
      this.changed.emit(this.caseDiagnostics);
    }
  }

  onChange(): void {
    this.changed.emit(this.caseDiagnostics);
  }

  onSelectDiagnosticsLoaded(name): void {
    this.loaded.emit(name);
    if (this.caseId) {
      this.init.emit('DiagnosticsSelectorComponent');
      this.casesService.getCaseDiagnostics(this.caseId).then(diagnostics => {
        this.caseDiagnostics = diagnostics;
        this.selectDiagnosticsComponent.reloadChosenDiagnostics(this.caseDiagnostics);
        this.changed.emit(this.caseDiagnostics);
        this.loaded.emit('DiagnosticsSelectorComponent');
      }).catch((err) => {
        this._logger.error(err);
        this.loaded.emit('DiagnosticsSelectorComponent');
      });
    }
  }

  onSelectDiagnosticsInit(name): void {
    this.init.emit(name);
  }

  private hasDiagnostic (diagnostic: Diagnostic): boolean {
    const result = this.caseDiagnostics.find(function (el) {
      return el.id === diagnostic.id;
    });

    return !!result;
  }
}
