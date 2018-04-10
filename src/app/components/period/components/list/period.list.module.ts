/*
 * Copyright (c) 2018.
 *
 * @author Zagovorychev Olexandr <zagovorichev@gmail.com>
 */

import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { AppTranslationModule } from '../../../../app.translation.module';
// import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { DatatableModule } from '../../../ui/datatable/datatable.module';
import { PeriodService } from '../../period.service';
import { PeriodListComponent } from './period.list.component';
import { InputMaskModule } from 'primeng/primeng';
import { UiDateDowDropdownModule } from '../../../ui/date/dow/dropdown';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AppTranslationModule,
    // TableModule,
    DialogModule,
    ButtonModule,
    DatatableModule,
    InputMaskModule,
    UiDateDowDropdownModule,
  ],
  providers: [
    PeriodService,
  ],
  declarations: [
    PeriodListComponent,
  ],
  exports: [
    PeriodListComponent,
  ],
})
export class PeriodListModule {
}
