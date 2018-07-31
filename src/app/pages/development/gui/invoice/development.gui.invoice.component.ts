/*
 * Copyright (c) 2018
 *
 *  @author Oleksander  Zagovorychev <zagovorichev@gmail.com>
 */

import { Component } from '@angular/core';
import { Logger } from 'angular2-logger/core';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { LoadingComponent } from '../../../../components/core/components/componentLoader';
import { Form } from '../../../../components/forms';
import { Invoice } from '../../../../components/invoice/invoice';
import { InvoiceService } from '../../../../components/invoice/invoice.service';
import { Upload } from '../../../../components/upload/upload';
import { GlobalState } from '../../../../global.state';

@Component({
  selector: 'nga-development-gui-invoice',
  templateUrl: './development.gui.invoice.html',
})
export class DevelopmentGuiInvoiceComponent extends LoadingComponent {
  protected componentName: string = 'DevelopmentGuiInvoiceComponent';

  invoiceForm: Invoice = new Invoice(0, 55.77, 'form', 'Test form invoice');
  invoiceFile: Invoice = new Invoice(0, 35.44, 'file', 'Test file invoice');

  file: Upload;
  form: Form;

  constructor(
    protected _logger: Logger,
    protected _state: GlobalState,
    protected loadingBar: SlimLoadingBarService,
    protected invoiceService: InvoiceService,
  ) {
    super();
  }

  SaveFile(): void {
    const postfix = 'SaveFile';
    this.startLoader(postfix);
    this.invoiceService.assignFile(this.invoiceFile, this.file).then(() => {
      this.stopLoader(postfix);
    }).catch(() => this.stopLoader(postfix));
  }

  SaveForm(): void {
    const postfix = 'SaveForm';
    this.startLoader(postfix);
    this.invoiceService.assignForm(this.invoiceForm, this.form).then(() => {
      this.stopLoader(postfix);
    }).catch(() => this.stopLoader(postfix));
  }
}
