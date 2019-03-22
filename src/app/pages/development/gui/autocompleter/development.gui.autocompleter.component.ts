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
import { SimpleSearchProviderMock } from '../../../../test/samples/providers';
import { LoadingComponent } from '../../../../components/core/components/componentLoader';
import { Logger } from 'angular2-logger/core';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { GlobalState } from '../../../../global.state';

@Component({
  selector: 'nga-development-gui-autocompleter',
  templateUrl: './development.gui.autocompleter.html',
})
export class DevelopmentGuiAutocompleterComponent extends LoadingComponent {
  protected componentName: string = 'DevelopmentGuiAutocompleterComponent';
  item;
  constructor(
    protected _logger: Logger,
    protected _state: GlobalState,
    protected loadingBar: SlimLoadingBarService,
    public simpleSearch: SimpleSearchProviderMock,
  ) {
    super();
  }
}
