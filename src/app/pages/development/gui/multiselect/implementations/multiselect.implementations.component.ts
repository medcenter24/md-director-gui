/*
 * Copyright (c) 2018.
 *
 * @author Zagovorychev Oleksandr <zagovorichev@gmail.com>
 */

import { Component } from '@angular/core';
import { LoadingComponent } from '../../../../../components/core/components/componentLoader';
import { Logger } from 'angular2-logger/core';
import { GlobalState } from '../../../../../global.state';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { CityProviderMock } from '../../../../../test/samples/providers';

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
    protected _logger: Logger,
    protected _state: GlobalState,
    protected loadingBar: SlimLoadingBarService,
    public cityService: CityProviderMock,
  ) {
    super();
  }
}
