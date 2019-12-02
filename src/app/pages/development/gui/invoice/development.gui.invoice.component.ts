/*
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU General Public License
 * as published by the Free Software Foundation; under version 2
 * of the License (non-upgradable).
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
 *
 * Copyright (c) 2019 (original work) MedCenter24.com;
 */

import { Component, OnInit, ViewChild } from '@angular/core';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { LoadingComponent } from '../../../../components/core/components/componentLoader';
import { InvoiceEditorComponent } from '../../../../components/invoice/components/editor';
import { Invoice } from '../../../../components/invoice/invoice';
import { GlobalState } from '../../../../global.state';
import { LoggerComponent } from '../../../../components/core/logger/LoggerComponent';

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
    protected _logger: LoggerComponent,
    protected _state: GlobalState,
    protected loadingBar: SlimLoadingBarService,
  ) {
    super();
  }

  ngOnInit(): void {
    this.setInvoiceComponent.setInvoice(new Invoice(1), true);
  }
}
