/*
 * Copyright (c) 2017.
 *
 * @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';
import { saveAs } from 'file-saver';
import { RequestOptions, ResponseContentType } from '@angular/http';
@Injectable()
export class ExporterService extends HttpService {

  protected getPrefix(): string {
    return 'director/export';
  }

  public form1(params: Object): void {
    const options = new RequestOptions({ responseType: ResponseContentType.Blob, headers: this.getAuthHeaders() });
    this.http
      .post(this.getUrl('form1'), JSON.stringify(params), options)
      .map(res => res.blob())
      .subscribe(data => saveAs(data, 'Form1CasesExport.xlsx'), err => this.handleError(err));
  }
}
