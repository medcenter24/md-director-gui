/*
 * Copyright (c) 2017
 *
 *  @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import { Component, Output, EventEmitter, Input, OnInit } from '@angular/core';
import { DiagnosticService } from '../../diagnostic.service';
import { SelectItem } from 'primeng/primeng';
import { Diagnostic } from '../../diagnostic';
import { Logger } from 'angular2-logger/core';

@Component({
  selector: 'nga-select-diagnostics',
  templateUrl: './select.html',
})
export class SelectDiagnosticsComponent implements OnInit {

  @Output() loaded: EventEmitter<string> = new EventEmitter<string>();
  @Output() init: EventEmitter<string> = new EventEmitter<string>();
  @Output() chosenDiagnosticsChange: EventEmitter<Diagnostic[]> = new EventEmitter<Diagnostic[]>();
  @Input() chosenDiagnostics: Diagnostic[] = [];

  isLoaded: boolean = false;
  dataDiagnostics: SelectItem[] = [];
  selectedDiagnostics: string[] = [];
  diagnostics: Diagnostic[] = [];

  constructor (
    private diagnosticsService: DiagnosticService,
    private _logger: Logger,
  ) { }

  ngOnInit () {
    this.init.emit('SelectDiagnosticsComponent');
    this.diagnosticsService.getDiagnostics().then(diagnostics => {
      this.diagnostics = diagnostics;
      this.dataDiagnostics = diagnostics.map(x => {
        return {
          label: `${x.title}`,
          value: `${x.id}`,
        };
      });

      if (!this.selectedDiagnostics.length) {
        // to show placeholder
        this.selectedDiagnostics = [];
      }
      this.isLoaded = true;
      this.loaded.emit('SelectDiagnosticsComponent');
    }).catch((err) => {
      this._logger.error(err);
      this.loaded.emit('SelectDiagnosticsComponent');
    });
  }

   onChanged(event): void {
     const diagnostics = this.diagnostics.filter(function (diagnostic) {
       const id = `${diagnostic.id}`;
       return event.value.indexOf(id) !== -1;
     });

     this.chosenDiagnosticsChange.emit(diagnostics);
   }

   reloadChosenDiagnostics(diagnostics: Diagnostic[]): void {
     this.chosenDiagnostics = diagnostics;
     this.selectedDiagnostics = this.chosenDiagnostics.length ? this.chosenDiagnostics.map(x => `${x.id}`) : [];
   }
}
