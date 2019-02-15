/*
 * Copyright (c) 2018.
 *
 * @author Zagovorychev Oleksandr <zagovorichev@gmail.com>
 */

import { NgModule } from '@angular/core';
import { AutoCompleteModule } from '../../../autosuggest';
import { CommonModule } from '@angular/common';
import { AutocompleterComponent } from './autocompleter.component';

@NgModule({
  imports: [
    CommonModule,
    AutoCompleteModule,
  ],
  declarations: [
    AutocompleterComponent,
  ],
  exports: [
    AutocompleterComponent,
  ],
})
export class AutocompleterModule {

}
