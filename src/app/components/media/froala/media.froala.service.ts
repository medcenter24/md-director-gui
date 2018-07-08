/*
 * Copyright (c) 2018
 *
 *  @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import { Injectable } from '@angular/core';
import { HttpService } from '../../core/http/http.service';

@Injectable()
export class MediaFroalaService extends HttpService {
  protected getPrefix(): string {
    return 'director/froala';
  }
}