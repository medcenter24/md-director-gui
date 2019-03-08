/*
 *  Copyright (c) 2017.
 *
 *  @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import { Injectable } from '@angular/core';
import { HttpService } from '../core/http/http.service';
import { Company } from './company';

@Injectable()
export class CompanyService extends HttpService {

    protected getPrefix(): string {
        return 'director/companies';
    }

    update(company: Company): Promise<Company> {
        return this.put(company.id, company);
    }

    deleteLogo(company: Company): Promise<any> {
        return this.remove(`${company.id}/logo`);
    }

    deleteSignature(company: Company): Promise<any> {
        return this.remove(`${company.id}/sign`);
    }
}
