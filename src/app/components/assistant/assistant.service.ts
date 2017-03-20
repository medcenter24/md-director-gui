/*
 * Copyright (c) 2017.
 *
 * @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import {Injectable} from '@angular/core';
import {Headers, Http} from "@angular/http";
import {Assistant} from "./assistant";

@Injectable()
export class AssistantsService {

  private headers = new Headers({'Content-Type': 'application/json'});
  private assistantsUrl = 'director/assistants';  // URL to web api

  constructor(private http: Http) { }

  getAssistants(): Promise<Assistant[]> {

    return this.http.get(this.assistantsUrl)
        .toPromise()
        .then(response => response.json().data as Assistant[])
        .catch(this.handleError);
  }


  getAssistant(id: number): Promise<Assistant> {
    const url = `${this.assistantsUrl}/${id}`;
    return this.http.get(url)
        .toPromise()
        .then(response => response.json().data as Assistant)
        .catch(this.handleError);
  }

  delete(id: number): Promise<void> {
    const url = `${this.assistantsUrl}/${id}`;
    return this.http.delete(url, {headers: this.headers})
        .toPromise()
        .then(() => null)
        .catch(this.handleError);
  }

  create(hospital: Assistant): Promise<Assistant> {
    return this.http
        .post(this.assistantsUrl, JSON.stringify(hospital), {headers: this.headers})
        .toPromise()
        .then(res => res.json().data)
        .catch(this.handleError);
  }

  update(hospital: Assistant): Promise<Assistant> {
    const url = `${this.assistantsUrl}/${hospital.id}`;
    return this.http
        .put(url, JSON.stringify(hospital), {headers: this.headers})
        .toPromise()
        .then(() => hospital)
        .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }
}
