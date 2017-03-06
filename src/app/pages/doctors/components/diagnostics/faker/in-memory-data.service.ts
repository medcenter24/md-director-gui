/*
 * Copyright (c) 2017.
 *
 * @author Alexander Zagovorichev <zagovorichev@gmail.com>
 *
 * That I need for make easy development (development without real API server)
 */

import {Injectable} from "@angular/core";

import { InMemoryDbService } from 'angular-in-memory-web-api';
import {Diagnostic} from "../components/diagnostic/diagnostic";
import {DiagnosticsDb} from "./diagnostics.db";
import {Category} from "../components/categories/category";
import {CategoriesDb} from "./categories.db";

@Injectable()
export class InMemoryDataService implements InMemoryDbService {
    createDb() {
        let diagnostics: Diagnostic[] = DiagnosticsDb;
        let categories: Category[] = CategoriesDb;

        return { diagnostics, categories};
    }
}
