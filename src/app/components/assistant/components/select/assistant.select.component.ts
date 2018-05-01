/*
 * Copyright (c) 2017
 *
 *  @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AssistantsService } from '../../assistant.service';
import { Assistant } from '../../assistant';
import { Logger } from 'angular2-logger/core';
import { LoadableComponent } from '../../../core/components/componentLoader';

@Component({
  selector: 'nga-select-assistant',
  templateUrl: './assistant.select.html',
})
export class AssistantSelectComponent extends LoadableComponent implements OnInit {

  @Input() assistantId: number;
  @Input() required: boolean = false;
  @Output() change: EventEmitter<Assistant> = new EventEmitter<Assistant>();

  isLoaded: boolean = false;
  assistant: Assistant;
  assistants: Assistant[] = [];
  filteredAssistants: Assistant[] = [];
  protected componentName: string = 'AssistantSelectComponent';

  constructor (
    private assistantsService: AssistantsService,
    private _logger: Logger,
  ) {
    super();
  }

  ngOnInit () {
    this.startLoader();
    this.assistantsService.getAssistants().then(assistants => {
      this.stopLoader();
      this.assistants = assistants;
      this.assistant = this.assistants.find(_assistant => +_assistant.id === +this.assistantId);
      this.isLoaded = true;
    }).catch((err) => {
      this.stopLoader();
      this._logger.error(err);
    });
  }

  filterAssistants (event): void {
    this.filteredAssistants = [];
    for (const assistant of this.assistants) {
      if (assistant.title.toLowerCase().indexOf(event.query.toLowerCase()) !== -1) {
        this.filteredAssistants.push(assistant);
      }
    }
  }

  onChanged(event): void {
    this.change.emit(event);
  }
}
