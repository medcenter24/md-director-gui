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

import { Injectable } from '@angular/core';
import { ObjectHelper } from '../../helpers/object.helper';
import { HttpService } from '../core/http/http.service';
import { Form } from '../forms';
import { Upload } from '../upload/upload';
import { Invoice } from './invoice';

@Injectable()
export class InvoiceService extends HttpService {

  protected getPrefix(): string {
    return 'director/invoice';
  }

  save(invoice: any): Promise<Invoice> {
    const action = invoice && +invoice.id ? this.put(invoice.id, invoice) : this.store(invoice);
    return action.then(response => response as Invoice);
  }

  assignFile(invoice: Invoice, file: Upload): Promise<Invoice> {
    if (!file || typeof file.id === 'undefined') {
      return this.handleError('File should be provided');
    }
    return this.save(ObjectHelper.extend(invoice, { fileId: file.id }));
  }

  assignForm(invoice: Invoice, form: Form): Promise<Invoice> {
    if (!form || typeof form.id === 'undefined') {
      return this.handleError('Form should be provided');
    }
    return this.save(ObjectHelper.extend(invoice, { formId: form.id }));
  }

  getForm(invoice: Invoice): Promise<Form> {
    return this.get(`${invoice.id}/form`).then(response => response.data as Form);
  }

  getFile(invoice: Invoice): Promise<Upload> {
    return this.get(`${invoice.id}/file`).then(response => response.data as Upload);
  }
}
