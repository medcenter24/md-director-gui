/*
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU General Public License
 * as published by the Free Software Foundation; under version 2
 * of the License (non-upgradable).
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
 *
 * Copyright (c) 2019 (original work) MedCenter24.com;
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
import { LoadingComponent } from '../../components/core/components/componentLoader';
import { LocalStorageHelper } from '../../helpers/local.storage.helper';
import { UploaderOptions, UploadInput } from 'ngx-uploader';
import { LoggerComponent } from '../../components/core/logger/LoggerComponent';
import { UiToastService } from '../../components/ui/toast/ui.toast.service';

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
               protected _logger: LoggerComponent,
               private translateService: TranslateService,
               private usersService: UsersService,
               private loggedUserService: LoggedUserService,
               private authService: AuthenticationService,
               private storage: LocalStorageHelper,
               private uiToastService: UiToastService,
  ) {
    super();
  }

  ngOnInit (): void {
    const langs = this.translateService.getLangs();
    this._state.notifyDataChanged('menu.activeLink', { title: 'Profile' });
    this.languages = langs.map((v) => ({ label: v, value: v }) );
    this.startLoader();
    this.loggedUserService.getUser().then((user: User) => {
      this.stopLoader();
      this.loggedUser = user;
      this.directorPhotoUri = user.thumb200 ? `data:image/jpeg;base64,${user.thumb200}` : '';

      this.eventToUpload = {
        type: 'uploadAll',
        url: this.usersService.getUrl(`${this.loggedUser.id}/photo`),
        method: 'POST',
        headers: { 'Authorization': `Bearer ${this.authService.getToken()}` },
      };
    }).catch(() => this.stopLoader());

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
    if (typeof tab === 'object') {
        const pos = this.tabs.findIndex(x => x.id === tab.id);
        if (pos) {
            id = pos;
        }
    } else if (typeof tab === 'number' && tab >= 0) {
      this.selectedTab = this.tabs[tab];
      id = tab;
    }
    this.selectedTab = this.tabs[id];
    this.storage.setItem(this.profileTabIndexKey, `${id}`);
  }

  onLangChanged (event): void {
    const opName = 'LangChange';
    this.startLoader(opName);
    this.usersService.update(this.loggedUser)
      .then(() => {
        this.stopLoader(opName);
        this._state.notifyDataChanged('lang', this.loggedUser.lang);
      }).catch(() => this.stopLoader(opName));
  }

  refreshToken(): void {
    this.authService.refresh();
  }

  saveDirector(): void {
    const opName = 'SaveDirector';
    this.startLoader(opName);
    this.usersService.update(this.loggedUser)
      .then(() => {
        this.stopLoader(opName);
        this.uiToastService.saved();
      })
      .catch(() => {
        this.stopLoader(opName);
        this.uiToastService.error();
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
    this.startLoader('PhotoUpload');
  }

  endPhotoUpload(event): void {
    this.stopLoader('PhotoUpload');
    this.uiToastService.saved();

    const opName: string = 'LoadUser';
    this.startLoader(opName);
    this.loggedUserService.getUser().then((user: User) => {
      this.stopLoader(opName);
      this.loggedUser = user;
      this._state.notifyDataChanged('avatarB64', user.thumb45);
      this.directorPhotoUri = user.thumb200 ? `data:image/jpeg;base64,${user.thumb200}` : '';
    }).catch(() => this.stopLoader(opName));
  }

  deletePhoto(): void {
    const opName = 'PhotoDelete';
    this.startLoader(opName);
    this.usersService.deletePhoto(this.loggedUser.id)
    .then(() => {
      this.stopLoader(opName);
      this.uiToastService.saved();
    })
    .catch(() => {
      this.stopLoader(opName);
      this.uiToastService.error();
    });
  }

  timezoneChanged(tz): void {
    if (typeof tz === 'object') {
      return;
    }
    this.loggedUser.timezone = tz;
    const opName = 'Tz';
    this.startLoader(opName);
    this.usersService.update(this.loggedUser)
      .then(() => this.stopLoader(opName))
      .catch(() => this.stopLoader(opName));
  }
}
