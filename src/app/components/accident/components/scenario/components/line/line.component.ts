/*
 * Copyright (c) 2017.
 *
 * @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
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
  @Output() init: EventEmitter<string> = new EventEmitter<string>();
  @Output() loaded: EventEmitter<string> = new EventEmitter<string>();

  isLoaded: boolean = false;
  steps = [];

  constructor (private caseService: CasesService,
               private _logger: Logger) {}

  ngOnInit () {
    this.init.emit('AccidentScenarioComponent');
    this.caseService.getScenario(this.accidentId).then((scenario: AccidentScenario[]) => {
      this.steps = scenario;
      this.isLoaded = true;
      this.loaded.emit('AccidentScenarioComponent');
    }).catch((err) => {
      this._logger.error(err);
      this.loaded.emit('AccidentScenarioComponent');
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
