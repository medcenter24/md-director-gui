/*
 * Copyright (c) 2018.
 *
 * @author Zagovorychev Olexandr <zagovorichev@gmail.com>
 */

import { NgModule } from '@angular/core';
import { AutoCompleteComponent } from './auto.complete.component';
import { CommonModule } from '@angular/common';
import { AutoCompleteModule as ACM } from 'primeng/primeng';
import { AppTranslationModule } from '../../../app.translation.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AppTranslationModule,
    ACM,
  ],
  declarations: [
    AutoCompleteComponent,
  ],
  exports: [
    AutoCompleteComponent,
  ],
})
export class AutoCompleteModule {
}
