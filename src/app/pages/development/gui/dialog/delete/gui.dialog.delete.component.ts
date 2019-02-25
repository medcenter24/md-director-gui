/*
 * Copyright (c) 2019.
 *
 *  @author Zagovorychev Oleksandr <zagovorichev@gmail.com>
 */

import { Component } from '@angular/core';
import { LoadingComponent } from '../../../../../components/core/components/componentLoader';
import { Logger } from 'angular2-logger/core';
import { GlobalState } from '../../../../../global.state';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';

@Component({
  selector: 'ngd-gui-dialog-delete',
  templateUrl: './gui.dialog.delete.html',
})
export class GuiDialogDeleteComponent extends LoadingComponent {
  protected componentName: string = 'GuiPaymentBlockComponent';

  stateClass = 'fa fa-ban text-muted';

  constructor(
    protected _logger: Logger,
    protected _state: GlobalState,
    protected loadingBar: SlimLoadingBarService,
  ) {
    super();
  }

  onDelete(): void {
    this._state.notifyDataChanged('confirmDialog',
      {
        header: 'Testing Dialog for Deletion',
        message: 'Message to this case',
        accept: () => this.stateClass = 'fa fa-check-circle text-success',
        reject: () => this.stateClass = 'fa fa-times-circle text-danger',
        icon: 'fa fa-window-close-o red',
      },
    );
  }
}
