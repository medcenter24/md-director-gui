/*
 * Copyright (c) 2017
 *
 *  @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AssistantsService } from '../../assistant.service';
import { Assistant } from '../../assistant';
@Component({
  selector: 'select-assistant',
  templateUrl: './select.html'
})
export class AssistantSelectComponent {

  @Input() assistant: Assistant;

  @Output() loading: EventEmitter<string> = new EventEmitter<string>();
  @Output() loaded: EventEmitter<string> = new EventEmitter<string>();

  assistants: Array<Assistant> = [];
  filteredAssistants: Array<Assistant> = [];

  constructor (private assistantsService: AssistantsService) {}

  ngOnInit () {
    this.loading.emit('assistant-assigner');
    this.assistantsService.getAssistants().then(assistants => {
      this.assistants = assistants;
      this.loaded.emit('assistant-assigner');
    }).catch((err) => {
      this.loaded.emit('assistant-assigner');
      console.error('log_error: ', err);
    });
  }

  filterAssistants (event): void {
    this.filteredAssistants = [];
    for(let i = 0; i < this.assistants.length; i++) {
      let assistant = this.assistants[i];
      if(assistant.title.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
        this.filteredAssistants.push(assistant);
      }
    }
  }

  handleDropdownClick() {
    this.filteredAssistants = [];

    //mimic remote call
    setTimeout(() => {
      this.filteredAssistants = this.assistants;
    }, 100)
  }
}
