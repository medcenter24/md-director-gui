/*
 * Copyright (c) 2017.
 *
 * @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import { Component, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { DiagnosticCategory } from '../../category';
import { DiagnosticCategorySelectorComponent } from '../selector/selector.component';
import { DiagnosticCategoryService } from '../../category.service';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';

@Component({
  selector: 'diagnostic-category-editor',
  templateUrl: './editor.html'
})
export class DiagnosticCategoryEditorComponent {

  category: DiagnosticCategory;

  @Input()
  set categoryId (id: number) {
    this.loadCategory(id);
  }

  @Output() changedCategories: EventEmitter<null> = new EventEmitter<null>();

  @ViewChild(DiagnosticCategory)
  private categorySelectorComponent: DiagnosticCategorySelectorComponent;

  constructor (private service: DiagnosticCategoryService, private loadingBar: SlimLoadingBarService) {
  };

  ngOnInit (): void {
    this.setEmptyCategory();
  }

  onSubmit (): void {
    this.loadingBar.start();
    if (this.category.id) {
      this.service.update(this.category).then((category: DiagnosticCategory) => {
        this.loadingBar.complete();
        this.category = this.categorySelectorComponent.reloadCategories(category);
        this.changedCategories.emit();
      }).catch(() => {
        this.loadingBar.complete();
      });
    } else {
      this.service.create(this.category.title).then((category: DiagnosticCategory) => {
        this.category = this.categorySelectorComponent.reloadCategories(category);
        this.changedCategories.emit();
        this.loadingBar.complete();
      }).catch(() => {
        console.log('error');
        this.loadingBar.complete();
      });
    }
  }

  onCategoryChange (categoryId): void {
    this.loadCategory(categoryId);
  }

  onCreateCategory (): void {
    this.setEmptyCategory();
  }

  onSelectorLoaded (): void {
    this.loadingBar.complete();
  }

  onSelectorLoading (): void {
    this.loadingBar.start();
  }

  private setEmptyCategory (): void {
    this.category = new DiagnosticCategory(0, '');
  }

  private loadCategory (id: number): void {
    if (id) {
      this.loadingBar.start();
      this.service.getCategory(id).then((category) => {
        this.category = category;
        this.loadingBar.complete();
      }).catch(() => {
        this.loadingBar.complete();
      });
    }
  }
}
