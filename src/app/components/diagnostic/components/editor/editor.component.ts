/*
 * Copyright (c) 2017.
 *
 * @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import { Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { Diagnostic } from '../../diagnostic';
import { DiagnosticCategorySelectorComponent } from '../../category/components/selector/selector.component';
import { SlimLoadingBarComponent } from 'ng2-slim-loading-bar';
import { DiagnosticService } from '../../diagnostic.service';

@Component({
  selector: 'diagnostic-editor',
  templateUrl: './editor.html'
})
export class DiagnosticEditorComponent {

  @Input() diagnostic: Diagnostic;
  @Output() diagnosticSaved: EventEmitter<Diagnostic> = new EventEmitter<Diagnostic>();
  @Output() openCategoryEditor: EventEmitter<EditorEvent> = new EventEmitter<EditorEvent>();
  @Output() loaded: EventEmitter<null> = new EventEmitter<null>();

  @ViewChild(DiagnosticCategorySelectorComponent)
  private categorySelectorComponent: DiagnosticCategorySelectorComponent;

  @ViewChild('loadingBarDiagnosticEditor')
  private loadingBar: SlimLoadingBarComponent;

  showEditor: boolean = false;
  isInit: boolean = true;

  constructor (private service: DiagnosticService) {
  }

  ngOnInit () {
  }

  startLoading (): void {
    this.loadingBar.color = '#209e91';
    this.loadingBar.show = true;
    this.loadingBar.service.reset();
    this.loadingBar.service.start();
  }

  completeLoading (): void {
    this.loadingBar.service.complete();
    this.loadingBar.show = false;
  }

  errorLoading (): void {
    this.loadingBar.color = '#f89711';
  }

  onSubmit (): void {
    this.startLoading();
    this.service.update(this.diagnostic).then(() => {
      this.diagnosticSaved.emit(this.diagnostic);
      this.completeLoading();
    }).catch(() => {
      this.errorLoading();
      this.completeLoading();
    });
  }

  toggleEditor (categoryId): void {
    this.showEditor = !this.showEditor;
    this.openCategoryEditor.emit({show: this.showEditor, categoryId: categoryId});
  }

  onSelectorLoaded (): void {
    this.completeLoading();
    if (this.isInit) {
      this.reloadCategories();
      this.isInit = false;
    }
  }

  onSelectorLoading (): void {
    this.startLoading();
  }

  onSelectCategory (event): void {
    this.diagnostic.diagnostic_category_id = event;
  }

  reloadCategories (): void {
    this.categorySelectorComponent.reloadCategoriesWithCategoryId(this.diagnostic.diagnostic_category_id);
  }
}

interface EditorEvent {
  show: boolean;
  categoryId: number;
}
