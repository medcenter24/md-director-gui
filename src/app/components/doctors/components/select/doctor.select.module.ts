/*
 * Copyright (c) 2018.
 *
 * @author Zagovorychev Olexandr <zagovorichev@gmail.com>
 */

import { NgModule } from '@angular/core';
import { DoctorSelectComponent } from './doctor.select.component';
import { DoctorsService } from '../../doctors.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AutoCompleteModule } from '../../../ui/autosuggest';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AutoCompleteModule,
  ],
  declarations: [
    DoctorSelectComponent,
  ],
  providers: [
    DoctorsService,
  ],
  exports: [
    DoctorSelectComponent,
  ],
})
export class DoctorSelectModule {
}
