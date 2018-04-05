/*
 * Copyright (c) 2018.
 *
 * @author Zagovorychev Olexandr <zagovorichev@gmail.com>
 */

import { NgModule } from '@angular/core';
import { PatientEditorComponent } from './patient.editor.component';
import { CommonModule } from '@angular/common';
import { AppTranslationModule } from '../../../../app.translation.module';
import { FormsModule } from '@angular/forms';
import { InputMaskModule, InputTextareaModule, InputTextModule } from 'primeng/primeng';
import { PatientsService } from '../../patients.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AppTranslationModule,
    InputMaskModule,
    InputTextareaModule,
    InputTextModule,
  ],
  declarations: [
    PatientEditorComponent,
  ],
  providers: [
    PatientsService,
  ],
  exports: [
    PatientEditorComponent,
  ],
})
export class PatientEditorModule {
}
