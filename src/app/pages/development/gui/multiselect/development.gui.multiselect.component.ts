/*
 * Copyright (c) 2018.
 *
 * @author Zagovorychev Oleksandr <zagovorichev@gmail.com>
 */

import { Component, OnInit } from '@angular/core';
import { SelectorConfig } from '../../../../components/ui/selector/selector.config';
import { SimpleSearchProviderMock } from '../../../../test/samples/providers';
import { LoadingComponent } from '../../../../components/core/components/componentLoader';
import { Logger } from 'angular2-logger/core';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { GlobalState } from '../../../../global.state';

@Component({
  selector: 'nga-development-gui-multiselect',
  templateUrl: './development.gui.multiselect.html',
})
export class DevelopmentGuiMultiselectComponent extends LoadingComponent implements OnInit {

  protected componentName: string = 'DevelopmentGuiMultiselectComponent';

  config: SelectorConfig;
  items: any[] = [];

  constructor(
    protected _logger: Logger,
    protected _state: GlobalState,
    protected loadingBar: SlimLoadingBarService,
  ) {
    super();
  }

  ngOnInit(): void {
    this.config = SelectorConfig.instance({
      placeholder: 'Test MultiSelector',
      dataProvider: new SimpleSearchProviderMock(),
      labelField: 'value',
    });
  }

  onSelected(items): void {
    this.items = items;
  }

}
