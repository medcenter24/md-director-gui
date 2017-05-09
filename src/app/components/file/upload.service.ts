/*
 * Copyright (c) 2017.
 *
 * @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import {Injectable} from '@angular/core';
import {Headers, Http} from "@angular/http";

@Injectable()
export class UploadService {

  private headers = new Headers({'Content-Type': 'application/json'});
  private uploadUrl = 'director/upload';  // URL to web api

  constructor(private http: Http) { }

  getUploadUrl(): string {
    return this.uploadUrl;
  }


  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }
}
