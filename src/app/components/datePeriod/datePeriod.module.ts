/*
 * Copyright (c) 2018.
 *
 * @author Zagovorychev Olexandr <zagovorichev@gmail.com>
 */

import { NgModule } from '@angular/core';
import { DatePeriodSimpleSelectComponent } from './components/simpleSelect/datePeriodSimpleSelect.component';
import { AppTranslationModule } from '../../app.translation.module';
import { DatePeriodListComponent } from './components/list/datePeriodList.component';
import { TableModule } from 'primeng/table';

@NgModule({
  imports: [
    AppTranslationModule,
    TableModule,
  ],
  declarations: [
    DatePeriodSimpleSelectComponent,
    DatePeriodListComponent,
  ],
  providers: [],
  exports: [
    DatePeriodSimpleSelectComponent,
    DatePeriodListComponent,
  ],
})
export class DatePeriodModule { }
