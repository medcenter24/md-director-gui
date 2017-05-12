/*
 * Copyright (c) 2017. 
 *
 * @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import { Injectable }    from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { CaseAccident } from './case';
import { Service } from '../service/service';
import { Doctor } from '../doctors/doctor';
import { Hospital } from '../hospital/hospital';
import { DoctorAccident } from '../doctorAccident/doctorAccident';
import { HospitalAccident } from '../hospitalAccident/hospitalAccident';
import { Diagnostic } from '../diagnostic/diagnostic';

@Injectable()
export class CasesService {

  private casesUrl = 'director/cases';  // URL to web api

  constructor(private http: Http) { }

  getCases(): Promise<CaseAccident[]> {

    return this.http.get(this.casesUrl)
        .toPromise()
        .then(response => response.json().data as CaseAccident[])
        .catch(this.handleError);
  }

  getCaseServices(caseId: number): Promise<Service[]> {
    const url = `${this.casesUrl}/${caseId}/services`;

    return this.http.get(url)
      .toPromise()
      .then(response => response.json().data as Service[])
      .catch(this.handleError);
  }

  getCaseDiagnostics(caseId: number): Promise<Diagnostic[]> {
    const url = `${this.casesUrl}/${caseId}/cases`;

    return this.http.get(url)
      .toPromise()
      .then(response => response.json().data as Diagnostic[])
      .catch(this.handleError);
  }

  getDoctorCase (caseId: number): Promise<DoctorAccident> {
    const url = `${this.casesUrl}/${caseId}/doctorcase`;

    return this.http.get(url)
      .toPromise()
      .then(response => response.json().data as DoctorAccident)
      .catch(this.handleError);
  }

  getHospitalCase (caseId: number): Promise<HospitalAccident> {
    const url = `${this.casesUrl}/${caseId}/hospitalcase`;

    return this.http.get(url)
      .toPromise()
      .then(response => response.json().data as HospitalAccident)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }
}
