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
import { Message } from 'primeng/primeng';

@Component({
  selector: 'nga-profile',
  templateUrl: './profile.html',
  styleUrls: ['./profile.scss'],
})
export class ProfileComponent implements OnInit {

  languages: any[] = [];
  loaded: boolean = false;
  lang: string = 'en';
  selectedTab = null;
  tabs: any[] = [];
  loggedUser: User;
  defaultPicture: string = 'assets/img/theme/photo-camera.svg';
  defaultCompanyLogo: string = 'assets/img/theme/cardiogram.svg';
  defaultCompanySign: string = 'assets/img/theme/notebook.svg';
  uploaderOptions: NgUploaderOptions = {
    url: '',
    cors: true,
    authToken: '',
    calculateSpeed: true,
  };
  picture: string = '';
  msgs: Message[] = [];
  directorPhotoUri: string = '';

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
      this.directorPhotoUri = user.thumb_200;
      this.uploaderOptions.url = this.usersService.getUrl(`${this.loggedUser.id}/photo`);
      // todo add global trigger refresh token and bind all relative things to it
      this.uploaderOptions.authToken = this.authService.getToken();
    }).catch(() => this.loadingBar.complete());

    this.tabs = [
        { id: 1, name: 'Director' },
        { id: 2, name: 'Company' },
        { id: 3, name: 'Settings' },
    ];
    this.selectedTab = this.tabs[0];
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

  saveDirector(): void {
    this.loadingBar.start();
    this.usersService.update(this.loggedUser)
      .then(() => {
          this.msgs = [];
          this.msgs.push({ severity: 'success',
              summary: this.translateService.instant('Success'),
              detail: this.translateService.instant('Saved') });
          this._state.notifyDataChanged('growl', this.msgs);
          this.loadingBar.complete();
      })
      .catch(() => {
          this.msgs = [];
          this.msgs.push({ severity: 'error',
              summary: this.translateService.instant('error'),
              detail: this.translateService.instant('Data not saved') });
          this._state.notifyDataChanged('growl', this.msgs);
          this.loadingBar.complete();
      });
  }

  directorName(event): void {
    this.loggedUser.name = event.target.value;
  }

  directorMail(event): void {
    this.loggedUser.email = event.target.value;
  }

  directorPhone(event): void {
    this.loggedUser.phone = event.target.value;
  }

  startPhotoUpload(event): void {
    this.loadingBar.start();
  }

  endPhotoUpload(event): void {
    this.msgs.push({ severity: 'success',
      summary: this.translateService.instant('Success'),
      detail: this.translateService.instant('Saved') });
    this._state.notifyDataChanged('growl', this.msgs);
    const response = JSON.parse(event.response);
    this._state.notifyDataChanged('avatarUri', response.thumb45);
    this.loadingBar.complete();
  }

  deletePhoto(): void {
    this.loadingBar.start();
    this.usersService.deletePhoto(this.loggedUser.id)
    .then(() => {
      this.msgs.push({ severity: 'success',
        summary: this.translateService.instant('Success'),
        detail: this.translateService.instant('Saved') });
      this._state.notifyDataChanged('growl', this.msgs);
      this.loadingBar.complete();
    })
    .catch(() => {
      this.msgs.push({ severity: 'error',
        summary: this.translateService.instant('error'),
        detail: this.translateService.instant('Data not saved') });
      this._state.notifyDataChanged('growl', this.msgs);
      this.loadingBar.complete();
    });
  }

  saveCompany(): void {
    console.log('save company data');
  }

  startCompanySignatureUpload(event): void {
    console.log(event);
    this.loadingBar.start();
  }

  endCompanySignatureUpload(event): void {
      console.log(event);
      this.loadingBar.start();
  }

  startCompanyLogoUpload(event): void {
      console.log(event);
      this.loadingBar.start();
  }

  endCompanyLogoUpload(event): void {
      console.log(event);
      this.loadingBar.start();
  }
}
