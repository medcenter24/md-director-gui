/*
 * Copyright (c) 2017
 *
 *  @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { tokenNotExpired } from 'angular2-jwt';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private authService: AuthenticationService,
    ) {}

  canActivate() {
    if ( localStorage.getItem('token')
      && tokenNotExpired('token', localStorage.getItem('token')) ) {
      return true;
    }

    this.authService.logout();
    this.router.navigate(['/login']);
    return false;
  }

}
