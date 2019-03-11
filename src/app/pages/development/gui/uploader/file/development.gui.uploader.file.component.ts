/*
 * Copyright (c) 2018
 *
 *  @author Oleksander  Zagovorychev <zagovorichev@gmail.com>
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
