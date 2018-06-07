/*
 * Copyright (c) 2018.
 *
 * @author Zagovorychev Oleksandr <zagovorichev@gmail.com>
 */

import { NgModule } from '@angular/core';
import { MultiselectImplementationsComponent } from './multiselect.implementations.component';
import { NgaModule } from '../../../../../theme/nga.module';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AppTranslationModule } from '../../../../../app.translation.module';
import { MultiSelectorModule } from '../../../../../components/ui/selector/components/multiSelector';
import { CityProviderMock } from '../../../../../test/samples/providers';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    NgaModule,
    AppTranslationModule,
    MultiSelectorModule,
  ],
  exports: [MultiselectImplementationsComponent],
  declarations: [MultiselectImplementationsComponent],
  providers: [
    CityProviderMock,
  ],
})
export class MultiselectImplementationsModule {
}
