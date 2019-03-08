/*
 * Copyright (c) 2018.
 *
 * @author Zagovorychev Oleksandr <zagovorichev@gmail.com>
 */

import { NgModule } from '@angular/core';
import { SelectorProviderMultipleAdapterComponent } from './selector.provider.multiple.adapter.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SelectorProviderMultipleAdapterEchoModule } from './implementation/echo';
import { SelectorProviderMultipleAdapterPrimengModule } from './implementation/primeng';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SelectorProviderMultipleAdapterEchoModule,
    SelectorProviderMultipleAdapterPrimengModule,
  ],
  declarations: [SelectorProviderMultipleAdapterComponent],
  exports: [SelectorProviderMultipleAdapterComponent],
})
export class SelectorProviderMultipleAdapterModule { }
