/*
 * Copyright (c) 2017.
 *
 * @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import {AfterViewChecked, AfterViewInit, Component, OnInit} from '@angular/core';

import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { Logger } from 'angular2-logger/core';
import { GlobalState } from '../../global.state';
import { ActivatedRoute, Params } from '@angular/router';
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'nga-profile',
  templateUrl: './profile.html',
})
export class ProfileComponent implements OnInit {

  languages: Array<any> = [];
  loaded: boolean = false;
  lang: string = 'en';

  constructor (private _logger: Logger,
               private loadingBar: SlimLoadingBarService,
               private _state: GlobalState,
               private translateService: TranslateService,
  ) { }

  ngOnInit (): void {
    const langs = this.translateService.getLangs();
    this._state.notifyDataChanged('menu.activeLink', { title: 'Profile' });
    this.languages = langs.map((v) => { return { label: v, value: v }; });
    this.lang = localStorage.getItem('lang');
  }

  public onLangChanged (event): void {
    localStorage.setItem('lang', event.value);
    this.translateService.use(event.value);
  }
}
