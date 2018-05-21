/*
 * Copyright (c) 2017
 *
 *  @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import { Component } from '@angular/core';
import { CitiesService } from '../../cities.service';
import { TranslateService } from '@ngx-translate/core';
import { AbstractAutoCompleteController } from '../../../ui/autocompleter';

@Component({
  selector: 'nga-select-city',
  templateUrl: '../../../ui/autocompleter/autocompleter.tpl.html',
})
export class CitySelectComponent extends AbstractAutoCompleteController {

  protected componentName = 'CitySelectComponent';

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
}
