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
  }

  public getUrl(path: string|number = null): string {
    return environment.apiHost + '/' + this.getPrefix() + (path ? '/' + path : '');
  }

  protected getAuthHeaders(): Headers {
    return this.headers;
  }

  /**
   * Overlapping errors
   * @param error
   * @returns {Promise<never>}
   */
  protected handleError(error: any): Promise<any> {
    const msgs = [];

    if (!environment.production) {
      this._logger.error(error);
    }

    msgs.push({ severity: 'error', summary: this.errorText,
      detail: this.httpErrorMessage });
    this._state.notifyDataChanged('growl', msgs);

    return Promise.reject(error.message || error);
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
      .catch(this.handleError);
  }

  /**
   * Delete request
   * @param id
   * @returns {Promise<any|T>}
   */
  protected remove(id: number): Promise<any> {
    return this.http.delete(this.getUrl(id), { headers: this.getAuthHeaders() })
      .toPromise()
      .catch(this.handleError);
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
      .catch(this.handleError);
  }

  /**
   * Update resource
   * @param id
   * @param data
   * @returns {Promise<any|T>}
   */
  protected put(id, data): Promise<any> {

    if (!+id) {
      const msgs = [];
      msgs.push({ severity: 'error', summary: this.errorText,
        detail: this.httpErrorMessage });
      this._state.notifyDataChanged('growl', msgs);
      if (!environment.production) {
        this._logger.error('Blocked try to update resource without identifier');
      }
    }

    return this.http
      .put(this.getUrl(id), JSON.stringify(data), { headers: this.getAuthHeaders() })
      .toPromise()
      .catch(this.handleError);
  }
}
