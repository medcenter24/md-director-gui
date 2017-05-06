/*
 * Copyright (c) 2017
 *
 *  @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import { Component, Output, EventEmitter, Input } from '@angular/core';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { Logger } from 'angular2-logger/core';
import { Accident } from '../../accident';
import { AccidentsService } from '../../accidents.service';

@Component({
  selector: 'select-accident',
  templateUrl: './select.html'
})
export class SelectAccidentComponent {

  @Input() selectedAccidentId: number = 0;
  @Output() selected: EventEmitter<Accident> = new EventEmitter<Accident>();

  private dataItems: Array<any> = [];
  private selectedAccident: Accident = new Accident();
  private loadedAccidents: Accident[] = [];

  constructor (
    private accidentService: AccidentsService,
    private loadingBar: SlimLoadingBarService,
    private _logger: Logger
  ) { }

  ngOnInit () {
    this.loadingBar.start();
    this.accidentService.getAccidents().then(accidents => {
      console.log(accidents);
      this.loadedAccidents = accidents;
      this.dataItems = accidents.map(x => {
        return {
          label: x.ref_num,
          value: x.id
        };
      });
      this.loadingBar.complete();
    }).catch((err) => {
      this.loadingBar.complete();
      this._logger.error(err);
    });
  }

  onChanged(event): void {
    this.selectedAccident = this.loadedAccidents.find(function (el) {
      return el.id === event.value;
    });

    this.selected.emit(this.selectedAccident);
  }
}
