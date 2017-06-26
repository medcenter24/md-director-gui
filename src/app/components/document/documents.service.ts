/*
 * Copyright (c) 2017
 *
 *  @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import {Injectable} from '@angular/core';
import { HttpService } from '../http/http.service';

@Injectable()
export class DocumentsService extends HttpService {

  protected getPrefix(): string {
    return 'director/documents';
  }

  deleteDocument(id: number): Promise<void> {
    return this.remove(id);
  }
}
