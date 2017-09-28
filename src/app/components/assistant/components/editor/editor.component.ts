/*
 * Copyright (c) 2017.
 *
 * @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Assistant } from '../../assistant';
import { AssistantsService } from '../../assistant.service';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';

@Component({
    selector: 'nga-assistant-editor',
    templateUrl: './editor.html',
})
export class AssistantEditorComponent {

    @Input() assistant: Assistant;
    @Output() assistantSaved: EventEmitter<Assistant> = new EventEmitter<Assistant>();
    @Output() loaded: EventEmitter<null> = new EventEmitter<null>();
    @Output() close: EventEmitter<null> = new EventEmitter<null>();

    constructor (private service: AssistantsService, private loadingBar: SlimLoadingBarService) { }

    onSubmit(): void {
        this.loadingBar.start();
        this.service.update(this.assistant).then(() => {
            this.assistantSaved.emit(this.assistant);
            this.loadingBar.complete();
        }).catch(() => {
            this.loadingBar.complete();
        });
    }

    closeEditor(): void {
        this.close.emit();
    }
}
