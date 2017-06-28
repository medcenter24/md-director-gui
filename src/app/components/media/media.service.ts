/*
 * Copyright (c) 2017
 *
 *  @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import { Injectable } from '@angular/core';
import { Media } from './media';
import { HttpService } from '../http/http.service';

@Injectable()
export class MediaService extends HttpService {

  protected getPrefix(): string {
    return 'director/media';
  }

  getUploaded(): Promise<any> {
    return this.get().then().then(response => response.json() as Media[]);
  }

  deleteFile(id: number): Promise<void> {
    return this.remove(id);
  }
}
