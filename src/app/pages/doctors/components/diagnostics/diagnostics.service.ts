/*
 * Copyright (c) 2017.
 *
 * @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import {Injectable} from '@angular/core';
import {DiagnosticService} from "./components/diagnostic/diagnostic.service";
import {Diagnostic} from "./components/diagnostic/diagnostic";

@Injectable()
export class DiagnosticsService {

    constructor (
        private service: DiagnosticService
    ) {}

  getData(): Promise<Diagnostic[]> {
    return this.service.getDiagnostics();
  }
}
