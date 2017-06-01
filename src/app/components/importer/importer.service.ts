/*
 * Copyright (c) 2017
 *
 *  @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { AuthenticationService } from '../auth/authentication.service';

@Injectable()
export class ImporterService {
  private headers: Headers;

  constructor(private http: Http, private authenticationService: AuthenticationService) {
    this.headers = new Headers({ 'Authorization': 'Bearer ' + this.authenticationService.token });
  }

  getQueue(url): Promise<any> {

    return this.http.get(url, {headers: this.headers})
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  deleteFile(url: string, id: number): Promise<void> {
    url = `${url}/${id}`;
    return this.http.delete(url, {headers: this.headers})
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

  importFile(url:string, id: number) : Promise<void> {
    url = `${url}/${id}`;
    return this.http.put(url, [], {headers: this.headers})
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }
}
