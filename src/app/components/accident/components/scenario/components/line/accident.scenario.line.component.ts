/*
 * Copyright (c) 2017.
 *
 * @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { Logger } from 'angular2-logger/core';
import { AccidentScenario } from '../../scenario';
import 'rxjs/add/operator/map';
import 'style-loader!./line.scss';
import { CasesService } from '../../../../../case/cases.service';
import { LoadableComponent } from '../../../../../core/components/componentLoader/LoadableComponent';

@Component({
  selector: 'nga-accident-scenario',
  templateUrl: './line.html',
  encapsulation: ViewEncapsulation.None,
})
export class AccidentScenarioLineComponent extends LoadableComponent implements OnInit {

  @Input() accidentId: number = 0;

  isLoaded: boolean = false;
  steps = [];

  protected componentName: string = 'AccidentScenarioComponent';

  constructor (private caseService: CasesService,
               private _logger: Logger) {
    super();
  }

  ngOnInit () {
    this.initComponent();
    this.caseService.getScenario(this.accidentId).then((scenario: AccidentScenario[]) => {
      this.steps = scenario;
      this.isLoaded = true;
      this.loadedComponent();
    }).catch((err) => {
      this._logger.error(err);
      this.loadedComponent();
    });
  }

  /**
   * Quick reload for the save method or update
   */
  reload(): void {
    this.caseService.getScenario(this.accidentId).then((scenario: AccidentScenario[]) => {
      this.steps = scenario;
    }).catch((err) => {
      this._logger.error(err);
    });
  }
}
