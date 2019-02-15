/*
 * Copyright (c) 2018.
 *
 * @author Zagovorychev Olexandr <zagovorichev@gmail.com>
 */


import { NgModule } from '@angular/core';
import { PatientDatatableComponent } from './patient.datatable.component';
import { PatientsService } from '../../patients.service';
import { DatatableModule } from '../../../ui/datatable/datatable.module';
import { CommonModule } from '@angular/common';
import { DateHelper } from '../../../../helpers/date.helper';
import { AppTranslationModule } from '../../../../app.translation.module';
import { PatientEditorModule } from '../editor';
import { DialogModule } from 'primeng/dialog';

@NgModule({
  imports: [
    CommonModule,
    DatatableModule,
    AppTranslationModule,
    PatientEditorModule,
    DialogModule,
  ],
  declarations: [
    PatientDatatableComponent,
  ],
  exports: [
    PatientDatatableComponent,
  ],
  providers: [
    PatientsService,
    DateHelper,
  ],
})
export class PatientDatatableModule {
}
