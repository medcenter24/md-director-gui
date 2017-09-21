/*
 * Copyright (c) 2017.
 *
 * @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import { Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { Diagnostic } from '../../diagnostic';
import { DiagnosticCategorySelectorComponent } from '../../category/components/selector/selector.component';
import { DiagnosticService } from '../../diagnostic.service';
import { EditorEvent } from './editorEvent';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';

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

  showEditor: boolean = false;
  isInit: boolean = true;

  constructor (private service: DiagnosticService, private loadingBar: SlimLoadingBarService) {
  }

  ngOnInit () {
  }

  onSubmit (): void {
    this.loadingBar.start();
    this.service.update(this.diagnostic).then(() => {
      this.diagnosticSaved.emit(this.diagnostic);
      this.loadingBar.complete();
    }).catch(() => {
      this.loadingBar.complete();
    });
  }

  toggleEditor (categoryId): void {
    this.showEditor = !this.showEditor;
    this.openCategoryEditor.emit({show: this.showEditor, categoryId: categoryId});
  }

  onSelectorLoaded (): void {
    this.loadingBar.complete();
    if (this.isInit) {
      this.reloadCategories();
      this.isInit = false;
    }
  }

  onSelectorLoading (): void {
    this.loadingBar.start();
  }

  onSelectCategory (event): void {
    this.diagnostic.diagnostic_category_id = event;
  }

  reloadCategories (): void {
    this.categorySelectorComponent.reloadCategoriesWithCategoryId(this.diagnostic.diagnostic_category_id);
  }
}
