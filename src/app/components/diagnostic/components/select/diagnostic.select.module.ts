/*
 * Copyright (c) 2018.
 *
 * @author Zagovorychev Olexandr <zagovorichev@gmail.com>
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MultiSelectModule } from 'primeng/primeng';
import { DiagnosticSelectComponent } from './diagnostic.select.component';
import { AppTranslationModule } from '../../../../app.translation.module';
import { DiagnosticService } from '../../diagnostic.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AppTranslationModule,
    MultiSelectModule,
  ],
  providers: [
    DiagnosticService,
  ],
  declarations: [DiagnosticSelectComponent],
  exports: [DiagnosticSelectComponent],
})
export class DiagnosticSelectModule {
}
