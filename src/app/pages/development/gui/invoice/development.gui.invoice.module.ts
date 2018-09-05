/*
 * Copyright (c) 2018
 *
 *  @author Oleksander  Zagovorychev <zagovorichev@gmail.com>
 */

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { InvoiceEditorModule } from '../../../../components/invoice/components/editor';
import { InvoiceService } from '../../../../components/invoice/invoice.service';
import { NgaModule } from '../../../../theme/nga.module';
import { DevelopmentGuiInvoiceComponent } from './development.gui.invoice.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    NgaModule,
    InvoiceEditorModule,
  ],
  declarations: [
    DevelopmentGuiInvoiceComponent,
  ],
  exports: [
    DevelopmentGuiInvoiceComponent,
  ],
  providers: [
    InvoiceService,
  ],
})
export class DevelopmentGuiInvoiceModule {

}
