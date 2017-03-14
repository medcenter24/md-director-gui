/*
 * Copyright (c) 2017.
 *
 * @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import {Injectable} from "@angular/core";

import { InMemoryDbService } from 'angular-in-memory-web-api';
import {Service} from "../services/service";
import {ServicesDb} from "./services.db";
import {Diagnostic} from "../diagnostics/components/diagnostic/diagnostic";
import {Category} from "../diagnostics/components/categories/category";
import {DiagnosticsDb} from "./diagnostics.db";
import {CategoriesDb} from "./categories.db";

@Injectable()
export class InMemoryDataService implements InMemoryDbService {
    createDb() {
        let diagnostics: Diagnostic[] = DiagnosticsDb;
        let categories: Category[] = CategoriesDb;
        let services: Service[] = ServicesDb;

        return { services, diagnostics, categories };
    }
}
