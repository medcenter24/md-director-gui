/*
 * Copyright (c) 2018.
 *
 * @author Zagovorychev Olexandr <zagovorichev@gmail.com>
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppTranslationModule } from '../../../../app.translation.module';
import { DiagnosticSelectModule } from '../select';
import { DiagnosticsSelectorComponent } from './diagnostics.selector.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AppTranslationModule,
    DiagnosticSelectModule,
  ],
  declarations: [DiagnosticsSelectorComponent],
  exports: [DiagnosticsSelectorComponent],
})
export class DiagnosticSelectorModule {
}
