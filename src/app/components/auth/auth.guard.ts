/*
 * Copyright (c) 2017
 *
 *  @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthenticationService } from './authentication.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private jwtHelper: JwtHelperService,
    ) {}

  canActivate() {
    if ( this.authService.getToken()
      && !this.jwtHelper.isTokenExpired() ) {
      return true;
    }

    this.authService.logout();
    this.router.navigate(['/login']);
    return false;
  }

}
