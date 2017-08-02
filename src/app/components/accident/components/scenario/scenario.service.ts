/*
 * Copyright (c) 2017.
 *
 * @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import { Injectable } from '@angular/core';
import { HttpService } from '../../../http/http.service';
import { AccidentScenario } from './scenario';

@Injectable()
export class AccidentScenarioService extends HttpService {

  protected getPrefix(): string {
    return 'director/scenario';
  }

  getDoctorScenario(): Promise<AccidentScenario[]> {
    return this.get(`doctor`)
      .then(response => response.json().data as AccidentScenario[]);
  }
}
