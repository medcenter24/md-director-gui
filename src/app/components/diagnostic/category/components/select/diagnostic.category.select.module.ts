/*
 * Copyright (c) 2018.
 *
 * @author Zagovorychev Oleksandr <zagovorichev@gmail.com>
 */

import { AutoCompleteModule } from '../../../../ui/autosuggest';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DiagnosticCategoryService } from '../../category.service';
import { DiagnosticCategorySelectComponent } from './diagnostic.category.select.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AutoCompleteModule,
  ],
  providers: [
    DiagnosticCategoryService,
  ],
  declarations: [
    DiagnosticCategorySelectComponent,
  ],
  exports: [
    DiagnosticCategorySelectComponent,
  ],
})
export class DiagnosticCategorySelectModule {
}

