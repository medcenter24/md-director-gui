/*
 * Copyright (c) 2017
 *
 *  @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { AuthenticationService } from '../auth/authentication.service';
import { environment } from '../../../environments/environment';
import 'rxjs/add/operator/toPromise';
import { Logger } from 'angular2-logger/core';
import { GlobalState } from '../../global.state';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { Message } from 'primeng/primeng';

@Injectable()
export abstract class HttpService {

  private errorText: string = '';
  private httpErrorMessage: string = '';
  private successText: string = '';
  private deletedText: string = '';
  private storedText: string = '';
  private msgs: Message[] = [];

  constructor (
    protected http: Http,
    private authenticationService: AuthenticationService,
    private _logger: Logger,
    private _state: GlobalState,
    private translate: TranslateService,
    private router: Router,
  ) {
    this.translate.get('Error').subscribe(res => {
      this.errorText = res;
    });
    this.translate.get('Http error occurred').subscribe(res => {
      this.httpErrorMessage = res;
    });
    this.translate.get('Success').subscribe(res => {
      this.successText = res;
    });
    this.translate.get('Deleted').subscribe(res => {
      this.deletedText = res;
    });
    this.translate.get('Stored').subscribe(res => {
      this.storedText = res;
    });
  }

  getUrl(path: string|number = null): string {
    let url = `${environment.apiHost}/${this.getPrefix()}`;
      if (path) {
          url += `/${path}`;
      }
    return url;
  }

  protected getAuthHeaders(): Headers {
    return new Headers({ 'Authorization': `Bearer ${this.authenticationService.getToken()}` });
  }

  /**
   * path prefix to generating new urls by the method getUrl
   */
  protected abstract getPrefix(): string;

  /**
   * Get request
   * @param id
   * @param params
   * @param body
   * @returns {Promise<any>}
   */
  protected get(id: string|number = null, params: string = '', body: any = null): Promise<any> {
    return this.http.get(this.getUrl(id), { headers: this.getAuthHeaders(), params, body })
      .toPromise()
      .catch(error => this.handleError(error));
  }

  /**
   * Delete request
   * @param id
   * @returns {Promise<any|T>}
   */
  protected remove(id: any): Promise<any> {
    return this.http.delete(this.getUrl(id), { headers: this.getAuthHeaders() })
      .toPromise()
      .then(() => this.success(this.deletedText, this))
      .catch(error => this.handleError(error));
  }

  /**
   * Create new resource
   * @param data
   * @returns {Promise<any|T>}
   */
  protected store(data): Promise<any> {
    return this.http
      .post(this.getUrl(), JSON.stringify(data), { headers: this.getAuthHeaders() })
      .toPromise()
      .then(response => {
        this.success(this.storedText, this);
        return Promise.resolve(response);
      })
      .catch(error => this.handleError(error));
  }

  /**
   * Update resource
   * @param id
   * @param data
   * @returns {Promise<any|T>}
   */
  protected put(id, data): Promise<any> {

    if (!id) {
      return this.handleError(this.httpErrorMessage);
    }

    return this.http
      .put(this.getUrl(id), JSON.stringify(data), { headers: this.getAuthHeaders() })
      .toPromise()
      .catch(error => this.handleError(error));
  }

  /**
   * Overlapping errors
   * @param error
   * @returns {Promise<never>}
   */
  protected handleError(error: any): Promise<any> {

    if (!environment.production) {
      this._logger.error(error);
    }

    if (error && error.status && error.status === 401) {
      // won't clean all data so we need browser redirect
      // but I'm trying to clean them by hand
      this.authenticationService.logout();
      this.router.navigate(['login']);
      // window.location.replace('/login');
    } else if (error && error.status && error.status === 422) {
      this._state.notifyDataChanged('apiError', error);
    } else {
      this.msgs.push({ severity: 'error', summary: this.errorText,
          detail: this.httpErrorMessage });
      this._state.notifyDataChanged('growl', this.msgs);
    }

    return Promise.reject(error);
  }

  private success(message: string = '', self: any): void {
    this.msgs.push({ severity: 'success', summary: self.successText,
      detail: message });
    this._state.notifyDataChanged('growl', this.msgs);
  }
}
