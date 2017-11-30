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
import { GlobalState } from '../../global.state';
import { Message } from 'primeng/primeng';
import { Router } from '@angular/router';
import { LocalStorageHelper } from '../../helpers/local.storage.helper';

/**
 * I met a lot of issues with tokens, so make it as simple as possible
 * 1. issue: this service is not unique, so I can't use this.token
 * 2. issue: auto refresh of the token will be a cause like that:
 *   when I need to refresh token I could lost data
 *   - send refresh request (it will update token on the server)
 *   - send request with old token (it will produce an error that token is not correct)
 *   - return from server with new token, but error has been already thrown
 *
 *   // todo find out how could I push all requests to the queue to avoid requests with incorrect token on update
 *
 */

@Injectable()
export class AuthenticationService {

  tokenKey: string = 'token';
  langKey: string = 'lang';
  msgs: Message[] = [];
  private authUrl = `${environment.apiHost}/authenticate`;  // URL to web api
  private refreshUrl = `${environment.apiHost}/token`;
  private refreshTimer;
  private jwtHelper: JwtHelper = new JwtHelper();

  constructor (
    private http: Http,
    private authHttp: AuthHttp,
    private loadingBar: SlimLoadingBarService,
    private translate: TranslateService,
    private _state: GlobalState,
    private router: Router,
    private storage: LocalStorageHelper,
  ) { }

  login (username: string, password: string): Observable<boolean> {
    this.loadingBar.start();
    return this.http.post(this.authUrl, JSON.stringify({ email: username, password }))
      .map((response: Response) => {
        this.loadingBar.stop();
        // login successful if there's a jwt token in the response
        const token = response.json() && response.json().access_token;
        const lang = response.json() && response.json().lang;
        // store language
        this.storage.setItem(this.langKey, lang);
        this.storage.setItem(this.tokenKey, token);
        return true;
      });
  }

  logout (): void {
    // clear token remove user from local storage to log user out
    this.storage.removeItem(this.tokenKey);
    this.stopRefreshTokenTimer();
  }

  refresh(): void {
    this.authHttp.get(this.refreshUrl)
      .subscribe(
        response => {
          const token = response.json() && response.json().access_token;
          this.setToken(token);
        },
        err => {
            if (err && err.status && err.status === 401) {
                // won't clean all data so we need browser redirect
                // but I'm trying to clean them by hand
                this.logout();
                this.router.navigate(['login']);
            } else {
                this.msgs = [];
                this.msgs.push({ severity: 'error', summary: this.translate.instant('Error'), detail: err });
                this._state.notifyDataChanged('growl', this.msgs);
            }
        },
      );
  }

  getToken(): string {
    return this.storage.getItem(this.tokenKey);
  }

  private runRefreshTokenTimer(): void {
      const now: number = new Date().valueOf();
      const jwtExp = this.jwtHelper.decodeToken(this.getToken()).exp;
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
          // store username and jwt token in local storage to keep user logged in between page refreshes
          this.storage.setItem(this.tokenKey, token);
          this.stopRefreshTokenTimer();
          this.runRefreshTokenTimer();
          // return true to indicate successful login
          return true;
      }
      // return false to indicate failed login
      return false;
  }

  private stopRefreshTokenTimer(): void {
    if (this.refreshTimer) {
      clearTimeout(this.refreshTimer);
      this.refreshTimer = null;
    }
  }
}
