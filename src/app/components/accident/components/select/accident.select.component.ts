/*
 * Copyright (c) 2017
 *
 *  @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import { Component, Output, EventEmitter, Input, OnInit } from '@angular/core';
import { Logger } from 'angular2-logger/core';
import { Accident } from '../../accident';
import { AccidentsService } from '../../accidents.service';
import { LoadableComponent } from '../../../core/components/componentLoader/LoadableComponent';

@Component({
  selector: 'nga-select-accident',
  templateUrl: './accident.select.html',
})
export class AccidentSelectComponent extends LoadableComponent implements OnInit {

  @Input() selectedAccidentId: number = 0;
  @Output() selected: EventEmitter<Accident> = new EventEmitter<Accident>();

  isLoaded: boolean = false;
  accident: Accident = null;
  private accidents: Accident[] = [];
  private filteredAccidents: Accident[] = [];
  protected componentName: string = 'SelectAccidentComponent';

  constructor (
    private accidentService: AccidentsService,
    private _logger: Logger,
  ) {
    super();
  }

  ngOnInit () {
    this.initComponent();
    this.accidentService.getAccidents().then(accidents => {
      this.accidents = accidents;
      if (this.selectedAccidentId) {
        this.accident = this.accidents.find(accident => accident.id === this.selectedAccidentId);
      }
      this.isLoaded = true;
      this.loadedComponent();
    }).catch((err) => {
      this._logger.error(err);
      this.loadedComponent();
    });
  }

  filterAccidents (event): void {
    this.filteredAccidents = [];
    for (const accident of this.accidents) {
      if (accident.title.toLowerCase().indexOf(event.query.toLowerCase()) !== -1) {
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
