/*
 * Copyright (c) 2017
 *
 *  @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AssistantsService } from '../../assistant.service';
import { Assistant } from '../../assistant';
import { Logger } from 'angular2-logger/core';
import { LoadableComponent } from '../../../core/components/componentLoader/LoadableComponent';
@Component({
  selector: 'nga-select-assistant',
  templateUrl: './select.html',
})
export class AssistantSelectComponent extends LoadableComponent implements OnInit {

  @Input() assistantId: number;
  @Input() required: boolean = false;
  @Output() change: EventEmitter<number> = new EventEmitter<number>();

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
    this.initComponent();
    this.assistantsService.getAssistants().then(assistants => {
      this.assistants = assistants;
      this.assistant = this.assistants.find(_assistant => +_assistant.id === +this.assistantId);
      this.isLoaded = true;
      this.loadedComponent();
    }).catch((err) => {
      this._logger.error(err);
      this.loadedComponent();
    });
  }

  filterAssistants (event): void {
    this.filteredAssistants = [];
    for (const assistant of this.assistants) {
      if (assistant.title.toLowerCase().indexOf(event.query.toLowerCase()) === 0) {
        this.filteredAssistants.push(assistant);
      }
    }
  }

  onChanged(event): void {
    this.change.emit(event.id);
  }
}
