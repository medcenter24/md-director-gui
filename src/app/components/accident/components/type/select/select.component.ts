/*
 * Copyright (c) 2017
 *
 *  @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import { Component, Output, EventEmitter, Input, OnInit } from '@angular/core';
import { AccidentType } from '../type';
import { AccidentTypesService } from '../types.service';
import { Logger } from 'angular2-logger/core';
import { TranslateService } from '@ngx-translate/core';
import { LoadableComponent } from '../../../../core/components/componentLoader/LoadableComponent';

@Component({
  selector: 'nga-select-accident-type',
  templateUrl: './select.html',
})
export class SelectAccidentTypeComponent extends LoadableComponent implements OnInit {

  @Input() selectedTypeId: number = 0;
  @Output() selected: EventEmitter<AccidentType> = new EventEmitter<AccidentType>();

  isLoaded: boolean = false;
  private dataItems = [];
  private selectedType: AccidentType = new AccidentType();
  private loadedTypes: AccidentType[] = [];
  private transInsurance: string = '';
  private transNonInsurance: string = '';
  protected componentName: string = 'SelectAccidentTypeComponent';

  constructor (
    private accidentTypesService: AccidentTypesService,
    private translate: TranslateService,
    private _logger: Logger,
  ) {
    super();
  }

  ngOnInit () {

    this.translate.get('Insurance').subscribe(res => {
      this.transInsurance = res;
    });

    this.translate.get('Non Insurance').subscribe(res => {
      this.transNonInsurance = res;
    });

    this.initComponent();
    this.accidentTypesService.getTypes().then(types => {
      this.loadedTypes = types;
      if (!this.selectedTypeId) {
        this.selectedTypeId = 1;
        this.onChanged({ value: this.selectedTypeId });
      }
      this.dataItems = types.map(x => {
        return {
          label: x.title === 'insurance' ? this.transInsurance : this.transNonInsurance,
          value: x.id,
        };
      });
      this.isLoaded = true;
      this.loadedComponent();
    }).catch((err) => {
      this._logger.error(err);
      this.loadedComponent();
    });
  }

  onChanged(event): void {
    this.selectedType = this.loadedTypes.find(function (el) {
      return el.id === event.value;
    });

    this.selected.emit(this.selectedType);
  }
}
