/*
 * Copyright (c) 2018.
 *
 * @author Zagovorychev Oleksandr <zagovorichev@gmail.com>
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
