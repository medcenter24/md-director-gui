/*
 * Copyright (c) 2017
 *
 *  @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import { Injectable } from '@angular/core';
import { HospitalAccident } from './hospitalAccident';
import { HttpService } from '../http/http.service';

@Injectable()
export class HospitalAccidentService extends HttpService {

  protected getPrefix(): string {
    return 'director/hospitalcases';
  }

  getAccident(id: number): Promise<HospitalAccident> {
    return this.get(id).then(response => response.json().data as HospitalAccident);
  }
}
