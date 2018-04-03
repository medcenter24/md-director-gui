/*
 * Copyright (c) 2018.
 *
 * @author Zagovorychev Olexandr <zagovorichev@gmail.com>
 */

import { NgModule } from '@angular/core';
// import { DatePeriodSimpleSelectComponent } from './components/simpleSelect/datePeriodSimpleSelect.component';
import { AppTranslationModule } from '../../app.translation.module';
import { DatePeriodListComponent } from './components/list/datePeriodList.component';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { FormsModule } from '@angular/forms';
import { DatePeriodService } from './datePeriod.service';
import { ButtonModule } from 'primeng/button';
import { DatatableModule } from '../ui/datatable/datatable.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AppTranslationModule,
    TableModule,
    DialogModule,
    ButtonModule,
    DatatableModule,
  ],
  declarations: [
    // DatePeriodSimpleSelectComponent,
    DatePeriodListComponent,
  ],
  providers: [
    DatePeriodService,
  ],
  exports: [
    // DatePeriodSimpleSelectComponent,
    DatePeriodListComponent,
  ],
})
export class DatePeriodModule { }
