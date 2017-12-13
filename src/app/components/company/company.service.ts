/*
 *  Copyright (c) 2017.
 *
 *  @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';
import { Company } from './company';

@Injectable()
export class CompanyService extends HttpService {

    protected getPrefix(): string {
        return 'director/companies';
    }

    // for now it is only one company allowed for the installation
    getCompany(): Promise<Company> {
        return this.get().then(response => response.json().data as Company);
    }
}
