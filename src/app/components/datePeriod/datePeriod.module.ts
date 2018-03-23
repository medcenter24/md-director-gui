/*
 * Copyright (c) 2018.
 *
 * @author Zagovorychev Olexandr <zagovorichev@gmail.com>
 */

import { NgModule } from '@angular/core';
import { DatePeriodSimpleSelectComponent } from './components/simpleSelect/datePeriodSimpleSelect.component';
import { AppTranslationModule } from '../../app.translation.module';

@NgModule({
  imports: [
    AppTranslationModule,
  ],
  declarations: [
    DatePeriodSimpleSelectComponent,
  ],
  providers: [],
  exports: [
    DatePeriodSimpleSelectComponent,
  ],
})
export class DatePeriodModule { }
