/*
 * Copyright (c) 2018.
 *
 * @author Zagovorychev Olexandr <zagovorichev@gmail.com>
 */

import { NgModule } from '@angular/core';
import { AppTranslationModule } from '../../app.translation.module';
import { AutoCompleteModule } from 'primeng/primeng';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DoctorSelectComponent } from './select/select.component';
import { DoctorsService } from './doctors.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AppTranslationModule,
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
export class DoctorModule {
}
