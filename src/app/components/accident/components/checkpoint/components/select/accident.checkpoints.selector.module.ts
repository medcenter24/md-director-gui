/*
 * Copyright (c) 2018.
 *
 * @author Zagovorychev Olexandr <zagovorichev@gmail.com>
 */

import { NgModule } from '@angular/core';
import { AccidentCheckpointsSelectorComponent } from './accident.checkpoints.selector.component';
import { CommonModule } from '@angular/common';
import { CheckboxModule } from 'primeng/primeng';
import { AppTranslationModule } from '../../../../../../app.translation.module';
import { FormsModule } from '@angular/forms';
import { AccidentCheckpointsService } from '../../checkpoints.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AppTranslationModule,
    CheckboxModule,
  ],
  declarations: [AccidentCheckpointsSelectorComponent],
  providers: [
    AccidentCheckpointsService,
  ],
  exports: [AccidentCheckpointsSelectorComponent],
})
export class AccidentCheckpointsSelectorModule {
}
