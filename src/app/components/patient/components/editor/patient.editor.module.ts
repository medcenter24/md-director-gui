/*
 * Copyright (c) 2018.
 *
 * @author Zagovorychev Oleksandr <zagovorichev@gmail.com>
 */

import { NgModule } from '@angular/core';
import { PatientEditorComponent } from './patient.editor.component';
import { CommonModule } from '@angular/common';
import { AppTranslationModule } from '../../../../app.translation.module';
import { FormsModule } from '@angular/forms';
import { ButtonModule, InputMaskModule, InputTextareaModule, InputTextModule } from 'primeng/primeng';
import { PatientsService } from '../../patients.service';
import { DateHelper } from '../../../../helpers/date.helper';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AppTranslationModule,
    InputMaskModule,
    InputTextareaModule,
    InputTextModule,
    ButtonModule,
  ],
  declarations: [
    PatientEditorComponent,
  ],
  providers: [
    PatientsService,
    DateHelper,
  ],
  exports: [
    PatientEditorComponent,
  ],
})
export class PatientEditorModule {
}
