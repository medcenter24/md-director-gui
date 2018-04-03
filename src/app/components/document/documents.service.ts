/*
 * Copyright (c) 2017
 *
 *  @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';
// import { RequestOptions, ResponseContentType } from '@angular/http';
import { saveAs } from 'file-saver';

@Injectable()
export class DocumentsService extends HttpService {

  protected getPrefix(): string {
    return 'director/documents';
  }

  deleteDocument(id: number): Promise<void> {
    return this.remove(id);
  }

  download(file): void {
    /*const options = new RequestOptions({ responseType: ResponseContentType.Blob, headers: this.getAuthHeaders() });*/
    this.http
      .get(this.getUrl(file.id)/*, options*/)
      .map(res => res/*.blob()*/)
      .subscribe(data => saveAs(data, file.name), err => this.handleError(err));
  }
}
