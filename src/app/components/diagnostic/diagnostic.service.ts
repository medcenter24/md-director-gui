/*
 * Copyright (c) 2017.
 *
 * @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import { Injectable } from '@angular/core';
import { Diagnostic } from './diagnostic';
import { HttpService } from '../http/http.service';

@Injectable()
export class DiagnosticService extends HttpService {

    protected getPrefix(): string {
        return 'director/diagnostics';
    }
    
    getDiagnostics(): Promise<Diagnostic[]> {
        return this.get().then(response => response.json().data as Diagnostic[]);
    }

    getDiagnostic(id: number): Promise<Diagnostic> {
        return this.get(id).then(response => response.json().data as Diagnostic);
    }

    delete(id: number): Promise<void> {
        return this.delete(id);
    }

    create(diagnostic: Diagnostic): Promise<Diagnostic> {
        return this.store(diagnostic).then(res => res.json().data as Diagnostic);
    }

    update(diagnostic: Diagnostic): Promise<Diagnostic> {
        return this.put(diagnostic.id, diagnostic);
    }
}
