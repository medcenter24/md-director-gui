/*
 * Copyright (c) 2017.
 *
 * @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Diagnostic } from './diagnostic';

@Injectable()
export class DiagnosticService {

    private headers = new Headers({'Content-Type': 'application/json'});
    private diagnosticUrl = 'director/diagnostics';  // URL to web api

    constructor(private http: Http) { }

    getDiagnostics(): Promise<Diagnostic[]> {

        return this.http.get(this.diagnosticUrl)
            .toPromise()
            .then(response => response.json().data as Diagnostic[])
            .catch(this.handleError);
    }


    getDiagnostic(id: number): Promise<Diagnostic> {
        const url = `${this.diagnosticUrl}/${id}`;
        return this.http.get(url)
            .toPromise()
            .then(response => response.json().data as Diagnostic)
            .catch(this.handleError);
    }

    delete(id: number): Promise<void> {
        const url = `${this.diagnosticUrl}/${id}`;
        return this.http.delete(url, {headers: this.headers})
            .toPromise()
            .then(() => null)
            .catch(this.handleError);
    }

    create(title: string): Promise<Diagnostic> {
        return this.http
            .post(this.diagnosticUrl, JSON.stringify({title: title}), {headers: this.headers})
            .toPromise()
            .then(res => res.json().data)
            .catch(this.handleError);
    }

    update(diagnostic: Diagnostic): Promise<Diagnostic> {
        const url = `${this.diagnosticUrl}/${diagnostic.id}`;
        return this.http
            .put(url, JSON.stringify(diagnostic), {headers: this.headers})
            .toPromise()
            .then(() => diagnostic)
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        return Promise.reject(error.message || error);
    }
}
