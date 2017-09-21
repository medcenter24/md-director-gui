/*
 * Copyright (c) 2017.
 *
 * @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import { NgModule } from '@angular/core';
import { Http, HttpModule } from '@angular/http';

import {
  TranslateModule, TranslateLoader,
  TranslateService, MissingTranslationHandler,
  MissingTranslationHandlerParams,
} from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { Logger } from 'angular2-logger/core';
import { GlobalState } from './global.state';

export function createTranslateLoader (http: Http) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule()
export class MyDocMissingTranslationHandler implements MissingTranslationHandler {
  constructor (private _logger: Logger) {
  }

  handle (params: MissingTranslationHandlerParams) {
    const error = 'Hasn\'t had translation: "' + params.key + '"';
    this._logger.warn(error);
    return error;
  }
}

const translationOptions = {
  loader: {
    provide: TranslateLoader,
    useFactory: (createTranslateLoader),
    deps: [Http],
  },
};

@NgModule({
  imports: [TranslateModule.forRoot(translationOptions), HttpModule],
  exports: [TranslateModule],
  providers: [
    TranslateService,
    { provide: MissingTranslationHandler, useClass: MyDocMissingTranslationHandler },
  ],
})
export class AppTranslationModule {

  constructor (
    private translate: TranslateService,
    private _state: GlobalState,
  ) {

    translate.addLangs(['en', 'ru']);
    translate.setDefaultLang('en');
    let lang = localStorage.getItem('lang');
    if (!lang || !lang.length) {
      lang = 'en';
    }
    translate.use(lang);

    this._state.subscribe('lang', (_lang: string) => {
      localStorage.setItem('lang', _lang);
      this.translate.use(_lang);
    });
  }
}
