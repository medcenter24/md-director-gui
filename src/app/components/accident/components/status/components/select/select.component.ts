/*
 * Copyright (c) 2017
 *
 *  @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Logger } from 'angular2-logger/core';
import { AccidentStatus } from '../../status';
import { AccidentStatusesService } from '../../statuses.service';
import { LoadableComponent } from '../../../../../core/components/componentLoader/LoadableComponent';
@Component({
  selector: 'nga-select-accident-status',
  templateUrl: './select.html',
})
export class AccidentStatusSelectComponent extends LoadableComponent implements OnInit {

  @Input() statusId: number = 0;
  @Output() selected: EventEmitter<AccidentStatus> = new EventEmitter<AccidentStatus>();

  statuses: AccidentStatus[] = [];
  status: AccidentStatus;
  filteredStatuses: AccidentStatus[] = [];
  isLoaded: boolean = false;
  protected componentName: string = 'AccidentStatusSelectComponent';

  constructor (private statusesService: AccidentStatusesService,
               private _logger: Logger) {
    super();
  }

  ngOnInit () {
    this.startLoader();
    this.isLoaded = false;
    this.statusesService.getStatuses().then(statuses => {
      this.stopLoader();
      this.statuses = statuses;
      this.filteredStatuses = statuses;
      if (+this.statusId) {
        this.status = this.statuses.find(doc => +doc.id === +this.statusId);
      }
      this.isLoaded = true;
    }).catch((err) => {
      this.stopLoader();
      this._logger.error(err);
    });
  }

  filterStatuses(event): void {
    this.filteredStatuses = [];
    for (const status of this.statuses) {
      if (status.title.toLowerCase().indexOf(event.query.toLowerCase()) !== -1) {
        this.filteredStatuses.push(status);
      }
    }
  }

  handleDropdownClick() {
    this.filteredStatuses = [];

    // mimic remote call
    // todo I guess that here was issue with update of the variable needs to be changed to use state updater
    setTimeout(() => {
      this.filteredStatuses = this.statuses;
    }, 100);
  }

  onSelect (): void {
    this.statusId = this.status ? +this.status.id : 0;
    this.selected.emit(this.status);
  }

  onBlur(): void {
    if (typeof this.status !== 'object') {
      this.status = null;
    }
    this.onSelect();
  }
}
