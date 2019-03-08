/*
 * Copyright (c) 2018
 *
 *  @author Oleksander  Zagovorychev <zagovorichev@gmail.com>
 */

import { Component, OnInit, ViewChild } from '@angular/core';
import { Logger } from 'angular2-logger/core';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { LoadingComponent } from '../../../../components/core/components/componentLoader';
import { Form } from '../../../../components/forms';
import { InvoiceEditorComponent } from '../../../../components/invoice/components/editor';
import { Invoice } from '../../../../components/invoice/invoice';
import { InvoiceService } from '../../../../components/invoice/invoice.service';
import { Upload } from '../../../../components/upload/upload';
import { GlobalState } from '../../../../global.state';

@Component({
  selector: 'nga-development-gui-invoice',
  templateUrl: './development.gui.invoice.html',
})
export class DevelopmentGuiInvoiceComponent extends LoadingComponent implements OnInit {
  protected componentName: string = 'DevelopmentGuiInvoiceComponent';

  @ViewChild('setInvoiceComponent')
    setInvoiceComponent: InvoiceEditorComponent;

  invoiceForm: Invoice = new Invoice(0, 55.77, 'form', 'Test form invoice', 'paid');
  invoiceFile: Invoice = new Invoice(0, 35.44, 'file', 'Test file invoice');

  constructor(
    protected _logger: Logger,
    protected _state: GlobalState,
    protected loadingBar: SlimLoadingBarService,
  ) {
    super();
  }

  ngOnInit(): void {
    this.setInvoiceComponent.setInvoice(new Invoice(1), true);
  }
}
