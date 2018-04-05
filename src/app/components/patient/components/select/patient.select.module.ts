/*
 * Copyright (c) 2018.
 *
 * @author Zagovorychev Olexandr <zagovorichev@gmail.com>
 */

import { NgModule } from '@angular/core';
import { PatientSelectComponent } from './patient.select.component';
import { AutoCompleteModule } from 'primeng/primeng';
import { AppTranslationModule } from '../../../../app.translation.module';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AppTranslationModule,
    AutoCompleteModule,
  ],
  declarations: [
    PatientSelectComponent,
  ],
  exports: [
    PatientSelectComponent,
  ],
})
export class PatientSelectModule {
}
