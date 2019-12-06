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

import { Component } from '@angular/core';
import { LoadingComponent } from '../../../../../components/core/components/componentLoader';
import { GlobalState } from '../../../../../global.state';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { CityProviderMock } from '../../../../../test/samples/providers';
import { LoggerComponent } from '../../../../../components/core/logger/LoggerComponent';

@Component({
  selector: 'nga-multiselect-implementations',
  templateUrl: './multiselect.implementations.html',
})
export class MultiselectImplementationsComponent extends LoadingComponent {
  protected componentName: string = 'MultiselectImplementationsComponent';

  cities;
  cities0;
  cities1;
  cities2;
  cities3;

  constructor(
    protected _logger: LoggerComponent,
    protected _state: GlobalState,
    protected loadingBar: SlimLoadingBarService,
    public cityService: CityProviderMock,
  ) {
    super();
  }
}
