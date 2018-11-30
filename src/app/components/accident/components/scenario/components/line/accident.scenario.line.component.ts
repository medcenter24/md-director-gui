/*
 * Copyright (c) 2017.
 *
 * @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { Logger } from 'angular2-logger/core';
import { LoadableComponent } from '../../../../../core/components/componentLoader';
import { AccidentScenario } from '../../scenario';
import 'rxjs/add/operator/map';
import 'style-loader!./line.scss';
import { CasesService } from '../../../../../case/cases.service';

@Component({
  selector: 'nga-accident-scenario',
  templateUrl: './line.html',
  encapsulation: ViewEncapsulation.None,
})
export class AccidentScenarioLineComponent extends LoadableComponent implements OnInit {

  @Input() accidentId: number = 0;

  isLoaded: boolean = false;
  steps: AccidentScenario[] = [];

  protected componentName: string = 'AccidentScenarioComponent';

  constructor (private caseService: CasesService,
               private _logger: Logger) {
    super();
  }

  ngOnInit () {
    this.reload();
  }

  /**
   * Quick reload for the save method or update
   */
  reload(): void {
    this.startLoader();
    this.caseService.getScenario(this.accidentId).then((scenario: AccidentScenario[]) => {
      this.stopLoader();
      this.steps = scenario;
      this.isLoaded = true;
    }).catch((err) => {
      this.stopLoader();
      this._logger.error(err);
    });
  }
}
