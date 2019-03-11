/*
 * Copyright (c) 2018.
 *
 * @author Zagovorychev Olexandr <zagovorichev@gmail.com>
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppTranslationModule } from '../../../../app.translation.module';
import { ServiceSelectModule } from '../select';
import { ServiceSelectorComponent } from './service.selector.component';
import { CasesService } from '../../../case/cases.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AppTranslationModule,
    ServiceSelectModule,
  ],
  providers: [
    CasesService,
  ],
  declarations: [
    ServiceSelectorComponent,
  ],
  exports: [
    ServiceSelectorComponent,
  ],
})
export class ServiceSelectorModule {
}
