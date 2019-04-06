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
import { Logger } from 'angular2-logger/core';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { LoadingComponent } from '../../../../../components/core/components/componentLoader';
import { Upload } from '../../../../../components/upload/upload';
import { GlobalState } from '../../../../../global.state';
import { SimpleSearchProviderMock } from '../../../../../test/samples/providers';

@Component({
  selector: 'nga-development-gui-uploader-file',
  templateUrl: './development.gui.uploader.file.html',
})
export class DevelopmentGuiUploaderFileComponent extends LoadingComponent {
  protected componentName: string = 'DevelopmentGuiUploaderFileComponent';

  file: Upload;

  constructor(
    protected _logger: Logger,
    protected _state: GlobalState,
    protected loadingBar: SlimLoadingBarService,
    protected simpleSearch: SimpleSearchProviderMock,
  ) {
    super();
  }

  fileUploaded(event: Upload): void {
    this.file = event;
  }
}
