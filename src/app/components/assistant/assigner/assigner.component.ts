/*
 * Copyright (c) 2017
 *
 *  @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import { Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { SlimLoadingBarComponent } from 'ng2-slim-loading-bar';
import { Assistant } from '../assistant';
import { AssistantsService } from '../assistant.service';
import { NgUploaderOptions } from 'ngx-uploader';

@Component({
    selector: 'assistant-assigner',
    templateUrl: './assigner.html'
})
export class AssistantAssignerComponent {

    @Output() loading: EventEmitter<string> = new EventEmitter<string>();
    @Output() loaded: EventEmitter<string> = new EventEmitter<string>();

    assistant: Assistant;
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

    search (event): void {
        console.log(event, this.assistants);
        this.assistant = this.assistants[0];
    }

    handleDropdownClick() {
        this.filteredAssistants = this.assistants;
        console.log(this.assistants);
    }
}
