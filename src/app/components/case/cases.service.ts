/*
 * Copyright (c) 2017. 
 *
 * @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import { Injectable }    from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { Service } from '../service/service';
import { DoctorAccident } from '../doctorAccident/doctorAccident';
import { HospitalAccident } from '../hospitalAccident/hospitalAccident';
import { Diagnostic } from '../diagnostic/diagnostic';
import { HttpService } from '../http/http.service';

@Injectable()
export class CasesService extends HttpService {

  protected getPrefix(): string {
    return 'director/cases';
  }

  getCases(params): Promise<any> {

    return this.http.get(this.getUrl(), {params: params, headers: this.getAuthHeaders()})
        .toPromise()
        .then(response => response.json())
        .catch(this.handleError);
  }

  getCaseServices(caseId: number): Promise<Service[]> {
    const url = `${this.getUrl()}/${caseId}/services`;

    return this.http.get(url, {headers: this.getAuthHeaders()})
      .toPromise()
      .then(response => response.json().data as Service[])
      .catch(this.handleError);
  }

  getCaseDiagnostics(caseId: number): Promise<Diagnostic[]> {
    const url = `${this.getUrl()}/${caseId}/diagnostics`;

    return this.http.get(url, {headers: this.getAuthHeaders()})
      .toPromise()
      .then(response => response.json().data as Diagnostic[])
      .catch(this.handleError);
  }

  getDoctorCase (caseId: number): Promise<DoctorAccident> {
    const url = `${this.getUrl()}/${caseId}/doctorcase`;

    return this.http.get(url, {headers: this.getAuthHeaders()})
      .toPromise()
      .then(response => response.json().data as DoctorAccident)
      .catch(this.handleError);
  }

  getHospitalCase (caseId: number): Promise<HospitalAccident> {
    const url = `${this.getUrl()}/${caseId}/hospitalcase`;

    return this.http.get(url, {headers: this.getAuthHeaders()})
      .toPromise()
      .then(response => response.json().data as HospitalAccident)
      .catch(this.handleError);
  }

  getImportUrl (): string {
    return `${this.getUrl()}/importer`;
  }

  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }
}
