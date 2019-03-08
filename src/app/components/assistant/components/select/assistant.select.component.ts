/*
 * Copyright (c) 2017
 *
 *  @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import { Component } from '@angular/core';
import { AssistantsService } from '../../assistant.service';
import { AbstractAutoCompleteController } from '../../../ui/autocompleter';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'nga-select-assistant',
  templateUrl: '../../../ui/autocompleter/autocompleter.tpl.html',
})
export class AssistantSelectComponent extends AbstractAutoCompleteController {
  protected componentName: string = 'AssistantSelectComponent';

  constructor(
    private service: AssistantsService,
    protected translateService: TranslateService,
  ) {
    super(translateService);
  }

  getService() {
    return this.service;
  }

  getFieldKey(): string {
    return 'title';
  }
}
