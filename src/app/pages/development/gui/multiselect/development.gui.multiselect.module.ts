/*
 * Copyright (c) 2018.
 *
 * @author Zagovorychev Oleksandr <zagovorichev@gmail.com>
 */

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SelectorProviderMultipleModule } from '../../../../components/ui/selector/provider/multiple';
import { CommonModule } from '@angular/common';
import { NgaModule } from '../../../../theme/nga.module';
import { AppTranslationModule } from '../../../../app.translation.module';
import { DevelopmentGuiMultiselectComponent } from './development.gui.multiselect.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    NgaModule,
    SelectorProviderMultipleModule,
    AppTranslationModule,
  ],
  declarations: [
    DevelopmentGuiMultiselectComponent,
  ],
  exports: [
    DevelopmentGuiMultiselectComponent,
  ],
})
export class DevelopmentGuiMultiselectModule {
}
