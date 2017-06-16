/*
 * Copyright (c) 2017
 *
 *  @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import { Component, Output, EventEmitter, Input } from '@angular/core';
import { AccidentType } from '../type';
import { AccidentTypesService } from '../types.service';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { Logger } from 'angular2-logger/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'select-accident-type',
  templateUrl: './select.html'
})
export class SelectAccidentTypeComponent {

  @Input() selectedTypeId: number = 0;

  @Output() selected: EventEmitter<AccidentType> = new EventEmitter<AccidentType>();

  isLoaded: boolean = false;
  private dataItems: Array<any> = [];
  private selectedType: AccidentType = new AccidentType();
  private loadedTypes: AccidentType[] = [];
  private transInsurance: string = '';
  private transNonInsurance: string = '';

  constructor (
    private accidentTypesService: AccidentTypesService,
    private loadingBar: SlimLoadingBarService,
    private translate: TranslateService,
    private _logger: Logger
  ) { }

  ngOnInit () {

    this.translate.get('Insurance').subscribe(res => {
      this.transInsurance = res;
    });

    this.translate.get('Non Insurance').subscribe(res => {
      this.transNonInsurance = res;
    });

    this.loadingBar.start();
    this.accidentTypesService.getTypes().then(types => {
      this.loadedTypes = types;
      if (!this.selectedTypeId) {
        this.selectedTypeId = 1;
        this.onChanged({value: this.selectedTypeId})
      }
      this.dataItems = types.map(x => {
        return {
          label: x.title === 'insurance' ? this.transInsurance : this.transNonInsurance,
          value: x.id
        };
      });
      this.loadingBar.complete();
      this.isLoaded = true;
    }).catch((err) => {
      this.loadingBar.complete();
      this._logger.error(err);
    });
  }

  onChanged(event): void {
    this.selectedType = this.loadedTypes.find(function (el) {
      return el.id === event.value;
    });

    this.selected.emit(this.selectedType);
  }
}
