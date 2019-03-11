/*
 * Copyright (c) 2018.
 *
 * @author Zagovorychev Olexandr <zagovorichev@gmail.com>
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AutoCompleteModule } from 'primeng/primeng';
import { AppTranslationModule } from '../../../../../app.translation.module';
import { FormsTypesSelectComponent } from './forms.types.select.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AppTranslationModule,
    AutoCompleteModule,
  ],
  declarations: [
    FormsTypesSelectComponent,
  ],
  exports: [
    FormsTypesSelectComponent,
  ],
})
export class FormsTypesSelectModule {
}
