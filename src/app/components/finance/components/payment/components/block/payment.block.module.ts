/*
 * Copyright (c) 2018
 *
 *  @author Oleksander  Zagovorychev <zagovorichev@gmail.com>
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InplaceModule, ToggleButtonModule } from 'primeng/primeng';
import { AppTranslationModule } from '../../../../../../app.translation.module';
import { PaymentBlockComponent } from './payment.block.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AppTranslationModule,
    ToggleButtonModule,
    InplaceModule,
  ],
  declarations: [PaymentBlockComponent],
  exports: [PaymentBlockComponent],
})
export class PaymentBlockModule {

}
