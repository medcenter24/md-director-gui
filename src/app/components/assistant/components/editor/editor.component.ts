/*
 * Copyright (c) 2017.
 *
 * @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import { Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { Assistant } from '../../assistant';
import { AssistantsService } from '../../assistant.service';
import { NgUploaderOptions } from 'ngx-uploader';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';

@Component({
    selector: 'assistant-editor',
    templateUrl: './editor.html'
})
export class AssistantEditorComponent {

    @Input() assistant: Assistant;
    @Output() assistantSaved: EventEmitter<Assistant> = new EventEmitter<Assistant>();
    @Output() loaded: EventEmitter<null> = new EventEmitter<null>();

    public defaultPicture = 'assets/img/theme/no-photo.png';
    public uploaderOptions: NgUploaderOptions = {
        // url: 'http://website.com/upload'
        url: '',
    };

    private loadingControl: Array<string> = [];

    constructor (private service: AssistantsService, private loadingBar: SlimLoadingBarService) { }

    ngOnInit() {}

    onSubmit(): void {
        this.loadingBar.start();
        this.service.update(this.assistant).then(() => {
            this.assistantSaved.emit(this.assistant);
            this.loadingBar.complete();
        }).catch(() => {
            this.loadingBar.complete();
        });
    }

    startUpload(): void {
        this.loadingBar.start();
    }

    endUpload(event): void {
        this.assistant.media_id = event.media_id;
        this.loadingBar.complete();
    }

    onLoading(key): void {
        console.log('loading');
    }

    onLoaded(key): void {
        console.log('loaded');
    }
}
