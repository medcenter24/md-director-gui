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
        return this.get()
          .then(response => response.json().data as DiagnosticCategory[]);
    }

    getCategory(id: number): Promise<DiagnosticCategory> {
        return this.get(id)
          .then(response => response.json().data as DiagnosticCategory);
    }

    delete(id: number): Promise<void> {
        return this.delete(id);
    }

    create(title: string): Promise<DiagnosticCategory> {
        return this.store({title: title}).then(res => res.json() as DiagnosticCategory);
    }

    update(category: DiagnosticCategory): Promise<DiagnosticCategory> {
        return this.put(category.id, category).then(res => res.json().data as DiagnosticCategory);
    }
}

