/*
 * Copyright (c) 2018.
 *
 * @author Zagovorychev Olexandr <zagovorichev@gmail.com>
 */

import { NgModule } from '@angular/core';
import { PatientsComponent } from './patients.component';
import { CommonModule } from '@angular/common';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { PatientsService } from '../../patients.service';
import { DateHelper } from '../../../../helpers/date.helper';

@NgModule({
  imports: [
    CommonModule,
    Ng2SmartTableModule,
  ],
  declarations: [
    PatientsComponent,
  ],
  exports: [
    PatientsComponent,
  ],
  providers: [
    PatientsService,
    DateHelper,
  ],
})
export class PatientsModule {
}
