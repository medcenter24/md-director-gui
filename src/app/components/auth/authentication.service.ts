/*
 * Copyright (c) 2017
 *
 *  @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { environment } from '../../../environments/environment';
import { AuthHttp, JwtHelper } from 'angular2-jwt';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { TranslateService } from '@ngx-translate/core';
import { Logger } from 'angular2-logger/core';
import { GlobalState } from '../../global.state';
import { Message } from 'primeng/primeng';

@Injectable()
export class AuthenticationService {

  public token: string;
  private authUrl = environment.apiHost + '/authenticate';  // URL to web api
  private refreshUrl = environment.apiHost + '/token';
  private refreshTimer;
  private jwtHelper: JwtHelper = new JwtHelper();
  msgs: Message[] = [];

  constructor (
    private http: Http,
    private authHttp: AuthHttp,
    private loadingBar: SlimLoadingBarService,
    private translate: TranslateService,
    private _logger: Logger,
    private _state: GlobalState,
  ) {
    // set token if saved in local storage
    const token = localStorage.getItem('token');
    this.setToken(token);
  }

  login (username: string, password: string): Observable<boolean> {
    this.loadingBar.start();
    return this.http.post(this.authUrl, JSON.stringify({ email: username, password: password }))
      .map((response: Response) => {
        this.loadingBar.stop();
        // login successful if there's a jwt token in the response
        const token = response.json() && response.json().token;
        return this.setToken(token);
      });
  }

  logout (): void {
    // clear token remove user from local storage to log user out
    this.token = null;
    localStorage.removeItem('token');
    clearTimeout(this.refreshTimer);
  }

  refresh(): void {
    this.authHttp.get(this.refreshUrl)
      .subscribe(
        response => {
          const token = response.json() && response.json().token;
          return this.setToken(token);
        },
        err => {
          this.msgs = [];
          this.msgs.push({ severity: 'error', summary: this.translate.instant('Error'), detail: err });
          this._state.notifyDataChanged('growl', this.msgs);
        }
      );
  }

  private runRefreshTokenTimer(): void {
    const now: number = new Date().valueOf();
    const jwtExp = this.jwtHelper.decodeToken(this.token).exp;
    const exp = new Date(0);
    exp.setUTCSeconds(jwtExp);
    let delay = exp.valueOf() - now;
    if (delay > 5000) {
      delay -= 5000;
    }
    this.refreshTimer = setTimeout(() => {
      this.refresh();
    }, delay);
  }

  private setToken(token: string): boolean {
    if (token) {
      // set token property
      this.token = token;
      // store username and jwt token in local storage to keep user logged in between page refreshes
      localStorage.setItem('token', token);
      this.runRefreshTokenTimer();
      // return true to indicate successful login
      return true;
    }
    // return false to indicate failed login
    return false;
  }
}
