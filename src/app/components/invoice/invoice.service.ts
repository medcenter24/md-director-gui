/*
 * Copyright (c) 2018
 *
 *  @author Oleksander  Zagovorychev <zagovorichev@gmail.com>
 */

import { Injectable } from '@angular/core';
import { HttpService } from '../core/http/http.service';
import { Form } from '../forms';
import { Upload } from '../upload/upload';
import { Invoice } from './invoice';

@Injectable()
export class InvoiceService extends HttpService {

  protected getPrefix(): string {
    return 'director/invoice';
  }

  save(invoice: Invoice): Promise<Invoice> {
    const action = invoice.id ? this.put(invoice.id, invoice) : this.store(invoice);
    return action.then(response => response as Invoice);
  }

  assignFile(invoice: Invoice, file: Upload): Promise<any> {
    if (!file || typeof file.id === 'undefined') {
      return this.handleError('File should be provided');
    }

    return this.save(invoice)
      .then(inv => {
        const obj = {};
        for (const key of Object.keys(invoice)) {
          obj[key] = invoice[key];
        }
        obj['fileId'] = file.id;
        this.put(inv.id, obj);
      });
  }

  assignForm(invoice: Invoice, form: Form): Promise<any> {
    if (!form || typeof form.id === 'undefined') {
      return this.handleError('Form should be provided');
    }

    return this.save(invoice)
      .then(inv => {
        const obj = {};
        for (const key of Object.keys(invoice)) {
          obj[key] = invoice[key];
        }
        obj['formId'] = form.id;
        this.put(inv.id, obj);
      });
  }
}
