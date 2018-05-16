/*
 * Copyright (c) 2017.
 *
 * @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import { Component, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { DiagnosticCategory } from '../../category';
import { DiagnosticCategoryService } from '../../category.service';
import { LoadableComponent } from '../../../../core/components/componentLoader';
import { DiagnosticCategorySelectComponent } from '../select';

@Component({
  selector: 'nga-diagnostic-category-editor',
  templateUrl: './diagnostic.category.editor.html',
})
export class DiagnosticCategoryEditorComponent extends LoadableComponent {
  protected componentName: string = 'DiagnosticCategoryEditorComponent';

  category: DiagnosticCategory = new DiagnosticCategory();

  @Input()
  set categoryId (id: number) {
    this.loadCategoryById(id);
  }

  @Output() updated: EventEmitter<DiagnosticCategory> = new EventEmitter<DiagnosticCategory>();

  @ViewChild(DiagnosticCategorySelectComponent)
    private categorySelectComponent: DiagnosticCategorySelectComponent;

  constructor (
    private service: DiagnosticCategoryService,
  ) {
    super();
  }

  onSubmit (): void {
    const postfix = 'SaveDiagnosticCategory';
    this.startLoader(postfix);
    if (this.category.id) {
      this.service.update(this.category).then((category: DiagnosticCategory) => {
        this.stopLoader(postfix);
        this.category = category;
        this.updated.emit(category);
      }).catch(() => this.stopLoader(postfix));
    } else {
      this.service.create(this.category.title).then((category: DiagnosticCategory) => {
        this.stopLoader(postfix);
        this.category = category;
        this.updated.emit(category);
      }).catch(() => this.stopLoader(postfix));
    }
  }

  onCategoryChange (categoryId): void {
    this.loadCategoryById(categoryId);
  }

  onCreateCategory (): void {
    this.setEmptyCategory();
  }

  onSelectorLoading (): void {
    this.startLoader('Selector');
  }

  onSelectorLoaded (): void {
    this.stopLoader('Selector');
  }

  private setEmptyCategory (): void {
    this.category = new DiagnosticCategory(0, '');
  }

  loadCategoryById (id: number): void {
    id = +id;
    if (id) {
      const postfix = 'LoadCategory';
      this.startLoader(postfix);
      this.service.getCategory(id).then((category) => {
        this.stopLoader(postfix);
        this.category = category;
      }).catch(() => this.stopLoader(postfix));
    } else {
      this.category = new DiagnosticCategory();
    }
  }
}
