/*
 * Copyright (c) 2018.
 *
 * @author Zagovorychev Olexandr <zagovorichev@gmail.com>
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppTranslationModule } from '../../../../app.translation.module';
import { DatatableModule } from '../../../ui/datatable/datatable.module';
import { DialogModule } from 'primeng/dialog';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { HospitalsService } from '../../hospitals.service';
import { HospitalDatatableComponent } from './hospital.datatable.component';
import { InputTextareaModule, InputTextModule } from 'primeng/primeng';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AppTranslationModule,
    DatatableModule,
    DialogModule,
    ButtonModule,
    InputTextareaModule,
    InputTextModule,
  ],
  providers: [
    HospitalsService,
  ],
  declarations: [
    HospitalDatatableComponent,
  ],
  exports: [
    HospitalDatatableComponent,
  ],
})
export class HospitalDatatableModule {
}
