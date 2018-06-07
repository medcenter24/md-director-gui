/*
 * Copyright (c) 2018.
 *
 * @author Zagovorychev Oleksandr <zagovorichev@gmail.com>
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectorProviderMultipleComponent } from './selector.provider.multiple.component';
import { SelectorProviderMultipleAdapterModule } from './adapter';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SelectorProviderMultipleAdapterModule,
  ],
  declarations: [
    SelectorProviderMultipleComponent,
  ],
  exports: [
    SelectorProviderMultipleComponent,
  ],
})
export class SelectorProviderMultipleModule { }
