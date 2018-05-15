/*
 * Copyright (c) 2017.
 *
 * @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import { Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { Diagnostic } from '../../diagnostic';
import { DiagnosticService } from '../../diagnostic.service';
import { EditorEvent } from './editorEvent';
import { DiagnosticCategorySelectorComponent }
  from '../../category/components/selector/diagnostic.category.selector.component';
import { LoadableComponent } from '../../../core/components/componentLoader';

@Component({
  selector: 'nga-diagnostic-editor',
  templateUrl: './editor.html',
})
export class DiagnosticEditorComponent extends LoadableComponent {
  protected componentName: string = 'DiagnosticEditorComponent';

  @Input() diagnostic: Diagnostic;
  @Output() diagnosticSaved: EventEmitter<Diagnostic> = new EventEmitter<Diagnostic>();
  @Output() openCategoryEditor: EventEmitter<EditorEvent> = new EventEmitter<EditorEvent>();
  @Output() close: EventEmitter<null> = new EventEmitter<null>();

  @ViewChild(DiagnosticCategorySelectorComponent)
  private categorySelectorComponent: DiagnosticCategorySelectorComponent;

  showEditor: boolean = false;
  isInit: boolean = true;

  constructor(private service: DiagnosticService) {
    super();
  }

  onSubmit(): void {
    const opName = 'UpdateDiagnostic';
    this.startLoader(opName);
    this.service.update(this.diagnostic).then(() => {
      this.diagnosticSaved.emit(this.diagnostic);
      this.stopLoader(opName);
    }).catch(() => this.stopLoader(opName));
  }

  toggleEditor(categoryId): void {
    this.showEditor = !this.showEditor;
    this.openCategoryEditor.emit({ show: this.showEditor, categoryId });
  }

  onSelectorLoading(): void {
    this.startLoader('LoadSelector');
  }

  onSelectorLoaded(): void {
    this.stopLoader('LoadSelector');
    if (this.isInit) {
      this.reloadCategories();
      this.isInit = false;
    }
  }

  reloadCategories(): void {
    this.categorySelectorComponent.reloadCategoriesWithCategoryId(this.diagnostic.diagnosticCategoryId);
  }

  closeEditor(): void {
    this.close.emit();
  }

  onSelectCategory(event): void {
    this.diagnostic.diagnosticCategoryId = event;
  }
}
