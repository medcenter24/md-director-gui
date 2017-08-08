import {AfterViewInit, Component, ViewContainerRef} from '@angular/core';
import * as $ from 'jquery';

import { GlobalState } from './global.state';
import { BaImageLoaderService, BaThemePreloader, BaThemeSpinner } from './theme/services';
import { BaThemeConfig } from './theme/theme.config';
import { layoutPaths } from './theme/theme.constants';
import {Confirmation, ConfirmationService, Message} from 'primeng/primeng';

/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app',
  styleUrls: ['./app.component.scss'],
  template: `
    <p-blockUI [blocked]="blocked">
        <i class="fa fa-lock fa-5x" style="position:absolute;top:50%;left:50%"></i>
    </p-blockUI>
    <main [class.menu-collapsed]="isMenuCollapsed" baThemeRun>
      <ng2-slim-loading-bar [height]="'3px'" [color]="'#e85656'"></ng2-slim-loading-bar>
      <p-growl [value]="msgs"></p-growl>
      <div class="additional-bg"></div>
      <router-outlet></router-outlet>
      <p-confirmDialog></p-confirmDialog>
    </main>
  `,
})
export class App implements AfterViewInit {

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
  ) {

      themeConfig.config();

      this._loadImages();

      this._state.subscribe('menu.isCollapsed', (isCollapsed) => {
        this.isMenuCollapsed = isCollapsed;
      });

      this._state.subscribe('growl', (msgs: Message[]) => this.msgs = msgs);
      this._state.subscribe('confirmDialog', (config) => this.confirmationService.confirm(config));
      this._state.subscribe('blocker', (block: boolean) => this.blocked = block);
  }

  public ngAfterViewInit(): void {
    // hide spinner once all loaders are completed
    BaThemePreloader.load().then((values) => {
      this._spinner.hide();
    });
  }

  private _loadImages(): void {
    // register some loaders
    BaThemePreloader.registerLoader(this._imageLoader.load('/assets/img/sky-bg.jpg'));
  }

}
