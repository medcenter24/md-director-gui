/*
 * Copyright (c) 2017.
 *
 * @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import {Injectable}    from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { DiagnosticCategory } from './category';
import { HttpService } from '../../http/http.service';

@Injectable()
export class DiagnosticCategoryService extends HttpService {

    protected getPrefix(): string {
        return 'director/categories';
    }

    getCategories(): Promise<DiagnosticCategory[]> {
        return this.http.get(this.getUrl(), {headers: this.getAuthHeaders()})
            .toPromise()
            .then(function (response) {
                return response.json().data as DiagnosticCategory[];
            })
            .catch(this.handleError);
    }

    getCategory(id: number): Promise<DiagnosticCategory> {
        const url = `${this.getUrl()}/${id}`;
        return this.http.get(url, {headers: this.getAuthHeaders()})
            .toPromise()
            .then(response => response.json().data as DiagnosticCategory)
            .catch(this.handleError);
    }

    delete(id: number): Promise<void> {
        const url = `${this.getUrl()}/${id}`;
        return this.http.delete(url, {headers: this.getAuthHeaders()})
            .toPromise()
            .then(() => null)
            .catch(this.handleError);
    }

    create(title: string): Promise<DiagnosticCategory> {
        return this.http
            .post(this.getUrl(), JSON.stringify({title: title}), {headers: this.getAuthHeaders()})
            .toPromise()
            .then(res => res.json() as DiagnosticCategory)
            .catch(this.handleError);
    }

    update(category: DiagnosticCategory): Promise<DiagnosticCategory> {
        const url = `${this.getUrl()}/${category.id}`;
        return this.http
            .put(url, JSON.stringify(category), {headers: this.getAuthHeaders()})
            .toPromise()
            .then(res => res.json().data as DiagnosticCategory)
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        return Promise.reject(error.message || error);
    }
}

