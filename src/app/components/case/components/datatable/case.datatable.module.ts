/*
 * Copyright (c) 2018.
 *
 * @author Zagovorychev Olexandr <zagovorichev@gmail.com>
 */

import { NgModule } from '@angular/core';
import { CaseDatatableComponent } from './case.datatable.component';
import { DatatableModule } from '../../../ui/datatable/datatable.module';
import { CommonModule } from '@angular/common';
import { ImporterModule } from '../../../importer/importer.module';
import { ExporterService } from '../../../exporter/exporter.service';

@NgModule({
  imports: [
    CommonModule,
    DatatableModule,
    ImporterModule,
  ],
  declarations: [
    CaseDatatableComponent,
  ],
  providers: [
    ExporterService,
  ],
  exports: [
    CaseDatatableComponent,
  ],
})
export class CaseDatatableModule {
}
