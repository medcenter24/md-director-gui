/*
 * Copyright (c) 2017
 *
 *  @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { Logger } from 'angular2-logger/core';
import { AccidentStatus } from '../../status';
import { AccidentStatusesService } from '../../statuses.service';
@Component({
  selector: 'nga-select-accident-status',
  templateUrl: './select.html',
})
export class AccidentStatusSelectComponent implements OnInit {

  @Input() statusId: number = 0;
  @Output() selected: EventEmitter<AccidentStatus> = new EventEmitter<AccidentStatus>();

  statuses: Array<AccidentStatus> = [];
  status: AccidentStatus;
  filteredStatuses: Array<AccidentStatus> = [];
  isLoaded: boolean = false;

  constructor (private statusesService: AccidentStatusesService,
               private loadingBar: SlimLoadingBarService,
               private _logger: Logger) {}

  ngOnInit () {
    this.loadingBar.start();
    this.isLoaded = false;
    this.statusesService.getStatuses().then(statuses => {
      this.statuses = statuses;
      if (+this.statusId) {
        this.status = this.statuses.find(doc => +doc.id === +this.statusId);
      }
      this.loadingBar.complete();
      this.isLoaded = true;
    }).catch((err) => {
      this.loadingBar.complete();
      this._logger.error(err);
    });
  }

  filterStatuses(event): void {
    this.filteredStatuses = [];
    for(let i = 0; i < this.statuses.length; i++) {
      const status = this.statuses[i];
      if (status.title.toLowerCase().indexOf(event.query.toLowerCase()) === 0) {
        this.filteredStatuses.push(status);
      }
    }
  }

  handleDropdownClick() {
    this.filteredStatuses = [];

    // mimic remote call
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
