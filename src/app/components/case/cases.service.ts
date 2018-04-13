/*
 * Copyright (c) 2017.
 *
 * @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { Service } from '../service/service';
import { DoctorAccident } from '../doctorAccident/doctorAccident';
import { HospitalAccident } from '../hospitalAccident/hospitalAccident';
import { Diagnostic } from '../diagnostic/diagnostic';
import { HttpService } from '../http/http.service';
import { ExtendCaseAccident } from './extendCaseAccident';
import { Document } from '../document/document';
import { CaseAccident } from './case';
import { AccidentCheckpoint } from '../accident/components/checkpoint/checkpoint';
import { AccidentScenario } from '../accident/components/scenario/scenario';
import { Survey } from '../survey/survey';
import { saveAs } from 'file-saver';
import { Accident } from '../accident/accident';
import { AccidentHistory } from '../accident/components/history/history';
import { Commentary } from '../comment/commentary';

@Injectable()
export class CasesService extends HttpService {

  protected getPrefix(): string {
    return 'director/cases';
  }

  // todo check if I'm using it
  getExtendedCase(id: number): Promise<ExtendCaseAccident[]> {
    return this.get()
      .then(response => response.data as ExtendCaseAccident[]);
  }

  getDocumentsUrl(id): string {
    return `${this.getUrl()}/${id}/documents`;
  }

  getDocuments(id): Promise<Document[]> {
    return this.get(`${id}/documents`)
      .then(response => response.data as Document[]);
  }

  getCases(params): Promise<any> {
    return this.get(null, params).then(response => response as CaseAccident[]);
  }

  getCaseServices(id: number): Promise<Service[]> {
    return this.get(`${id}/services`).then(response => response.data as Service[]);
  }

  getCaseDiagnostics(id: number): Promise<Diagnostic[]> {
    return this.get(`${id}/diagnostics`).then(response => response.data as Diagnostic[]);
  }

  getCaseSurveys(id: number): Promise<Survey[]> {
      return this.get(`${id}/surveys`).then(response => response.data as Survey[]);
  }

  getCheckpoints(id: number): Promise<AccidentCheckpoint[]> {
    return this.get(`${id}/checkpoints`).then(response => response.data as AccidentCheckpoint[]);
  }

  getDoctorCase (id: number): Promise<DoctorAccident> {
    return this.get(`${id}/doctorcase`).then(response => response.data as DoctorAccident);
  }

  getHospitalCase (id: number): Promise<HospitalAccident> {
    return this.get(`${id}/hospitalcase`).then(response => response.data as HospitalAccident);
  }

  getImportUrl (): string {
    return `${this.getPrefix()}/importer`;
  }

  saveCase (data): Promise<any> {
    return data.accident.id ? this.put(data.accident.id, data) : this.store(data);
  }

  closeCase (id: number): Promise<any> {
    return this.put(`${id}/close`, {});
  }

  deleteCase (id: number): Promise<any> {
    return this.remove(id);
  }

  getScenario (id: number): Promise <AccidentScenario[]> {
    return this.get(`${id}/scenario`).then(response => response.data as AccidentScenario[]);
  }

  getReportHtml (id: number): Promise<string> {
    return this.get(`${id}/reportHtml`).then(response => response.data as string);
  }

  downloadPdfReport (id: number): void {
    // const options = new RequestOptions({ responseType: ResponseContentType.Blob, headers: this.getAuthHeaders() });
    this.http
      .get(this.getUrl(`${id}/downloadPdf`), { headers: this.getAuthHeaders(), responseType: 'blob' })
      .map(res => res)
      .subscribe(data => saveAs(data, `report_case_${id}.pdf`), err => this.handleError(err));
  }

  getHistory (accident: Accident): Promise <AccidentHistory[]> {
    return this.get(`${accident.id}/history`).then(response => response.data as AccidentHistory[]);
  }

  getCommentaries (accident: Accident): Promise <Commentary[]> {
    return this.get(`${accident.id}/comments`).then(response => response.data as Commentary[]);
  }

  createComment (accident: Accident, text: string): Promise <Commentary> {
    return this.put(`${accident.id}/comments`, { text }).then(response => response.json() as Commentary);
  }
}
