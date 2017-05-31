/*
 * Copyright (c) 2017
 *
 *  @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { tokenNotExpired } from 'angular2-jwt';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate() {
    if(tokenNotExpired('currentUser', JSON.parse(localStorage.getItem('currentUser')).token)) {
      return true;
    }

    this.router.navigate(['/login']);
    return false;
  }

}
