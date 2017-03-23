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
import {City} from "../components/city/city";
import {Hospital} from "../components/hospital/hospital";
import {CitiesDb} from "./cities.db";
import {HospitalsDb} from "./hospitals.db";
import {AccidentType} from "../components/accident/type/type";
import {AccidentTypesDb} from "./accidentTypes.db";
import {AccidentCheckpoint} from "../components/accident/checkpoint/checkpoint";
import {AccidentCheckpointsDb} from "./accidentCheckpoints.db";
import {AccidentStatusesDb} from "./accidentStatuses.db";
import {AccidentStatus} from "../components/accident/status/status";
import {Assistant} from "../components/assistant/assistant";
import {AssistantsDb} from "./assistants.db";
import {Patient} from "../components/patient/patient";
import {PatientsDb} from "./patients.db";
import {Accident} from "../components/accident/accident";
import {AccidentsDb} from "./accidents.db";
import {CasesDb} from "./cases.db";
import {Case, CaseAccident} from "../components/case/case";

@Injectable()
export class InMemoryDataService implements InMemoryDbService {
    createDb() {
        let diagnostics: Diagnostic[] = DiagnosticsDb;
        let categories: DiagnosticCategory[] = DiagnosticCategoriesDb;
        let services: Service[] = ServicesDb;
        let doctors: Doctor[] = DoctorsDb;
        let users: User[] = UsersDb;
        let cities: City[] = CitiesDb;
        let hospitals: Hospital[] = HospitalsDb;
        let types: AccidentType[] = AccidentTypesDb;
        let checkpoints: AccidentCheckpoint[] = AccidentCheckpointsDb;
        let statuses: AccidentStatus[] = AccidentStatusesDb;
        let assistants: Assistant[] = AssistantsDb;
        let patients: Patient[] = PatientsDb;
        let accidents: Accident[] = AccidentsDb;
        let cases: CaseAccident[] = CasesDb;

        return {
            services,
            diagnostics,
            categories,
            doctors,
            users,
            cities,
            hospitals,
            types,
            checkpoints,
            statuses,
            assistants,
            patients,
            accidents,
            cases
        };
    }
}
