/*
 * Copyright (c) 2018.
 *
 * @author Zagovorychev Oleksandr <zagovorichev@gmail.com>
 */

import { Component } from '@angular/core';
import { LoadingComponent } from '../../../../components/core/components/componentLoader';
import { Logger } from 'angular2-logger/core';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { GlobalState } from '../../../../global.state';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'nga-finance-editor-page',
  template: `<ba-card baCardClass="with-scroll">
    <div class="row mb-3">
      <div class="col-12">
        <button pButton routerLink="/pages/settings/finance/"
                [label]="'Back' | translate" icon="fa fa-angle-left"></button>
      </div>
    </div>
    <nga-finance-editor
      (init)="startLoader($event)"
      (loaded)="stopLoader($event)"
    ></nga-finance-editor>
  </ba-card>`,
})
export class ConditionsEditorPageComponent extends LoadingComponent {
  protected componentName: string = 'ConditionsEditorPageComponent';

  constructor (
    protected loadingBar: SlimLoadingBarService,
    protected _logger: Logger,
    protected _state: GlobalState,
    protected translateService: TranslateService,
  ) {
    super();
  }
}
