/*
 * Copyright (c) 2017. 
 *
 * @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import {Injectable} from '@angular/core';
import {Headers, Http} from "@angular/http";
import {AccidentCheckpoint} from "./checkpoint";

@Injectable()
export class AccidentCheckpointsService {

  private headers = new Headers({'Content-Type': 'application/json'});
  private checkpointsUrl = 'director/checkpoints';  // URL to web api

  constructor(private http: Http) { }

  getCheckpoints(): Promise<AccidentCheckpoint[]> {
    return this.http.get(this.checkpointsUrl)
        .toPromise()
        .then(response => response.json().data as AccidentCheckpoint[])
        .catch(this.handleError);
  }


  getCheckpoint(id: number): Promise<AccidentCheckpoint> {
    const url = `${this.checkpointsUrl}/${id}`;
    return this.http.get(url)
        .toPromise()
        .then(response => response.json().data as AccidentCheckpoint)
        .catch(this.handleError);
  }

  delete(id: number): Promise<void> {
    const url = `${this.checkpointsUrl}/${id}`;
    return this.http.delete(url, {headers: this.headers})
        .toPromise()
        .then(() => null)
        .catch(this.handleError);
  }

  create(checkpoint: AccidentCheckpoint): Promise<AccidentCheckpoint> {
    return this.http
        .post(this.checkpointsUrl, JSON.stringify(checkpoint), {headers: this.headers})
        .toPromise()
        .then(res => res.json().data)
        .catch(this.handleError);
  }

  update(checkpoint: AccidentCheckpoint): Promise<AccidentCheckpoint> {
    const url = `${this.checkpointsUrl}/${checkpoint.id}`;
    return this.http
        .put(url, JSON.stringify(checkpoint), {headers: this.headers})
        .toPromise()
        .then(() => checkpoint)
        .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }
}
