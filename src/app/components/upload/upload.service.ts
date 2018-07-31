/*
 * Copyright (c) 2018
 *
 *  @author Oleksander  Zagovorychev <zagovorichev@gmail.com>
 */

import { Injectable } from '@angular/core';
import { HttpService } from '../core/http/http.service';
import { Upload } from './upload';
import { saveAs } from 'file-saver';

@Injectable()
export class UploadService extends HttpService {

  protected getPrefix (): string {
    return 'director/uploads';
  }

  download(file: Upload): void {
    this.http
      .get(this.getUrl(file.id), { headers: this.getAuthHeaders(), responseType: 'blob' })
      .subscribe(data => saveAs(data, file.name), err => this.handleError(err));
  }
}
