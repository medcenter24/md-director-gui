/*
 *  Copyright (c) 2017.
 *
 *  @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import { AfterViewInit, Component, ViewContainerRef } from '@angular/core';
import * as $ from 'jquery';
import { GlobalState } from './global.state';
import { BaImageLoaderService, BaThemePreloader, BaThemeSpinner } from './theme/services';
import { BaThemeConfig } from './theme/theme.config';
import { layoutPaths } from './theme/theme.constants';
import { Confirmation, ConfirmationService, Message } from 'primeng/primeng';
import { ApiErrorService } from './components/ui/apiError.service';
import { LocalStorageHelper } from './helpers/local.storage.helper';

/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'nga-app',
  styleUrls: ['./app.component.scss'],
  templateUrl: './app.html',
})
export class AppComponent implements AfterViewInit {

  // growl messages
  msgs: Message[] = [];
  isMenuCollapsed: boolean = false;
  // global window block
  blocked: boolean = false;

  constructor(private _state: GlobalState,
              private _imageLoader: BaImageLoaderService,
              private _spinner: BaThemeSpinner,
              private viewContainerRef: ViewContainerRef,
              private themeConfig: BaThemeConfig,
              private confirmationService: ConfirmationService,
              private apiErrorService: ApiErrorService,
              private storage: LocalStorageHelper,
  ) {

      themeConfig.config();

      this._loadImages();

      this._state.subscribe('menu.isCollapsed', (isCollapsed) => {
        this.isMenuCollapsed = isCollapsed;
      });

      this._state.subscribe('growl', (msgs: Message[]) => this.msgs = msgs);
      this._state.subscribe('confirmDialog', (config) => this.confirmationService.confirm(config));
      this._state.subscribe('blocker', (block: boolean) => this.blocked = block);
      this._state.subscribe('apiError', (error) => {
          this.apiErrorService.show(error);
      });
      this._state.subscribe('avatarB64', (b64: string) => {
          this.storage.setItem('avatar', b64);
      });
  }

  ngAfterViewInit(): void {
    // hide spinner once all loaders are completed
    BaThemePreloader.load().then((values) => {
      this._spinner.hide();
    });
  }

  private _loadImages(): void {
    // register some loaders
    // BaThemePreloader.registerLoader(this._imageLoader.load('/assets/img/sky-bg.jpg'));
  }

}
