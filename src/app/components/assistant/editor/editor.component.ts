/*
 * Copyright (c) 2017.
 *
 * @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import {Component, Input, Output, EventEmitter, ViewChild} from '@angular/core';
import {SlimLoadingBarComponent} from "ng2-slim-loading-bar";
import {Assistant} from "../assistant";
import {AssistantsService} from "../assistant.service";
import {NgUploaderOptions} from "ngx-uploader";

@Component({
    selector: 'assistant-editor',
    templateUrl: './editor.html'
})
export class AssistantEditorComponent {

    @Input() assistant: Assistant;
    @Output() assistantSaved: EventEmitter<Assistant> = new EventEmitter<Assistant>();
    @Output() loaded: EventEmitter<null> = new EventEmitter<null>();

    @ViewChild('loadingBarAssistantEditor')
        private loadingBar: SlimLoadingBarComponent;

    public defaultPicture = 'assets/img/theme/no-photo.png';
    public uploaderOptions: NgUploaderOptions = {
        // url: 'http://website.com/upload'
        url: '',
    };

    constructor (private service: AssistantsService) { }

    ngOnInit() {}

    startLoading(): void {
        this.loadingBar.color = '#209e91';
        this.loadingBar.show = true;
        this.loadingBar.service.reset();
        this.loadingBar.service.start();
    }

    completeLoading(): void {
        this.loadingBar.service.complete();
        this.loadingBar.show = false;
    }

    errorLoading(): void {
        this.loadingBar.color = '#f89711';
    }

    onSubmit(): void {
        this.startLoading();
        this.service.update(this.assistant).then(() => {
            this.assistantSaved.emit(this.assistant);
            this.completeLoading();
        }).catch(() => {
            this.errorLoading();
            this.completeLoading();
        });
    }

    startUpload(): void {
        this.startLoading();
    }

    endUpload(event): void {
        this.assistant.media_id = event.media_id;
        this.completeLoading();
    }
}
