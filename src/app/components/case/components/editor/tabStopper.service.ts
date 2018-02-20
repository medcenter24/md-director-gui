/*
 * Copyright (c) 2018.
 *
 * @author Zagovorychev Olexandr <zagovorichev@gmail.com>
 */

import { Injectable } from '@angular/core';

@Injectable()
export class CaseEditorTabStopperService {

  currentSelector: string = '';

  mapSteps: any[] = [
    // step 1 - choose assistance
    {
      selector: '.case-assistant-selector input',
    },
  ];

  init() {
    if (!this.currentSelector.length) {
      this.goto(0);
    }
  }

  goto(id: number): void {
    const step = this.mapSteps[id];
    const $el = $(step.selector);
    $el.focus();
    $el.click();
  }
}
