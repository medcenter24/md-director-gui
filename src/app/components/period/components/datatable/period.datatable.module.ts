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
import { CommonModule } from '@angular/common';
import { DatatableModule } from '../../../ui/datatable/datatable.module';
import { PeriodService } from '../../period.service';
import { PeriodDatatableComponent } from './period.datatable.component';
import { InputMaskModule } from 'primeng/primeng';
import { UiDateDowDropdownModule } from '../../../ui/date/dow/dropdown';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AppTranslationModule,
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
    PeriodDatatableComponent,
  ],
  exports: [
    PeriodDatatableComponent,
  ],
})
export class PeriodDatatableModule {
}
