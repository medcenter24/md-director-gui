/*
 * Copyright (c) 2017
 *
 *  @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AssistantsService } from '../../assistant.service';
import { Assistant } from '../../assistant';
import { Logger } from 'angular2-logger/core';
@Component({
  selector: 'nga-select-assistant',
  templateUrl: './select.html',
})
export class AssistantSelectComponent implements OnInit {

  @Input() assistantId: number;
  @Output() change: EventEmitter<number> = new EventEmitter<number>();
  @Output() init: EventEmitter<string> = new EventEmitter<string>();
  @Output() loaded: EventEmitter<string> = new EventEmitter<string>();

  isLoaded: boolean = false;
  assistant: Assistant;
  assistants: Array<Assistant> = [];
  filteredAssistants: Array<Assistant> = [];

  constructor (
    private assistantsService: AssistantsService,
    private _logger: Logger,
  ) {}

  ngOnInit () {
    this.init.emit('AssistantSelectComponent');
    this.assistantsService.getAssistants().then(assistants => {
      this.assistants = assistants;
      this.assistant = this.assistants.find(_assistant => +_assistant.id === +this.assistantId);
      this.isLoaded = true;
      this.loaded.emit('AssistantSelectComponent');
    }).catch((err) => {
      this._logger.error(err);
      this.loaded.emit('AssistantSelectComponent');
    });
  }

  filterAssistants (event): void {
    this.filteredAssistants = [];
    for (let i = 0; i < this.assistants.length; i++) {
      const assistant = this.assistants[i];
      if (assistant.title.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
        this.filteredAssistants.push(assistant);
      }
    }
  }

  handleDropdownClick() {
    this.filteredAssistants = [];

    setTimeout(() => {
      this.filteredAssistants = this.assistants;
    }, 100);
  }

  onChanged(event): void {
    this.change.emit(event.id);
  }
}
