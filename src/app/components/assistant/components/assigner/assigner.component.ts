/*
 * Copyright (c) 2017
 *
 *  @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Assistant } from '../../assistant';

@Component({
  selector: 'assistant-assigner',
  templateUrl: './assigner.html'
})
export class AssistantAssignerComponent {

  @Input() caseId: number = 0;

  private assistant: Assistant;

  constructor () {
  }

  ngOnInit () {
    if (this.caseId) {

    }
  }

  loading(): void {

  }

  loaded(): void {

  }
}
