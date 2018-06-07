/*
 * Copyright (c) 2018.
 *
 * @author Zagovorychev Oleksandr <zagovorichev@gmail.com>
 */

import { NgModule } from '@angular/core';
import { MultiSelectModule } from 'primeng/primeng';
import { SelectorProviderMultipleAdapterPrimengComponent }
  from './selector.provider.multiple.adapter.primeng.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MultiSelectModule,
  ],
  declarations: [
    SelectorProviderMultipleAdapterPrimengComponent,
  ],
  exports: [
    SelectorProviderMultipleAdapterPrimengComponent,
  ],
})
export class SelectorProviderMultipleAdapterPrimengModule {

}
