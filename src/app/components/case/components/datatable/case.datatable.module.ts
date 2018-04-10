/*
 * Copyright (c) 2018.
 *
 * @author Zagovorychev Olexandr <zagovorichev@gmail.com>
 */

import { NgModule } from '@angular/core';
import { CaseDatatableComponent } from './case.datatable.component';
import { DatatableModule } from '../../../ui/datatable/datatable.module';
import {CommonModule} from "@angular/common";

@NgModule({
  imports: [
    CommonModule,
    DatatableModule,
  ],
  declarations: [
    CaseDatatableComponent,
  ],
  exports: [
    CaseDatatableComponent,
  ],
})
export class CaseDatatableModule {

}
