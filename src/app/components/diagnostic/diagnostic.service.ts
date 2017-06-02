/*
 * Copyright (c) 2017.
 *
 * @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Diagnostic } from './diagnostic';
import { HttpService } from '../http/http.service';

@Injectable()
export class DiagnosticService extends HttpService {

    protected getPrefix(): string {
        return 'director/diagnostics';
    }
    
    getDiagnostics(): Promise<Diagnostic[]> {

        return this.http.get(this.getUrl(), {headers: this.getAuthHeaders()})
            .toPromise()
            .then(response => response.json().data as Diagnostic[])
            .catch(this.handleError);
    }

    getDiagnostic(id: number): Promise<Diagnostic> {
        const url = `${this.getUrl()}/${id}`;
        return this.http.get(url, {headers: this.getAuthHeaders()})
            .toPromise()
            .then(response => response.json().data as Diagnostic)
            .catch(this.handleError);
    }

    delete(id: number): Promise<void> {
        const url = `${this.getUrl()}/${id}`;
        return this.http.delete(url, {headers: this.getAuthHeaders()})
            .toPromise()
            .then(() => null)
            .catch(this.handleError);
    }

    create(diagnostic: Diagnostic): Promise<Diagnostic> {
        return this.http
            .post(this.getUrl(), JSON.stringify(diagnostic), {headers: this.getAuthHeaders()})
            .toPromise()
            .then(res => res.json().data)
            .catch(this.handleError);
    }

    update(diagnostic: Diagnostic): Promise<Diagnostic> {
        const url = `${this.getUrl()}/${diagnostic.id}`;
        return this.http
            .put(url, JSON.stringify(diagnostic), {headers: this.getAuthHeaders()})
            .toPromise()
            .then(() => diagnostic)
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        return Promise.reject(error.message || error);
    }
}
