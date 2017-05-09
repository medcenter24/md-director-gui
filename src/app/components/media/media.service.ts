/*
 * Copyright (c) 2017
 *
 *  @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import {Injectable} from '@angular/core';
import {Headers, Http} from "@angular/http";
import { Media } from './media';

@Injectable()
export class MediaService {

  private headers = new Headers({'Content-Type': 'application/json'});
  private mediaUrl = 'director/media';  // URL to web api

  constructor(private http: Http) { }

  getUploadUrl(): string {
    return this.mediaUrl;
  }

  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }
}
