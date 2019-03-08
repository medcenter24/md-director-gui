/*
 * Copyright (c) 2018
 *
 *  @author Oleksander  Zagovorychev <zagovorichev@gmail.com>
 */

import { Component } from '@angular/core';
import { Logger } from 'angular2-logger/core';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { LoadingComponent } from '../../../../../components/core/components/componentLoader';
import { FinanceCurrency } from '../../../../../components/finance/components/currency/finance.currency';
import { GlobalState } from '../../../../../global.state';

@Component({
  selector: 'nga-gui-payment-block',
  templateUrl: './gui.payment.block.html',
})
export class GuiPaymentBlockComponent extends LoadingComponent {
  protected componentName: string = 'GuiPaymentBlockComponent';

  constructor(
    protected _logger: Logger,
    protected _state: GlobalState,
    protected loadingBar: SlimLoadingBarService,
  ) {
    super();
  }

  infoCurrency: FinanceCurrency = new FinanceCurrency(1, 'Dollar', 'us', 'fa fa-dollar');
  defaultCurrency: FinanceCurrency = new FinanceCurrency(1, 'Euro', 'eu', 'fa fa-euro');
}
