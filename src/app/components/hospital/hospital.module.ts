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
import { HospitalSelectComponent } from './components/select/select.component';
import { HospitalsService } from './hospitals.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AppTranslationModule,
    AutoCompleteModule,
  ],
  declarations: [
    HospitalSelectComponent,
  ],
  providers: [
    HospitalsService,
  ],
  exports: [
    HospitalSelectComponent,
  ],
})
export class HospitalModule {
}
