/*
 * Copyright (c) 2017.
 *
 * @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { DiagnosticCategory } from './category';
import { HttpService } from '../../core/http/http.service';

@Injectable()
export class DiagnosticCategoryService extends HttpService {

    protected getPrefix(): string {
        return 'director/categories';
    }

    getCategory(id: number): Promise<DiagnosticCategory> {
        return this.get(id)
          .then(response => response.data as DiagnosticCategory);
    }

    delete(id: number): Promise<void> {
        return this.remove(id);
    }

    save(category: DiagnosticCategory): Promise<DiagnosticCategory> {
        return category.id
          ? this.put(category.id, category).then(res => res.data as DiagnosticCategory)
          : this.store(category).then(res => res as DiagnosticCategory);
    }
}

