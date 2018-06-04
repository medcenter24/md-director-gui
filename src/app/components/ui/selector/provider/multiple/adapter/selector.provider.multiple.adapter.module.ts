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

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SelectorProviderMultipleAdapterEchoModule,
  ],
  declarations: [SelectorProviderMultipleAdapterComponent],
  exports: [SelectorProviderMultipleAdapterComponent],
})
export class SelectorProviderMultipleAdapterModule { }
