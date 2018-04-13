/*
 * Copyright (c) 2017
 *
 *  @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';

@Injectable()
export class ImporterService extends HttpService {

  getPrefix(): string {
    return '';
  }

  getQueue(url): Promise<any> {
    return this.get(url);
  }

  deleteFile(url: string, id: number): Promise<void> {
    return this.remove(`${url}/${id}`);
  }

  importFile(url: string, id: number): Promise<any> {
    return this.put(`${url}/${id}`, []);
  }
}
