/*
 * Copyright (c) 2017.
 *
 * @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import {Component, Input, Output, EventEmitter, ViewChild} from '@angular/core';

import { Diagnostic } from './diagnostic';
import { DiagnosticService } from './diagnostic.service';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { CategorySelectorComponent } from "../categories/selector.component";

@Component({
    selector: 'diagnostic-card',
    styleUrls: ['./diagnostic.scss'],
    templateUrl: './diagnostic.html'
})
export class DiagnosticComponent {

    @Input() diagnostic: Diagnostic;
    @Output() diagnosticSaved: EventEmitter<Diagnostic> = new EventEmitter<Diagnostic>();
    @Output() openCategoryEditor: EventEmitter<EditorEvent> = new EventEmitter<EditorEvent>();
    @Output() loaded: EventEmitter<null> = new EventEmitter<null>();

    @ViewChild(CategorySelectorComponent)
        private categorySelectorComponent: CategorySelectorComponent;

    showEditor: boolean = false;
    isInit: boolean = true;

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
        if (this.isInit) {
            this.reloadCategories();
            this.isInit = false;
        }
    }

    onSelectorLoading(): void {
        this.slimLoadingBarService.reset();
        this.slimLoadingBarService.start();
    }

    onSelectCategory(event): void {
        this.diagnostic.diagnostic_category_id = event;
    }

    reloadCategories(): void {
        this.categorySelectorComponent.reloadCategoriesWithCategoryId(this.diagnostic.diagnostic_category_id);
    }
}

interface EditorEvent {
    show: boolean;
    categoryId: number;
}
