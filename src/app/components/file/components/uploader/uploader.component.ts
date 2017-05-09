/*
 * Copyright (c) 2017
 *
 *  @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import { Component } from '@angular/core';
import { Growl, Message } from 'primeng/primeng';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { TranslateService } from '@ngx-translate/core';
import { Logger } from 'angular2-logger/core';
import { UploadService } from '../../upload.service';
import { GlobalState } from '../../../../global.state';
@Component({
  selector: 'file-uploader',
  templateUrl: './uploader.html'
})
export class FileUploaderComponent {

  msgs: Message[];
  uploadedFiles: any[] = [];

  constructor (private uploadService: UploadService,
               private loadingBar: SlimLoadingBarService, private translate: TranslateService,
               private _logger: Logger, private _state: GlobalState) {
  }

  ngOnInit() {

  }

  onBeforeUpload(): void {
    this.msgs = [];
    this.loadingBar.start();
  }

  handleUpload(event): void {
    for(let file of event.files) {
      this.uploadedFiles.push(file);
      this.msgs.push({severity: 'info', summary: 'File Uploaded', detail: file.name});
    }
    this._state.notifyDataChanged('growl', this.msgs);
    this.loadingBar.complete();
  }

  handleError (event): void {
    for(let file of event.files) {
      this.msgs.push({severity: 'error', summary: 'File Doesn\'t Uploaded', detail: file.name});
    }
    this._state.notifyDataChanged('growl', this.msgs);
    this._logger.error('Error: Upload to ' + event.xhr.responseURL + ' [' + event.xhr.status + ': ' + event.xhr.statusText + ']');
    this.loadingBar.complete();
  }

  onSelect(event): void {
    console.log(event, 'select')
  }

  onClear(event): void {
    console.log(event, 'clear')
  }
}
