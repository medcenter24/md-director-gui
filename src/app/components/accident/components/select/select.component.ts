/*
 * Copyright (c) 2017
 *
 *  @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import { Component, Output, EventEmitter, Input, OnInit } from '@angular/core';
import { Logger } from 'angular2-logger/core';
import { Accident } from '../../accident';
import { AccidentsService } from '../../accidents.service';

@Component({
  selector: 'nga-select-accident',
  templateUrl: './select.html',
})
export class SelectAccidentComponent implements OnInit {

  @Input() selectedAccidentId: number = 0;
  @Output() selected: EventEmitter<Accident> = new EventEmitter<Accident>();
  @Output() init: EventEmitter<string> = new EventEmitter<string>();
  @Output() loaded: EventEmitter<string> = new EventEmitter<string>();

  isLoaded: boolean = false;
  accident: Accident = null;
  private accidents: Accident[] = [];
  private filteredAccidents: Accident[] = [];

  constructor (
    private accidentService: AccidentsService,
    private _logger: Logger,
  ) { }

  ngOnInit () {
    this.init.emit('SelectAccidentComponent');
    this.accidentService.getAccidents().then(accidents => {
      this.accidents = accidents;
      if (this.selectedAccidentId) {
        this.accident = this.accidents.find(accident => accident.id === this.selectedAccidentId);
      }
      this.isLoaded = true;
      this.loaded.emit('SelectAccidentComponent');
    }).catch((err) => {
      this._logger.error(err);
      this.loaded.emit('SelectAccidentComponent');
    });
  }

  filterAccidents (event): void {
    this.filteredAccidents = [];
    for (const accident of this.accidents) {
      if (accident.title.toLowerCase().indexOf(event.query.toLowerCase()) === 0) {
        this.filteredAccidents.push(accident);
      }
    }
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
