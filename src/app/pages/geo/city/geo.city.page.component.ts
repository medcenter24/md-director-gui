/*
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU General Public License
 * as published by the Free Software Foundation; under version 2
 * of the License (non-upgradable).
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


import { Component } from '@angular/core';
import { LoadingComponent } from '../../../components/core/components/componentLoader';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { GlobalState } from '../../../global.state';
import { TranslateService } from '@ngx-translate/core';
import { LoggerComponent } from '../../../components/core/logger/LoggerComponent';

@Component({
  selector: 'nga-finance-editor-page',
  template: `
    <nga-city-datatable
      (init)="startLoader($event)"
      (loaded)="stopLoader($event)"
    ></nga-city-datatable>
  `,
})
export class GeoCityPageComponent extends LoadingComponent {
  protected componentName: string = 'GeoCityPageComponent';

  constructor (
    protected loadingBar: SlimLoadingBarService,
    protected _logger: LoggerComponent,
    protected _state: GlobalState,
    protected translateService: TranslateService,
  ) {
    super();
  }
}
