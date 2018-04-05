/*
 * Copyright (c) 2018.
 *
 * @author Zagovorychev Olexandr <zagovorichev@gmail.com>
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppTranslationModule } from '../../../../app.translation.module';
import { DiagnosticCategoryEditorModule } from '../../category/components/editor';
import { DiagnosticEditorComponent } from './diagnostic.editor.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AppTranslationModule,
    DiagnosticCategoryEditorModule,
  ],
  declarations: [
    DiagnosticEditorComponent,
  ],
  exports: [
    DiagnosticEditorComponent,
  ],
})
export class DiagnosticEditorModule {
}
