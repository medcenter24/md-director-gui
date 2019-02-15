/*
 * Copyright (c) 2018
 *
 *  @author Oleksander  Zagovorychev <zagovorichev@gmail.com>
 */

import { NgModule } from '@angular/core';
import { PaymentBlockModule } from '../../../../../components/finance/components/payment/components/block';
import { GuiPaymentBlockComponent } from './gui.payment.block.component';

@NgModule({
  imports: [
    PaymentBlockModule,
  ],
  exports: [GuiPaymentBlockComponent],
  declarations: [GuiPaymentBlockComponent],
})
export class GuiPaymentBlockModule {

}
