/*
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU General Public License
 * as published by the Free Software Foundation; under version 2
 * of the License (non-upgradable).
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
 *
 * Copyright (c) 2019 (original work) MedCenter24.com;
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
    this.startLoader();
    this.accidentService.getAccidents().then(accidents => {
      this.stopLoader();
      this.accidents = accidents;
      if (this.selectedAccidentId) {
        this.accident = this.accidents.find(accident => accident.id === this.selectedAccidentId);
      }
      this.isLoaded = true;
    }).catch((err) => {
      this.stopLoader();
      this._logger.error(err);
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
