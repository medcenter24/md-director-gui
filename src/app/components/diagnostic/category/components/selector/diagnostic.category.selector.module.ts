/*
 * Copyright (c) 2018.
 *
 * @author Zagovorychev Olexandr <zagovorichev@gmail.com>
 */

import { NgModule } from '@angular/core';
import { DiagnosticCategorySelectorComponent } from './diagnostic.category.selector.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
  ],
  declarations: [
    DiagnosticCategorySelectorComponent,
  ],
  exports: [
    DiagnosticCategorySelectorComponent,
  ],
})
export class DiagnosticCategorySelectorModule {
}
