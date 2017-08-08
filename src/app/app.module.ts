/*
 * Copyright (c) 2017.
 *
 * @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import { isDevMode, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './faker/in-memory-data.service';

/*
 * Platform and Environment providers/directives/pipes
 */
import { routing } from './app.routing';

// App is our top level component
import { App } from './app.component';
import { AppState, InternalStateType } from './app.service';
import { GlobalState } from './global.state';
import { NgaModule } from './theme/nga.module';
import { PagesModule } from './pages/pages.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';
import { Logger } from 'angular2-logger/core';
import { BlockUIModule, ConfirmationService, ConfirmDialogModule, GrowlModule } from 'primeng/primeng';
import { environment } from '../environments/environment';

// Application wide providers
const APP_PROVIDERS = [
  AppState,
  GlobalState,
  Logger,
  ConfirmationService,
];

export type StoreType = {
  state: InternalStateType,
  restoreInputValues: () => void,
  disposeOldHosts: () => void,
};

/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
@NgModule({
  bootstrap: [App],
  declarations: [
    App,
  ],
  imports: [ // import Angular's modules
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    InMemoryWebApiModule.forRoot(InMemoryDataService, {apiBase: 'director/', passThruUnknownUrl: true}),
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NgaModule.forRoot(),
    NgbModule.forRoot(),
    PagesModule,
    routing,
    SlimLoadingBarModule.forRoot(),
    GrowlModule,
    ConfirmDialogModule,
    BlockUIModule,
  ],
  exports: [InMemoryWebApiModule],
  providers: [ // expose our Services and Providers into Angular's dependency injection
    APP_PROVIDERS,
  ],
})

export class AppModule {

  constructor(public appState: AppState, private _logger: Logger) {
    if (isDevMode()) {
      console.info('To see debug logs enter: \'logger.level = logger.Level.DEBUG;\' in your browser console');
    }
    this._logger.level = environment.logger.level;
  }
}
