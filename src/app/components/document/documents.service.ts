/*
 * Copyright (c) 2017
 *
 *  @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import { Injectable } from '@angular/core';
import { HttpService } from '../core/http/http.service';
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
    this.http
      .get(this.getUrl(file.id), { headers: this.getAuthHeaders(), responseType: 'blob' })
      .subscribe(data => saveAs(data, file.name), err => this.handleError(err));
  }
}
