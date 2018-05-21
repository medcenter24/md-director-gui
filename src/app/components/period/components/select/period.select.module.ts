/*
 * Copyright (c) 2018.
 *
 * @author Zagovorychev Oleksandr <zagovorichev@gmail.com>
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AutoCompleteModule } from '../../../ui/autosuggest';
import { PeriodSelectComponent } from './period.select.component';
import { PeriodService } from '../../period.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AutoCompleteModule,
  ],
  providers: [
    PeriodService,
  ],
  declarations: [
    PeriodSelectComponent,
  ],
  exports: [
    PeriodSelectComponent,
  ],
})
export class PeriodSelectModule {
}
