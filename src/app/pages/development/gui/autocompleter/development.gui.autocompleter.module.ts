/*
 * Copyright (c) 2018.
 *
 * @author Zagovorychev Oleksandr <zagovorichev@gmail.com>
 */

import { NgModule } from '@angular/core';
import { DevelopmentGuiAutocompleterComponent } from './development.gui.autocompleter.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgaModule } from '../../../../theme/nga.module';
import { AutocompleterModule } from '../../../../components/ui/selector/components/autocompleter';
import { SimpleSearchProviderMock } from '../../../../test/samples/providers';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    NgaModule,
    AutocompleterModule,
  ],
  declarations: [
    DevelopmentGuiAutocompleterComponent,
  ],
  exports: [
    DevelopmentGuiAutocompleterComponent,
  ],
  providers: [
    SimpleSearchProviderMock,
  ],
})
export class DevelopmentGuiAutocompleterModule {

}
