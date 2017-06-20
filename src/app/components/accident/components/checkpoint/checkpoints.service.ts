/*
 * Copyright (c) 2017. 
 *
 * @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import {Injectable} from '@angular/core';
import {AccidentCheckpoint} from "./checkpoint";
import {HttpService} from "../../../http/http.service";

@Injectable()
export class AccidentCheckpointsService extends HttpService {

  protected getPrefix(): string {
    return 'director/checkpoints';
  }

  getCheckpoints(): Promise<AccidentCheckpoint[]> {
    return this.http.get(this.getUrl(), { headers: this.getAuthHeaders() })
        .toPromise()
        .then(response => response.json().data as AccidentCheckpoint[])
        .catch(this.handleError);
  }


  getCheckpoint(id: number): Promise<AccidentCheckpoint> {
    const url = `${this.getUrl()}/${id}`;
    return this.http.get(url, { headers: this.getAuthHeaders() })
        .toPromise()
        .then(response => response.json().data as AccidentCheckpoint)
        .catch(this.handleError);
  }

  delete(id: number): Promise<void> {
    const url = `${this.getUrl()}/${id}`;
    return this.http.delete(url, { headers: this.getAuthHeaders() })
        .toPromise()
        .then(() => null)
        .catch(this.handleError);
  }

  create(checkpoint: AccidentCheckpoint): Promise<AccidentCheckpoint> {
    return this.http
        .post(this.getUrl(), JSON.stringify(checkpoint), { headers: this.getAuthHeaders() })
        .toPromise()
        .then(res => res.json() as AccidentCheckpoint)
        .catch(this.handleError);
  }

  update(checkpoint: AccidentCheckpoint): Promise<AccidentCheckpoint> {
    const url = `${this.getUrl()}/${checkpoint.id}`;
    return this.http
        .put(url, JSON.stringify(checkpoint), { headers: this.getAuthHeaders() })
        .toPromise()
        .then(() => checkpoint)
        .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }
}
