/*
 * Copyright (c) 2017
 *
 *  @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import { Component, Output, EventEmitter, Input } from '@angular/core';
import { AccidentType } from '../type';
import { AccidentTypesService } from '../types.service';

@Component({
  selector: 'select-accident-type',
  templateUrl: './select.html'
})
export class SelectAccidentTypeComponent {

  @Input() selectedTypeId: number = 0;

  @Output() loading: EventEmitter<string> = new EventEmitter<string>();
  @Output() loaded: EventEmitter<string> = new EventEmitter<string>();
  @Output() selected: EventEmitter<AccidentType> = new EventEmitter<AccidentType>();

  private dataItems: Array<any> = [];
  private selectedType: AccidentType = new AccidentType();
  private loadedTypes: AccidentType[] = [];

  constructor (private accidentTypesService: AccidentTypesService) { }

  ngOnInit () {
    this.loading.emit('select-accident-type');
    this.accidentTypesService.getTypes().then(types => {
      this.loadedTypes = types;
      if (!this.selectedTypeId) {
        this.selectedTypeId = 1;
      }
      this.dataItems = types.map(x => {
        return {
          label: x.title,
          value: x.id
        };
      });
      this.loaded.emit('select-accident-type');
    }).catch((err) => {
      this.loaded.emit('select-accident-type');
      console.error('log_error: ', err);
    });
  }

  onSelected(event): void {
    this.selectedType = this.loadedTypes.find(function (el) {
      return el.id === event.id;
    });

    this.selected.emit(this.selectedType);
  }
}
