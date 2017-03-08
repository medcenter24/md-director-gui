/*
 * Copyright (c) 2017.
 *
 * @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import {Component, Input, Output, EventEmitter} from '@angular/core';

import { Diagnostic } from './diagnostic';
import { DiagnosticService } from './diagnostic.service';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';


@Component({
    selector: 'diagnostic-card',
    styleUrls: ['./diagnostic.scss'],
    templateUrl: './diagnostic.html'
})
export class DiagnosticComponent {

    @Input() diagnostic: Diagnostic;
    @Output() diagnosticSaved: EventEmitter<Diagnostic> = new EventEmitter<Diagnostic>();
    @Output() openCategoryEditor: EventEmitter<EditorEvent> = new EventEmitter<EditorEvent>();
    @Output() loaded: EventEmitter<boolean> = new EventEmitter<boolean>();

    showEditor: boolean = false;

    constructor (
        private service: DiagnosticService,
        private slimLoadingBarService: SlimLoadingBarService
    ) { }

    ngOnInit() {}

    onSubmit(): void {
        this.diagnosticSaved.emit(this.diagnostic);
    }

    toggleEditor(categoryId): void {
        this.showEditor = !this.showEditor;
        this.openCategoryEditor.emit({show: this.showEditor, categoryId: categoryId})
    }

    onSelectorLoaded(): void {
        this.slimLoadingBarService.complete();
    }

    onSelectorLoading(): void {
        this.slimLoadingBarService.reset();
        this.slimLoadingBarService.start();
    }
}

interface EditorEvent {
    show: boolean;
    categoryId: number;
}
