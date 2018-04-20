/*
 * Copyright (c) 2018.
 *
 * @author Zagovorychev Olexandr <zagovorichev@gmail.com>
 */


import { NgModule } from '@angular/core';
import { DatatableModule } from '../../../../../ui/datatable/datatable.module';
import { CommonModule } from '@angular/common';
import { AppTranslationModule } from '../../../../../../app.translation.module';
import { DialogModule } from 'primeng/dialog';
import { AccidentCheckpointDatatableComponent } from './accident.checkpoint.datatable.component';
import { AccidentCheckpointsService } from '../../checkpoints.service';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/primeng';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    DatatableModule,
    AppTranslationModule,
    DialogModule,
    ButtonModule,
    InputTextModule,
  ],
  declarations: [
    AccidentCheckpointDatatableComponent,
  ],
  exports: [
    AccidentCheckpointDatatableComponent,
  ],
  providers: [
    AccidentCheckpointsService,
  ],
})
export class AccidentCheckpointDatatableModule {
}
