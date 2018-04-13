/*
 * Copyright (c) 2018.
 *
 * @author Zagovorychev Olexandr <zagovorichev@gmail.com>
 */

import { NgModule } from '@angular/core';
import { PanelModule } from 'primeng/primeng';
import { CommonModule } from '@angular/common';
import { AppTranslationModule } from '../../../../app.translation.module';
import { FormsModule } from '@angular/forms';
import { AccidentCardComponent } from './accident.card.component';
import { routing } from '../../../../pages/cases/cases.page.routing';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AppTranslationModule,
    routing,
    PanelModule,
  ],
  declarations: [
    AccidentCardComponent,
  ],
  exports: [
    AccidentCardComponent,
  ],
})
export class AccidentCardModule {
}
