/*
 * Copyright (c) 2017.
 *
 * @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import { Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { Diagnostic } from '../../diagnostic';
import { DiagnosticService } from '../../diagnostic.service';
import { LoadableComponent } from '../../../core/components/componentLoader';
import { DiagnosticCategorySelectComponent } from '../../category/components/select';
import { DiagnosticCategory } from '../../category/category';
import { DiagnosticCategoryEditorComponent } from '../../category/components/editor';

@Component({
  selector: 'nga-diagnostic-editor',
  templateUrl: './diagnostic.editor.html',
})
export class DiagnosticEditorComponent extends LoadableComponent {
  protected componentName: string = 'DiagnosticEditorComponent';

  @Input() diagnostic: Diagnostic = new Diagnostic();
  @Output() diagnosticSaved: EventEmitter<Diagnostic> = new EventEmitter<Diagnostic>();
  @Output() close: EventEmitter<null> = new EventEmitter<null>();

  @ViewChild(DiagnosticCategorySelectComponent)
    private categorySelectComponent: DiagnosticCategorySelectComponent;

  @ViewChild('diagnosticCategoryEditor')
    private diagnosticCategoryEditor: DiagnosticCategoryEditorComponent;

  showEditor: boolean = false;

  constructor(private service: DiagnosticService) {
    super();
  }

  onSubmit(): void {
    const opName = 'UpdateDiagnostic';
    this.startLoader(opName);
    this.service.save(this.diagnostic).then((diagnostic: Diagnostic) => {
      this.diagnostic = diagnostic;
      this.diagnosticSaved.emit(this.diagnostic);
      this.stopLoader(opName);
    }).catch(() => this.stopLoader(opName));
  }

  toggleEditor(): void {
    this.showEditor = !this.showEditor;
  }

  editDiagnostic(diagnostic: Diagnostic): void {
    if (this.diagnostic !== diagnostic) {
      this.showEditor = false;
    }
    this.diagnostic = diagnostic;
  }

  closeEditor(): void {
    this.close.emit();
  }

  onDiagnosticCategoryChanged(diagnosticCategory: DiagnosticCategory): void {
    if (this.diagnostic.diagnosticCategoryId !== diagnosticCategory.id && this.showEditor) {
      this.showEditor = false;
    }
    this.diagnostic.diagnosticCategoryId = diagnosticCategory.id;
  }

  onDiagnosticCategorySubmit (dc: DiagnosticCategory): void {
    this.showEditor = false;
    this.diagnostic.diagnosticCategoryId = dc.id;
    this.categorySelectComponent.selectItems(dc.id);
  }
}
