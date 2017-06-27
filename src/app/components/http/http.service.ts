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

@Injectable()
export abstract class HttpService {

  private headers: Headers;
  private errorText: string = '';
  private httpErrorMessage: string = '';
  private successText: string = '';
  private deletedText: string = '';
  private storedText: string = '';

  constructor (
    protected http: Http,
    private authenticationService: AuthenticationService,
    private _logger: Logger,
    private _state: GlobalState,
    private translate: TranslateService,
  ) {
    this.headers = new Headers({ 'Authorization': 'Bearer ' + this.authenticationService.token });
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

  public getUrl(path: string|number = null): string {
    return environment.apiHost + '/' + this.getPrefix() + (path ? '/' + path : '');
  }

  protected getAuthHeaders(): Headers {
    return this.headers;
  }

  /**
   * path prefix to generating new urls by the method getUrl
   */
  protected abstract getPrefix(): string;

  /**
   * Get request
   * @param id
   * @returns {Promise<any|T>}
   */
  protected get(id: string|number = null): Promise<any> {
    return this.http.get(this.getUrl(id), { headers: this.getAuthHeaders() })
      .toPromise()
      .catch(error => this.handleError(error, this));
  }

  /**
   * Delete request
   * @param id
   * @returns {Promise<any|T>}
   */
  protected remove(id: number): Promise<any> {
    return this.http.delete(this.getUrl(id), { headers: this.getAuthHeaders() })
      .toPromise()
      .then(() => this.success(this.deletedText, this))
      .catch(error => this.handleError(error, this));
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
      .catch(error => this.handleError(error, this));
  }

  /**
   * Update resource
   * @param id
   * @param data
   * @returns {Promise<any|T>}
   */
  protected put(id, data): Promise<any> {

    if (!+id) {
      return this.handleError(this.httpErrorMessage, this);
    }

    return this.http
      .put(this.getUrl(id), JSON.stringify(data), { headers: this.getAuthHeaders() })
      .toPromise()
      .catch(error => this.handleError(error, this));
  }

  /**
   * Overlapping errors
   * @param error
   * @param self
   * @returns {Promise<never>}
   */
  private handleError(error: any, self: any): Promise<any> {
    const msgs = [];
    msgs.push({ severity: 'error', summary: this.errorText,
      detail: this.httpErrorMessage });
    this._state.notifyDataChanged('growl', msgs);

    if (!environment.production) {
      this._logger.error(error);
    }

    return Promise.reject(error.message || error);
  }

  private success(message: string = '', self: any): void {
    const msgs = [];
    msgs.push({ severity: 'success', summary: self.successText,
      detail: message });
    this._state.notifyDataChanged('growl', msgs);
  }
}
