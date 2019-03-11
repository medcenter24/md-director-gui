/*
 * Copyright (c) 2018.
 *
 * @author Zagovorychev Olexandr <zagovorichev@gmail.com>
 */

import { NgModule } from '@angular/core';
import { PaymentBlockModule } from '../../../finance/components/payment/components/block';
import { CaseFinanceComponent } from './case.finance.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppTranslationModule } from '../../../../app.translation.module';
import { InplaceModule } from 'primeng/inplace';
import { InputTextModule, ToggleButtonModule, TooltipModule } from 'primeng/primeng';
import { NumbersHelper } from '../../../../helpers/numbers.helper';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AppTranslationModule,
    InplaceModule,
    InputTextModule,
    ToggleButtonModule,
    TooltipModule,
    PaymentBlockModule,
  ],
  declarations: [
    CaseFinanceComponent,
  ],
  providers: [
    NumbersHelper,
  ],
  exports: [
    CaseFinanceComponent,
  ],
})
export class CaseFinanceModule {
}
