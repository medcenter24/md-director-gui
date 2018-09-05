/*
 * Copyright (c) 2017
 *
 *  @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import { Injectable } from '@angular/core';
import { AuthenticationService } from '../../auth/authentication.service';
import { environment } from '../../../../environments/environment';
import 'rxjs/add/operator/toPromise';
import { Logger } from 'angular2-logger/core';
import { GlobalState } from '../../../global.state';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { Message } from 'primeng/primeng';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export abstract class HttpService {

  private errorText: string = '';
  private httpErrorMessage: string = '';
  private successText: string = '';
  private deletedText: string = '';
  private storedText: string = '';
  private msgs: Message[] = [];

  constructor (
    protected http: HttpClient,
    private authenticationService: AuthenticationService,
    private _logger: Logger,
    private _state: GlobalState,
    private translate: TranslateService,
    private router: Router,
  ) {
    this.translate.get('Error').subscribe(res => {
      this.errorText = res;
      this.httpErrorMessage = this.translate.instant('Http error occurred');
      this.successText = this.translate.instant('Success');
      this.deletedText = this.translate.instant('Deleted');
      this.storedText = this.translate.instant('Stored');
    });
  }

  getUrl(path: string|number = null): string {
    let url = `${environment.apiHost}/${this.getPrefix()}`;
      if (path) {
        url += (url.substr(-1) === '/' ? '' : '/') + path;
      }
    return url;
  }

  protected getAuthHeaders(): HttpHeaders {
    return new HttpHeaders({ 'Authorization': `Bearer ${this.authenticationService.getToken()}` });
  }

  /**
   * path prefix to generating new urls by the method getUrl
   */
  protected abstract getPrefix(): string;

  /**
   * Loading filtered list of data resources
   * @param {Object} filters
   * @returns {Promise<any>}
   */
  search (filters: Object): Promise<any> {
    return this.http.post(this.getUrl('search'), JSON.stringify(filters), { headers: this.getAuthHeaders() })
      .toPromise()
      .then(response => {
        return Promise.resolve(response);
      })
      .catch(error => this.handleError(error));
  }

  /**
   * Get request
   * @param id
   * @param params
   * @param body
   * @returns {Promise<any>}
   */
  protected get(id: string|number = null, params: any = null): Promise<any> {
    return this.http.get(this.getUrl(id), { headers: this.getAuthHeaders(), params })
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
      // using dingo/FormRequest style
      this._state.notifyDataChanged('apiError', error);
    } else if (typeof error === 'string') {
      this.msgs = [];
      this.msgs.push({ severity: 'error', summary: 'Error', detail: error });
      this._state.notifyDataChanged('growl', this.msgs);
    } else {
      this.msgs = [];
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
