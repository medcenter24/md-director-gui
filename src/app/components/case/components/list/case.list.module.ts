/*
 * Copyright (c) 2018.
 *
 * @author Zagovorychev Olexandr <zagovorichev@gmail.com>
 */

import { NgModule } from '@angular/core';
import { CaseListComponent } from './case.list.component';
import { AppTranslationModule } from '../../../../app.translation.module';
import { CasesService } from '../../cases.service';
import { ExporterService } from '../../../exporter/exporter.service';
import { ButtonModule, PaginatorModule, ToolbarModule } from 'primeng/primeng';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { CommonModule } from '@angular/common';
import { NgaModule } from '../../../../theme/nga.module';
import { ImporterModule } from '../../../importer/importer.module';

@NgModule({
  imports: [
    CommonModule,
    AppTranslationModule,
    ButtonModule,
    ToolbarModule,
    ImporterModule,
    // deprecated to the future
    NgaModule,
    // todo replace by datatable module
    PaginatorModule,
    Ng2SmartTableModule,
  ],
  declarations: [
    CaseListComponent,
  ],
  providers: [
    CasesService,
    ExporterService,
  ],
  exports: [
  ],
})
export class CaseListModule {
}
