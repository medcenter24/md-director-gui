/*
 * Copyright (c) 2017.
 *
 * @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';
import { saveAs } from 'file-saver';

@Injectable()
export class ExporterService extends HttpService {

  protected getPrefix(): string {
    return 'director/export';
  }

  form1(params: Object): void {
    const dt = new Date();
    this.http
      .post(this.getUrl('form1'), JSON.stringify(params), {
        headers: this.getAuthHeaders(),
        responseType: 'blob',
      })
      .subscribe(data => saveAs(data, `Form1CasesExport_${dt.valueOf()}.xlsx`), err => this.handleError(err));
  }
}
