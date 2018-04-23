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
import { Message } from 'primeng/primeng';
import { Company } from '../../components/company/company';
import { LoadingComponent } from '../../components/core/components/componentLoader/LoadingComponent';
import { Logger } from 'angular2-logger/core';
import { LocalStorageHelper } from '../../helpers/local.storage.helper';
import { isNumber, isObject } from 'util';
import { UploaderOptions, UploadInput } from 'ngx-uploader';

@Component({
  selector: 'nga-profile',
  templateUrl: './profile.html',
  styleUrls: ['./profile.scss'],
})
export class ProfileComponent extends LoadingComponent implements OnInit {

  protected componentName: string = 'ProfileComponent';

  languages: any[] = [];
  lang: string = 'en';
  selectedTab = null;
  tabs: any[] = [];
  loggedUser: User;
  defaultPicture: string = 'assets/img/theme/photo-camera.svg';
  uploaderOptions: UploaderOptions;
  eventToUpload: UploadInput;
  msgs: Message[] = [];
  directorPhotoUri: string = '';
  private profileTabIndexKey: string = 'profileTabIndex';

  constructor (
               protected loadingBar: SlimLoadingBarService,
               protected _state: GlobalState,
               protected _logger: Logger,
               private translateService: TranslateService,
               private usersService: UsersService,
               private loggedUserService: LoggedUserService,
               private authService: AuthenticationService,
               private storage: LocalStorageHelper,
  ) {
    super();
  }

  ngOnInit (): void {
    const langs = this.translateService.getLangs();
    this._state.notifyDataChanged('menu.activeLink', { title: 'Profile' });
    this.languages = langs.map((v) => ({ label: v, value: v }) );
    this.startLoader(this.componentName);
    this.loggedUserService.getUser().then((user: User) => {
      this.stopLoader(this.componentName);
      this.loggedUser = user;
      this.directorPhotoUri = user.thumb_200 ? `data:image/jpeg;base64,${user.thumb_200}` : '';

      this.eventToUpload = {
        type: 'uploadAll',
        url: this.usersService.getUrl(`${this.loggedUser.id}/photo`),
        method: 'POST',
        headers: { 'Authorization': `Bearer ${this.authService.getToken()}` },
      };
    }).catch(() => this.loadedComponent());

    this._state.subscribe('token', (token) => {
      this.eventToUpload.headers = { 'Authorization': `Bearer ${token}` };
    });

    this.tabs = [
        { id: 1, name: 'Director' },
        { id: 2, name: 'Company' },
        { id: 3, name: 'Settings' },
    ];

    this.selectTab(+this.storage.getItem(this.profileTabIndexKey));
  }

  selectTab(tab: any): void {
    let id = 0;
    if (isObject(tab)) {
        const pos = this.tabs.findIndex(x => x.id === tab.id);
        if (pos) {
            id = pos;
        }
    } else if (isNumber(tab) && tab >= 0) {
      this.selectedTab = this.tabs[tab];
      id = tab;
    }
    this.selectedTab = this.tabs[id];
    this.storage.setItem(this.profileTabIndexKey, `${id}`);
  }

  onLangChanged (event): void {
    this.onInit(`${this.componentName}LangChange`);
    this.usersService.update(this.loggedUser)
      .then(() => {
        this._state.notifyDataChanged('lang', this.loggedUser.lang);
        this.onLoaded(`${this.componentName}LangChange`);
      }).catch(() => this.onLoaded(`${this.componentName}LangChange`));
  }

  refreshToken(): void {
    this.authService.refresh();
  }

  saveDirector(): void {
    this.onInit(`${this.componentName}SaveDirector`);
    this.usersService.update(this.loggedUser)
      .then(() => {
        this.onLoaded(`${this.componentName}SaveDirector`);
        this.msgs = [];
        this.msgs.push({ severity: 'success',
            summary: this.translateService.instant('Success'),
            detail: this.translateService.instant('Saved') });
        this._state.notifyDataChanged('growl', this.msgs);
      })
      .catch(() => {
        this.onLoaded(`${this.componentName}SaveDirector`);
        this.msgs = [];
        this.msgs.push({ severity: 'error',
            summary: this.translateService.instant('error'),
            detail: this.translateService.instant('Data not saved') });
        this._state.notifyDataChanged('growl', this.msgs);
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
    this.startLoader(`${this.componentName}PhotoUpload`);
  }

  endPhotoUpload(event): void {
    this.stopLoader(`${this.componentName}PhotoUpload`);
    this.msgs.push({ severity: 'success',
      summary: this.translateService.instant('Success'),
      detail: this.translateService.instant('Saved') });
    this._state.notifyDataChanged('growl', this.msgs);

    this.startLoader(`${this.componentName}LoadUser`);
    this.loggedUserService.getUser().then((user: User) => {
      this.stopLoader(`${this.componentName}LoadUser`);
      this.loggedUser = user;
      this._state.notifyDataChanged('avatarB64', user.thumb_45);
      this.directorPhotoUri = user.thumb_200 ? `data:image/jpeg;base64,${user.thumb_200}` : '';
    }).catch(() => this.stopLoader(`${this.componentName}LoadUser`));
  }

  deletePhoto(): void {
    this.startLoader(`${this.componentName}PhotoDelete`);
    this.usersService.deletePhoto(this.loggedUser.id)
    .then(() => {
      this.stopLoader(`${this.componentName}PhotoDeleted`);
      this.msgs.push({ severity: 'success',
        summary: this.translateService.instant('Success'),
        detail: this.translateService.instant('Saved') });
      this._state.notifyDataChanged('growl', this.msgs);
    })
    .catch(() => {
      this.stopLoader(`${this.componentName}PhotoDeleted`);
      this.msgs.push({ severity: 'error',
        summary: this.translateService.instant('error'),
        detail: this.translateService.instant('Data not saved') });
      this._state.notifyDataChanged('growl', this.msgs);
    });
  }

  timezoneChanged(tz): void {
    if (isObject(tz)) {
      return;
    }
    this.loggedUser.timezone = tz;
    this.startLoader(`${this.componentName}Tz`);
    this.usersService.update(this.loggedUser)
      .then(() => this.stopLoader(`${this.componentName}Tz`))
      .catch(() => this.stopLoader(`${this.componentName}Tz`));
  }
}
