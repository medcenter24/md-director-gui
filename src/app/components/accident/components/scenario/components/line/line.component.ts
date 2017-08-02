/*
 * Copyright (c) 2017.
 *
 * @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { Logger } from 'angular2-logger/core';
import { AccidentScenario } from '../../scenario';
import 'rxjs/add/operator/map';
import 'style-loader!./line.scss';
import { CasesService } from '../../../../../case/cases.service';

@Component({
  selector: 'nga-accident-scenario',
  templateUrl: './line.html',
  encapsulation: ViewEncapsulation.None,
})
export class AccidentScenarioComponent implements OnInit {

  @Input() accidentId: number = 0;

  isLoaded: boolean = false;
  steps = [];

  constructor (private caseService: CasesService,
               private loadingBar: SlimLoadingBarService,
               private _logger: Logger) {}

  ngOnInit () {
    this.loadingBar.start();
    this.caseService.getScenario(this.accidentId).then((scenario: AccidentScenario[]) => {
      this.steps = scenario;
      this.loadingBar.complete();
      this.isLoaded = true;
    }).catch((err) => {
      this.loadingBar.complete();
      this._logger.error(err);
    });
  }
}
