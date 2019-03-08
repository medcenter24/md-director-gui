/*
 * Copyright (c) 2017.
 *
 * @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import { Injectable } from '@angular/core';
import { Diagnostic } from './diagnostic';
import { HttpService } from '../core/http/http.service';
import { LoadableServiceInterface } from '../core/loadable';

@Injectable()
export class DiagnosticService extends HttpService implements LoadableServiceInterface {

  protected getPrefix(): string {
    return 'director/diagnostics';
  }

  getDiagnostics(): Promise<Diagnostic[]> {
    return this.get().then(response => response.data as Diagnostic[]);
  }

  delete(id: number): Promise<void> {
    return this.remove(id);
  }

  save(diagnostic: Diagnostic): Promise<Diagnostic> {
    return diagnostic.id
      ? this.put(diagnostic.id, diagnostic).then(res => res.data as Diagnostic)
      : this.store(diagnostic);
  }

  destroy(diagnostic: Diagnostic): Promise<any> {
    return this.remove(diagnostic.id);
  }
}
