/*
 * Copyright (c) 2017
 *
 *  @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { AuthenticationService } from '../auth/authentication.service';
import { environment } from '../../../environments/environment';

@Injectable()
export abstract class HttpService {

  private headers: Headers;

  constructor(protected http: Http, private authenticationService: AuthenticationService) {
    this.headers = new Headers({ 'Authorization': 'Bearer ' + this.authenticationService.token });
  }

  public getUrl(path: string = null): string {
    return environment.apiHost + '/' + this.getPrefix() + (path ? '/' + path : '');
  }

  protected getAuthHeaders(): Headers {
    return this.headers;
  }

  protected abstract getPrefix(): string;
}