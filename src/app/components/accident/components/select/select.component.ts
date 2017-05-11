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

  public accident: Accident = null;

  private accidents: Array<Accident> = [];
  private filteredAccidents: Array<Accident> = [];

  constructor (
    private accidentService: AccidentsService,
    private loadingBar: SlimLoadingBarService,
    private _logger: Logger
  ) { }

  ngOnInit () {
    this.loadingBar.start();
    this.accidentService.getAccidents().then(accidents => {
      this.accidents = accidents;
      if (this.selectedAccidentId) {
        this.accident = this.accidents.find(accident => accident.id === this.selectedAccidentId);
      }

      this.loadingBar.complete();
    }).catch((err) => {
      this.loadingBar.complete();
      this._logger.error(err);
    });
  }

  filterAccidents (event): void {
    this.filteredAccidents = [];
    for(let i = 0; i < this.accidents.length; i++) {
      let assistant = this.accidents[i];
      if(assistant.title.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
        this.filteredAccidents.push(assistant);
      }
    }
  }

  handleDropdownClick() {
    this.filteredAccidents = [];

    //mimic remote call
    setTimeout(() => {
      this.filteredAccidents = this.accidents;
    }, 100)
  }

  onChanged (): void {
    let toSendAccident;
    if (!this.accident || !this.accident.id) {
      toSendAccident = new Accident();
    } else {
      toSendAccident = this.accident;
    }
    this.selected.emit(toSendAccident);
  }

  clear(): void {
    this.accident = null;
  }
}
