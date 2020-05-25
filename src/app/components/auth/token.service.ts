/*
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU General Public License
 * as published by the Free Software Foundation; under version 2
 * of the License (non-upgradable).
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
 *
 * Copyright (c) 2020 (original work) MedCenter24.com;
 */

import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UiToastService } from '../ui/toast/ui.toast.service';
import { LoggerComponent } from '../core/logger/LoggerComponent';
import { LocalStorageHelper } from '../../helpers/local.storage.helper';
import { JwtHelperService } from '@auth0/angular-jwt';
import { GlobalState } from '../../global.state';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs/Rx';

@Injectable()
export class TokenService {
  private refreshUrl = `${environment.apiHost}/token`;
  private refreshTokenInitialized: boolean = false;

  // refresh action
  refreshStarted: boolean = false;

  // key for storage
  tokenKey: string = 'token';
  private timer: Subscription;

  constructor (
    private http: HttpClient,
    private uiToastService: UiToastService,
    private _logger: LoggerComponent,
    private storage: LocalStorageHelper,
    private jwtHelper: JwtHelperService,
    private _state: GlobalState,
    private router: Router,
  ) {
  }

  refresh(): void {
    if (this.getToken()) { // if have token and can run updater
      this.refreshStarted = true;
      this.http.get( this.refreshUrl,
        { headers: new HttpHeaders( { 'Authorization': `Bearer ${this.getToken()}` } ) } )
        .subscribe(
          ( response: any ) => {
            this.setToken( response && response.access_token );
            this.refreshStarted = false;
          },
          err => {
            this.refreshStarted = false;
            if (err && err.status && err.status === 401) {
              this.removeToken();
            } else {
              this._logger.error( err.toString() );
              this.uiToastService.error();
            }
          },
        );
    }
  }

  getToken(): string {
    return this.storage.getItem( this.tokenKey );
  }

  setToken(token: string): boolean {
    this._state.notifyDataChanged('token', token);
    if (token) {
      // set token property
      // store username and jwt token in local storage to keep user logged in between page refreshes
      this.storage.setItem(this.tokenKey, token);
      this.runRefreshTokenTimer();
      // return true to indicate successful login
      return true;
    }
    // return false to indicate failed login
    return false;
  }

  removeToken(): void {
    // clear token remove user from local storage to log user out
    this.storage.removeItem(this.tokenKey);
    this.router.navigate(['/login'])
      .then(() => this._logger.info('Token removed'));
  }

  private runRefreshTokenTimer(): void {
    if (!this.refreshTokenInitialized) {
      this.refreshTokenInitialized = true;
      // handle each second to synchronize application
      const token = this.getToken();
      if (token) {
        const decodedToken = this.jwtHelper.decodeToken( token );
        const jwtExp = decodedToken.exp; // exp at
        const jwtIat = decodedToken.iat; // valid since
        const rangeSec = jwtExp - jwtIat;

        let period = 3600;
        if (rangeSec < period) { // if token exists less then hour
          period = rangeSec / 2;
        }

        if (this.timer) {
          this.timer.unsubscribe();
        }
        // each 5 min
        this.timer = Observable.interval(300000).subscribe((v) => {
          const now: number = Math.ceil( new Date().getTime() / 1000 ); // UTC seconds
          const left: number = jwtExp - now;
          if (left < period && !this.refreshStarted) { // less then allowed
            this.refresh();
          }
        });
      }
    }
  }
}
