/*
 * Copyright (c) 2017.
 *
 * @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import {Component, Input, Output, EventEmitter} from '@angular/core';

import { Diagnostic } from './diagnostic';
import { DiagnosticService } from './diagnostic.service';

@Component({
    selector: 'diagnostic-card',
    templateUrl: './diagnostic.html'
})
export class DiagnosticComponent {

    @Input() diagnostic: Diagnostic;
    @Output() diagnosticSaved: EventEmitter<Diagnostic> = new EventEmitter<Diagnostic>();

    constructor (
        private diagnosticService: DiagnosticService
    ) { }

    onSubmit() {
        this.diagnosticSaved.emit(this.diagnostic);
    }
}
