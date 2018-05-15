/*
 * Copyright (c) 2017.
 *
 * @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import { Injectable } from '@angular/core';
import { Diagnostic } from './diagnostic';
import { HttpService } from '../http/http.service';
import { LoadableServiceInterface } from '../core/loadable';

@Injectable()
export class DiagnosticService extends HttpService implements LoadableServiceInterface {

    protected getPrefix(): string {
        return 'director/diagnostics';
    }

    getDiagnostics(): Promise<Diagnostic[]> {
        return this.get().then(response => response.data as Diagnostic[]);
    }

    getDiagnostic(id: number): Promise<Diagnostic> {
        return this.get(id).then(response => response.data as Diagnostic);
    }

    delete(id: number): Promise<void> {
        return this.remove(id);
    }

    create(diagnostic: Diagnostic): Promise<Diagnostic> {
        return this.store(diagnostic).then(res => res.json().data as Diagnostic);
    }

    update(diagnostic: Diagnostic): Promise<Diagnostic> {
        return this.put(diagnostic.id, diagnostic);
    }

  save (diagnostic: Diagnostic): Promise<Diagnostic> {
    const action = diagnostic.id ? this.put(diagnostic.id, diagnostic) : this.store(diagnostic);
    return action.then(response => response.data as Diagnostic);
  }

  destroy (diagnostic: Diagnostic): Promise<any> {
    return this.remove(diagnostic.id);
  }
}
