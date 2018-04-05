/*
 * Copyright (c) 2018.
 *
 * @author Zagovorychev Olexandr <zagovorichev@gmail.com>
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DiagnosticCategorySelectorModule } from '../selector';
import { DiagnosticCategoryEditorComponent } from './diagnostic.category.editor.component';
import { AppTranslationModule } from '../../../../../app.translation.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AppTranslationModule,
    DiagnosticCategorySelectorModule,
  ],
  declarations: [
    DiagnosticCategoryEditorComponent,
  ],
  exports: [
    DiagnosticCategoryEditorComponent,
  ],
})
export class DiagnosticCategoryEditorModule {
}
