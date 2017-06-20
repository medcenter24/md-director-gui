/*
 * Copyright (c) 2017.
 *
 * @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import { Injectable } from '@angular/core';
import { Assistant } from './assistant';
import { HttpService } from '../http/http.service';

@Injectable()
export class AssistantsService extends HttpService{

  protected getPrefix(): string {
    return 'director/assistants';
  }
  
  getAssistants(): Promise<Assistant[]> {

    return this.http.get(this.getUrl(), { headers: this.getAuthHeaders() })
        .toPromise()
        .then(response => response.json().data as Assistant[])
        .catch(this.handleError);
  }


  getAssistant(id: number): Promise<Assistant> {
    const url = `${this.getUrl()}/${id}`;
    return this.http.get(url, { headers: this.getAuthHeaders() })
        .toPromise()
        .then(response => response.json().data as Assistant)
        .catch(this.handleError);
  }

  delete(id: number): Promise<void> {
    const url = `${this.getUrl()}/${id}`;
    return this.http.delete(url, { headers: this.getAuthHeaders() })
        .toPromise()
        .then(() => null)
        .catch(this.handleError);
  }

  create(hospital: Assistant): Promise<Assistant> {
    return this.http
        .post(this.getUrl(), JSON.stringify(hospital), { headers: this.getAuthHeaders() })
        .toPromise()
        .then(res => res.json() as Assistant)
        .catch(this.handleError);
  }

  update(hospital: Assistant): Promise<Assistant> {
    const url = `${this.getUrl()}/${hospital.id}`;
    return this.http
        .put(url, JSON.stringify(hospital), {headers: this.getAuthHeaders()})
        .toPromise()
        .then(() => hospital)
        .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }
}
