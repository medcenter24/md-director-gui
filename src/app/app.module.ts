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

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AppState, InternalStateType } from './app.service';
import { GlobalState } from './global.state';
import { NgaModule } from './theme/nga.module';
import { PagesModule } from './pages/pages.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';
import { Logger, Options } from 'angular2-logger/core';
import { BlockUIModule, ConfirmationService, ConfirmDialogModule, GrowlModule } from 'primeng/primeng';
import { environment } from '../environments/environment';
import { routing } from './app.routing';
import { ApiErrorService } from './components/ui/apiError.service';
import { AppTranslationModule } from './app.translation.module';
import { LocalStorageHelper } from './helpers/local.storage.helper';
import { HttpClientModule } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';
import { AuthGuard } from './components/auth/auth.guard';

// Application wide providers
const APP_PROVIDERS = [
  AppState,
  GlobalState,
  Logger,
  Options,
  ConfirmationService,
  ApiErrorService,
  LocalStorageHelper,
  AuthGuard,
];

export function tokenGetter() {
  const storage = new LocalStorageHelper();
  return storage.getItem('token');
}

export type StoreType = {
  state: InternalStateType,
  restoreInputValues: () => void,
  disposeOldHosts: () => void,
};

/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
@NgModule({
  bootstrap: [AppComponent],
  declarations: [
    AppComponent,
  ],
  imports: [ // import Angular's modules
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NgaModule.forRoot(),
    PagesModule,
    routing,
    SlimLoadingBarModule.forRoot(),
    GrowlModule,
    ConfirmDialogModule,
    BlockUIModule,
    AppTranslationModule,
    JwtModule.forRoot({
      config: {
        tokenGetter,
        // whitelistedDomains: ['localhost:3001']
        // blacklistedRoutes: ['localhost:3001/auth/']
      },
    }),
  ],
  exports: [],
  providers: [ // expose our Services and Providers into Angular's dependency injection
    APP_PROVIDERS,
  ],
})

export class AppModule {

  constructor(public appState: AppState, private _logger: Logger) {
    this._logger.level = environment.logger.level;
  }
}
