/*
 * Copyright (c) 2018
 *
 *  @author Oleksander  Zagovorychev <zagovorichev@gmail.com>
 */

import { Component } from '@angular/core';
import { Logger } from 'angular2-logger/core';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { LoadingComponent } from '../../../../../../components/core/components/componentLoader';
import { HospitalAccident } from '../../../../../../components/hospitalAccident/hospitalAccident';
import { GlobalState } from '../../../../../../global.state';

@Component({
  selector: 'nga-development-gui-hospital-accident-guarantee',
  templateUrl: './development.gui.hospital.accident.guarantee.html',
})
export class DevelopmentGuiHospitalAccidentGuaranteeComponent extends LoadingComponent {
  protected componentName: string = 'DevelopmentGuiHospitalAccidentGuaranteeComponent';

  hospitalAccident: HospitalAccident = new HospitalAccident();

  constructor(
    protected _logger: Logger,
    protected _state: GlobalState,
    protected loadingBar: SlimLoadingBarService,
  ) {
    super();
  }
}
