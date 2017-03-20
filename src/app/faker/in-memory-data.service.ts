/*
 * Copyright (c) 2017.
 *
 * @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import {Injectable} from "@angular/core";

import { InMemoryDbService } from 'angular-in-memory-web-api';
import {DoctorsDb} from "./doctors.db";
import {ServicesDb} from "./services.db";
import {UsersDb} from "./users.db";
import {DiagnosticsDb} from "./diagnostics.db";
import {DiagnosticCategoriesDb} from "./diagnosticCategories.db";
import {Diagnostic} from "../components/diagnostic/diagnostic";
import {DiagnosticCategory} from "../components/diagnostic/category/category";
import {Service} from "../components/service/service";
import {Doctor} from "../components/doctors/doctor";
import {User} from "../components/users/user";

@Injectable()
export class InMemoryDataService implements InMemoryDbService {
    createDb() {
        let diagnostics: Diagnostic[] = DiagnosticsDb;
        let categories: DiagnosticCategory[] = DiagnosticCategoriesDb;
        let services: Service[] = ServicesDb;
        let doctors: Doctor[] = DoctorsDb;
        let users: User[] = UsersDb;

        return { services, diagnostics, categories, doctors, users };
    }
}
