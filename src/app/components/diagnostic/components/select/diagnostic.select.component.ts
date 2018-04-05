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
import { LoadableComponent } from '../../../core/components/componentLoader/LoadableComponent';

@Component({
  selector: 'nga-select-diagnostics',
  templateUrl: './select.html',
})
export class DiagnosticSelectComponent extends LoadableComponent implements OnInit {

  @Output() chosenDiagnosticsChange: EventEmitter<Diagnostic[]> = new EventEmitter<Diagnostic[]>();
  @Input() chosenDiagnostics: Diagnostic[] = [];

  isLoaded: boolean = false;
  dataDiagnostics: SelectItem[] = [];
  selectedDiagnostics: string[] = [];
  diagnostics: Diagnostic[] = [];
  protected componentName: string = 'SelectDiagnosticsComponent';

  constructor (
    private diagnosticsService: DiagnosticService,
    private _logger: Logger,
  ) {
    super();
  }

  ngOnInit () {
    this.initComponent();
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
      this.loadedComponent();
    }).catch((err) => {
      this._logger.error(err);
      this.loadedComponent();
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
