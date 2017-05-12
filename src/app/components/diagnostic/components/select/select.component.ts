/*
 * Copyright (c) 2017
 *
 *  @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import { Component, Output, EventEmitter, Input } from '@angular/core';
import { DiagnosticService } from '../../diagnostic.service';
import { SelectItem } from 'primeng/primeng';
import { Diagnostic } from '../../diagnostic';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { Logger } from 'angular2-logger/core';

@Component({
  selector: 'select-diagnostics',
  templateUrl: './select.html'
})
export class SelectDiagnosticsComponent {

  @Output() loaded: EventEmitter<string> = new EventEmitter<string>();
  @Output() chosenDiagnosticsChange: EventEmitter<Diagnostic[]> = new EventEmitter<Diagnostic[]>();

  @Input() chosenDiagnostics: Array<Diagnostic> = [];

  dataDiagnostics: SelectItem[] = [];
  selectedDiagnostics: Array<string> = [];
  diagnostics: Array<Diagnostic> = [];

  constructor (
    private diagnosticsService: DiagnosticService,
    private loadingBar: SlimLoadingBarService,
    private _logger: Logger
  ) {
  }

  ngOnInit () {
    this.loadingBar.start();
    this.diagnosticsService.getDiagnostics().then(diagnostics => {
      this.diagnostics = diagnostics;
      this.dataDiagnostics = diagnostics.map(x => {
        return {
          label: '' + x.title,
          value: '' + x.id
        };
      });

      if (!this.selectedDiagnostics.length) {
        // to show placeholder
        this.selectedDiagnostics = [];
      }
      this.loadingBar.complete();
      this.loaded.emit();
    }).catch((err) => {
      this.loadingBar.complete();
      this._logger.error(err);
    });
  }

   onChanged(event): void {
     const diagnostics = this.diagnostics.filter(function (diagnostic) {
       return event.value.indexOf(diagnostic.id+'') !== -1;
     });

     this.chosenDiagnosticsChange.emit(diagnostics);
   }

   reloadChosenDiagnostics(diagnostics: Array<Diagnostic>): void {
     this.chosenDiagnostics = diagnostics;
     this.selectedDiagnostics = this.chosenDiagnostics.length ? this.chosenDiagnostics.map(x => x.id + '') : [];
   }
}
