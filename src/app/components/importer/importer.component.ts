/*
 * Copyright (c) 2017
 *
 *  @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import { Component, Input } from '@angular/core';
import { Message } from 'primeng/primeng';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { TranslateService } from '@ngx-translate/core';
import { GlobalState } from '../../global.state';
import { Logger } from 'angular2-logger/core';
@Component({
  selector: 'importer',
  templateUrl: './importer.html'
})
export class ImporterComponent {

  @Input() url: string = '';

  display: boolean = false;
  msgs: Message[] = [];
  uploadedFiles: any[] = [];
  selectedFormat: string = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';

  // preload translations for the component
  private translateLoaded: string;
  private translateErrorLoad: string;

  constructor (private loadingBar: SlimLoadingBarService, private translate: TranslateService,
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

  showImporter (): void {
    this.display = true;
  }

  onBeforeUpload(): void {
    this.msgs = [];
    this._state.notifyDataChanged('growl', []);
    this.loadingBar.start();
  }

  handleUpload(event): void {
    for(let file of event.files) {
      this.uploadedFiles.push(file);
      this.msgs.push({severity: 'info', summary: this.translateLoaded, detail: file.name});
    }
    this._state.notifyDataChanged('growl', this.msgs);
    this.loadingBar.complete();
  }

  onClear (): void {
    this.msgs = [];
    this._state.notifyDataChanged('growl', []);
    this.uploadedFiles = [];
  }

  handleError (event): void {
    for(let file of event.files) {
      this.msgs.push({severity: 'error', summary: this.translateErrorLoad, detail: file.name});
    }
    this._state.notifyDataChanged('growl', this.msgs);
    this._logger.error('Error: Upload to ' + event.xhr.responseURL + ' [' + event.xhr.status + ': ' + event.xhr.statusText + ']');
    this.loadingBar.complete();
  }
}
