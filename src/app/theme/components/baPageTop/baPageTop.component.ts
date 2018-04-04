import { ChangeDetectorRef, Component } from '@angular/core';

import { GlobalState } from '../../../global.state';
import { AuthenticationService } from '../../../components/auth/authentication.service';
import { LocalStorageHelper } from '../../../helpers/local.storage.helper';
import { layoutPaths } from '../../index';

@Component({
  selector: 'nga-ba-page-top',
  templateUrl: './baPageTop.html',
  styleUrls: ['./baPageTop.scss'],
})
export class BaPageTopComponent {

  isScrolled: boolean = false;
  isMenuCollapsed: boolean = false;
  avatar: string = '';

  constructor(
    private _state: GlobalState,
    private authenticationService: AuthenticationService,
    private storage: LocalStorageHelper,
    private cdRef: ChangeDetectorRef,
  ) {
    this._state.subscribe('menu.isCollapsed', (isCollapsed) => {
      this.isMenuCollapsed = isCollapsed;
    });
    this._state.subscribe('avatarB64', (b64: string) => {
        this.avatar = b64.length ? `data:image/jpeg;base64,${b64}` : `${layoutPaths.images.profile}no-photo.png`;
    });
    this.avatar = this.storage.getItem('avatar');

    this.avatar = typeof this.avatar !== 'undefined' && this.avatar !== 'undefined' && this.avatar.length ?
        `data:image/jpeg;base64,${this.avatar}` : `${layoutPaths.images.profile}no-photo.png`;
  }

  toggleMenu() {
    this.isMenuCollapsed = !this.isMenuCollapsed;
    this._state.notifyDataChanged('menu.isCollapsed', this.isMenuCollapsed);
    return false;
  }

  scrolledChanged(isScrolled) {
    this.isScrolled = isScrolled;
    this.cdRef.detectChanges();
  }

  logout(): void {
    this.authenticationService.logout();
  }
}
