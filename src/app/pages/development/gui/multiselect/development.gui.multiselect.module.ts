/*
 * Copyright (c) 2018.
 *
 * @author Zagovorychev Oleksandr <zagovorichev@gmail.com>
 */

import { NgModule } from '@angular/core';
import { DevelopmentGuiMultiselectComponent } from './development.gui.multiselect.component';
import { RouterModule } from '@angular/router';
import { SelectorProviderMultipleModule } from '../../../../components/ui/selector/provider/multiple';
import { CommonModule } from '@angular/common';
import { NgaModule } from '../../../../theme/nga.module';
import { AppTranslationModule } from '../../../../app.translation.module';

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
