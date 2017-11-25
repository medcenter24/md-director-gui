/*
 * Copyright (c) 2017.
 *
 * @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import { Component, OnInit } from '@angular/core';

import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { GlobalState } from '../../global.state';
import { TranslateService } from '@ngx-translate/core';
import { UsersService } from '../../components/users/users.service';
import { User } from '../../components/users/user';
import { LoggedUserService } from '../../components/auth/loggedUser.service';
import { AuthenticationService } from '../../components/auth/authentication.service';

@Component({
  selector: 'nga-profile',
  templateUrl: './profile.html',
})
export class ProfileComponent implements OnInit {

  languages: any[] = [];
  loaded: boolean = false;
  lang: string = 'en';

  loggedUser: User;

  constructor (
               private loadingBar: SlimLoadingBarService,
               private _state: GlobalState,
               private translateService: TranslateService,
               private usersService: UsersService,
               private loggedUserService: LoggedUserService,
               private authService: AuthenticationService,
  ) { }

  ngOnInit (): void {
    const langs = this.translateService.getLangs();
    this._state.notifyDataChanged('menu.activeLink', { title: 'Profile' });
    this.languages = langs.map((v) => ({ label: v, value: v }) );
    this.loadingBar.start();
    this.loggedUserService.getUser().then(user => {
      this.loadingBar.complete();
      this.loggedUser = user;
    }).catch(() => this.loadingBar.complete());
  }

  onLangChanged (event): void {
    this.loadingBar.start();
    this.usersService.update(this.loggedUser)
      .then(() => {
        this._state.notifyDataChanged('lang', this.loggedUser.lang);
        this.loadingBar.complete();
      }).catch(() => this.loadingBar.complete());
  }

  refreshToken(): void {
    this.authService.refresh();
  }
}
