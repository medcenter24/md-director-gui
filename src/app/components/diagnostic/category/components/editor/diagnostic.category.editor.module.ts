/*
 * Copyright (c) 2018.
 *
 * @author Zagovorychev Olexandr <zagovorichev@gmail.com>
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DiagnosticCategoryEditorComponent } from './diagnostic.category.editor.component';
import { AppTranslationModule } from '../../../../../app.translation.module';
import { NgaModule } from '../../../../../theme/nga.module';
import { DiagnosticSelectorModule } from '../../../components/selector';
import { ButtonModule } from 'primeng/button';
import { DiagnosticCategorySelectModule } from '../select';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AppTranslationModule,
    DiagnosticSelectorModule,
    DiagnosticCategorySelectModule,
    NgaModule,
    ButtonModule,
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
