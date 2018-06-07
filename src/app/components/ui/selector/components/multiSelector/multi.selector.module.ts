/*
 * Copyright (c) 2018.
 *
 * @author Zagovorychev Oleksandr <zagovorichev@gmail.com>
 */

import { NgModule } from '@angular/core';
import { MultiSelectorComponent } from './multi.selector.component';
import { SelectorProviderMultipleModule } from '../../provider/multiple';
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";

@NgModule({
  imports: [
    CommonModule,
    SelectorProviderMultipleModule,
  ],
  declarations: [
    MultiSelectorComponent,
  ],
  exports: [
    MultiSelectorComponent,
  ],
})
export class MultiSelectorModule {
}
