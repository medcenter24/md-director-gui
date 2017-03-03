/*
 * Copyright (c) 2017.
 *
 * @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import {Injectable} from '@angular/core';
import {DiagnosticService} from "./components/diagnostic/diagnostic.service";

@Injectable()
export class DiagnosticsService {

    constructor (
        private service: DiagnosticService
    ) {}

  getData(): Promise<any> {
    return this.service.getDiagnostics();
  }
}
