/*
 * Copyright (c) 2017. 
 *
 * @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import {Injectable} from '@angular/core';
import {AccidentStatus} from "./status";
import {HttpService} from "../../../http/http.service";

@Injectable()
export class AccidentStatusesService extends HttpService {

  protected getPrefix(): string {
    return 'director/statuses';
  }

  getStatuses(): Promise<AccidentStatus[]> {
    return this.http.get(this.getUrl(), { headers: this.getAuthHeaders() })
        .toPromise()
        .then(response => response.json().data as AccidentStatus[])
        .catch(this.handleError);
  }

  getStatuse(id: number): Promise<AccidentStatus> {
    const url = `${this.getUrl()}/${id}`;
    return this.http.get(url, { headers: this.getAuthHeaders() })
        .toPromise()
        .then(response => response.json().data as AccidentStatus)
        .catch(this.handleError);
  }

  delete(id: number): Promise<void> {
    const url = `${this.getUrl()}/${id}`;
    return this.http.delete(url, { headers: this.getAuthHeaders() })
        .toPromise()
        .then(() => null)
        .catch(this.handleError);
  }

  create(statuse: AccidentStatus): Promise<AccidentStatus> {
    return this.http
        .post(this.getUrl(), JSON.stringify(statuse), { headers: this.getAuthHeaders() })
        .toPromise()
        .then(res => res.json() as AccidentStatus)
        .catch(this.handleError);
  }

  update(statuse: AccidentStatus): Promise<AccidentStatus> {
    const url = `${this.getUrl()}/${statuse.id}`;
    return this.http
        .put(url, JSON.stringify(statuse), { headers: this.getAuthHeaders() })
        .toPromise()
        .then(() => statuse)
        .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }
}
