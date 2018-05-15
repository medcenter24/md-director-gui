/*
 * Copyright (c) 2018.
 *
 * @author Zagovorychev Olexandr <zagovorichev@gmail.com>
 */

import { NgModule } from '@angular/core';
import { DoctorDatatableComponent } from './doctor.datatable.component';
import { CommonModule } from '@angular/common';
import { AppTranslationModule } from '../../../../app.translation.module';
import { DatatableModule } from '../../../ui/datatable';
import { FormsModule } from '@angular/forms';
import { DoctorsService } from '../../doctors.service';
import { DoctorEditorModule } from '../editor';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AppTranslationModule,
    DatatableModule,
    DoctorEditorModule,
  ],
  providers: [
    DoctorsService,
  ],
  declarations: [
    DoctorDatatableComponent,
  ],
  exports: [
    DoctorDatatableComponent,
  ],
})
export class DoctorDatatableModule {
}
