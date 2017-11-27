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
import { NgUploaderOptions } from 'ngx-uploader/src/classes/ng-uploader-options.class';

@Component({
  selector: 'nga-profile',
  templateUrl: './profile.html',
})
export class ProfileComponent implements OnInit {

  languages: any[] = [];
  loaded: boolean = false;
  lang: string = 'en';

  loggedUser: User;
  defaultPicture = 'assets/img/theme/photo-camera.svg';
  uploaderOptions: NgUploaderOptions = {
    // url: 'http://website.com/upload'
    url: '',
  };
  picture: string = '';
  private loadingControl: string[] = [];

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

  startUpload(): void {
    this.loadingBar.start();
  }

  endUpload(event): void {
    // this.assistant.media_id = event.media_id;
      console.log(event);
    this.loadingBar.complete();
  }

  onLoading(key): void {
    console.log('loading');
  }

  onLoaded(key): void {
    console.log('loaded');
  }
}
