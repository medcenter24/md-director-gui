/*
 * Copyright (c) 2017.
 *
 * @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import {Injectable} from "@angular/core";

import { InMemoryDbService } from 'angular-in-memory-web-api';
import {Service} from "../services/service";
import {ServicesDb} from "./services.db";

@Injectable()
export class InMemoryDataService implements InMemoryDbService {
    createDb() {
        let services: Service[] = ServicesDb;

        return { services };
    }
}
