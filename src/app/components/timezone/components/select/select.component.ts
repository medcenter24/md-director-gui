/*
 * Copyright (c) 2018.
 *
 * @author Zagovorychev Olexandr <zagovorichev@gmail.com>
 */

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { LoadableComponent } from '../../../core/components/componentLoader/LoadableComponent';
import { TimezoneService } from '../../timezone.service';

@Component({
  selector: 'nga-select-timezone',
  templateUrl: './select.html',
})
export class TimezoneSelectComponent extends LoadableComponent implements OnInit {

  @Input() timezone: string;
  @Output() change: EventEmitter<string> = new EventEmitter<string>();

  timezones: string[] = [];
  filteredTimezones: string[] = [];
  protected componentName: string = 'TimezoneSelectComponent';

  constructor (
    private timezoneService: TimezoneService,
  ) {
    super();
  }

  ngOnInit () {
    this.timezones = this.timezoneService.getTimezones();
  }

  filterTimezones (event): void {
    this.filteredTimezones = [];
    for (const tz of this.timezones) {
      if (tz.toLowerCase().indexOf(event.query.toLowerCase()) !== -1) {
        this.filteredTimezones.push(tz);
      }
    }
  }

  onChanged(event): void {
    this.change.emit(event);
  }
}
