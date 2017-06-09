/*
 * Copyright (c) 2017
 *
 *  @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AssistantsService } from '../../assistant.service';
import { Assistant } from '../../assistant';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { Logger } from 'angular2-logger/core';
@Component({
  selector: 'select-assistant',
  templateUrl: './select.html'
})
export class AssistantSelectComponent {

  @Input() assistantId: number;
  @Output() change: EventEmitter<number> = new EventEmitter<number>();

  isLoaded: boolean = false;
  assistant: Assistant;
  assistants: Array<Assistant> = [];
  filteredAssistants: Array<Assistant> = [];

  constructor (private assistantsService: AssistantsService, private loadingBar: SlimLoadingBarService, private _logger: Logger) {}

  ngOnInit () {
    this.loadingBar.start();
    this.assistantsService.getAssistants().then(assistants => {
      this.assistants = assistants;
      this.assistantId *= 1;
      this.assistant = this.assistants.find(_assistant => _assistant.id === this.assistantId);
      this.loadingBar.complete();
      this.isLoaded = true;
    }).catch((err) => {
      this.loadingBar.complete();
      this._logger.error(err);
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

  onChanged(event): void {
    this.change.emit(event.id);
  }
}
