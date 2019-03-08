/*
 * Copyright (c) 2017
 *
 *  @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from './authentication.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { GlobalState } from '../../global.state';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private jwtHelper: JwtHelperService,
    private _state: GlobalState,
    ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if ( this.authService.getToken()
      && !this.jwtHelper.isTokenExpired() ) {
      this._state.notifyDataChanged('changeUri', state.url);
      return true;
    }

    this.authService.logout();
    this.router.navigate(['/login']);
    return false;
  }

}
