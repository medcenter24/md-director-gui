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
import { Logger } from 'angular2-logger/core';
import { GlobalState } from '../../../../../global.state';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { ConfirmationService } from 'primeng/api';

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
    protected confirmationService: ConfirmationService,
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

  onDelete2(): void {
    this.confirmationService.confirm({
      header: 'Delete',
      message: 'Are you sure that you want to remove the service?',
      accept: () => this.stateClass = 'fa fa-check-circle text-success',
      reject: () => this.stateClass = 'fa fa-times-circle text-danger',
    });
  }
}
