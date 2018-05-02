/*
 * Copyright (c) 2017
 *
 *  @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { City } from '../../city';
import { CitiesService } from '../../cities.service';
import { TranslateService } from '@ngx-translate/core';
import { AbstractAutoCompleteController } from '../../../ui/abstract.auto.complete.controller';

@Component({
  selector: 'nga-select-city',
  templateUrl: './city.select.html',
})
export class CitySelectComponent extends AbstractAutoCompleteController {

  protected componentName = 'CitySelectComponent';
  preloaded: City[]|City = [];

  @Input()
    set selectPreloaded(preloaded: City|City[]) {
      // we need to use both - if hasn't loaded yet - use config otherwise use component updater
      this.preloaded = preloaded;
      this.selectItems(this.preloaded);
    }
  @Input() isMultiple: boolean = false;
  @Output() selected: EventEmitter<City|City[]> = new EventEmitter<City|City[]>();

  constructor (
    private citiesService: CitiesService,
    protected translateService: TranslateService,
    ) {
    super(translateService);
  }

  getService() {
    return this.citiesService;
  }

  getFieldKey(): string {
    return 'title';
  }

  getIsMultiple(): boolean {
    return this.isMultiple;
  }

  getPreloadedData(): City[]|City {
    return this.preloaded;
  }
}
