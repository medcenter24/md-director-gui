/*
 * Copyright (c) 2018.
 *
 * @author Zagovorychev Olexandr <zagovorichev@gmail.com>
 */

import { NgModule } from '@angular/core';
import { PatientSelectModule } from '../select/patient.select.module';
import { PatientSelectorComponent } from './patient.selector.component';
import { CommonModule } from '@angular/common';
import { AppTranslationModule } from '../../../../app.translation.module';
import { FormsModule } from '@angular/forms';
import { PatientsService } from '../../patients.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AppTranslationModule,
    PatientSelectModule,
  ],
  providers: [
    PatientsService,
  ],
  declarations: [
    PatientSelectorComponent,
  ],
  exports: [
    PatientSelectorComponent,
  ],
})
export class PatientSelectorModule {
}
