/*
 * Copyright (c) 2018.
 *
 * @author Zagovorychev Olexandr <zagovorichev@gmail.com>
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppTranslationModule } from '../../../app.translation.module';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DatatableComponent } from './datatable.component';

@NgModule({
  imports: [
    CommonModule,
    AppTranslationModule,
    TableModule,
    ButtonModule,
  ],
  declarations: [
    DatatableComponent,
  ],
  providers: [],
  exports: [
    DatatableComponent,
  ],
})
export class DatatableModule {}
