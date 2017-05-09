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
import { GlobalState } from '../../../../global.state';
import { MediaService } from '../../media.service';
@Component({
  selector: 'file-uploader',
  templateUrl: './uploader.html'
})
export class FileUploaderComponent {

  msgs: Message[];
  uploadedFiles: any[] = [];

  // preload translations for the component
  private translateLoaded: string;
  private translateErrorLoad: string;

  constructor (private uploadService: MediaService,
               private loadingBar: SlimLoadingBarService, private translate: TranslateService,
               private _logger: Logger, private _state: GlobalState) {
  }

  ngOnInit() {
    this.translate.get('general.file_uploaded').subscribe(res => {
      this.translateLoaded = res;
    });
    this.translate.get('general.upload_error').subscribe(res => {
      this.translateErrorLoad = res;
    });
  }

  onBeforeUpload(): void {
    this.msgs = [];
    this._state.notifyDataChanged('growl', []);
    this.loadingBar.start();
  }

  handleUpload(event): void {
    console.log(event);
    for(let file of event.files) {
      this.uploadedFiles.push(file);
      this.msgs.push({severity: 'info', summary: this.translateLoaded, detail: file.name});
    }
    this._state.notifyDataChanged('growl', this.msgs);
    this.loadingBar.complete();
  }

  handleError (event): void {
    for(let file of event.files) {
      this.msgs.push({severity: 'error', summary: this.translateErrorLoad, detail: file.name});
    }
    this._state.notifyDataChanged('growl', this.msgs);
    this._logger.error('Error: Upload to ' + event.xhr.responseURL + ' [' + event.xhr.status + ': ' + event.xhr.statusText + ']');
    this.loadingBar.complete();
  }

  onClear(): void {
    this.msgs = [];
    this._state.notifyDataChanged('growl', []);
    this.uploadedFiles = [];
  }
}
