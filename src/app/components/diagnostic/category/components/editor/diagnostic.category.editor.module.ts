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
import {NgaModule} from "../../../../../theme/nga.module";
import {DiagnosticSelectorModule} from "../../../components/selector";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AppTranslationModule,
    DiagnosticSelectorModule,
    DiagnosticCategorySelectorModule,
    // todo delete it?
    NgaModule,
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
