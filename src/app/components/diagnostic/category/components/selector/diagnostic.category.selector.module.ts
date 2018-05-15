/*
 * Copyright (c) 2018.
 *
 * @author Zagovorychev Olexandr <zagovorichev@gmail.com>
 */

import { NgModule } from '@angular/core';
import { DiagnosticCategorySelectorComponent } from './diagnostic.category.selector.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgaModule } from '../../../../../theme/nga.module';
import { DiagnosticCategoryService } from '../../category.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgaModule,
  ],
  providers: [
    DiagnosticCategoryService,
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
