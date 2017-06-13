/*
 * Copyright (c) 2017
 *
 *  @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Message } from 'primeng/primeng';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { TranslateService } from '@ngx-translate/core';
import { Logger } from 'angular2-logger/core';
import { GlobalState } from '../../../../global.state';
import { AuthenticationService } from '../../../auth/authentication.service';
@Component({
  selector: 'file-uploader',
  templateUrl: './uploader.html'
})
export class FileUploaderComponent {

  @Input() uploads: any[] = [];
  @Input() url: string = '';
  @Output() changed: EventEmitter<any[]> = new EventEmitter<any[]>();

  msgs: Message[];

  // preload translations for the component
  private translateLoaded: string;
  private translateErrorLoad: string;
  private transDeleteQuestion: string;
  private transDeleteConfirmation: string;
  private deleterCounter: number = 0;

  constructor (
    private loadingBar: SlimLoadingBarService,
    private translate: TranslateService,
    private _logger: Logger, private _state: GlobalState,
    private authenticationService: AuthenticationService,
  ) {
  }

  ngOnInit() {
    this.translate.get('general.file_uploaded').subscribe(res => {
      this.translateLoaded = res;
    });
    this.translate.get('general.upload_error').subscribe(res => {
      this.translateErrorLoad = res;
    });

    this.translate.get('general.delete_question').subscribe(res => {
      this.transDeleteQuestion = res;
    });
    this.translate.get('general.delete_confirmation').subscribe(res => {
      this.transDeleteConfirmation = res;
    });
  }

  onBeforeUpload(): void {
    this.msgs = [];
    this._state.notifyDataChanged('growl', []);
    this.loadingBar.start();
  }

  onBeforeSend(event): void {
    event.xhr.setRequestHeader("Authorization", "Bearer " + this.authenticationService.token);
  }

  handleUpload(event): void {
    for(let file of event.files) {
      this.uploads.push(file);
      this.msgs.push({severity: 'info', summary: this.translateLoaded, detail: file.name});
    }
    this._state.notifyDataChanged('growl', this.msgs);
    this.changed.emit(this.uploads);
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
    this.uploads = [];
    this.changed.emit(this.uploads);
  }

  downloadFile(file): void {
    console.log('run download')
  }

  deleteFile(file): void {
      let files = [];

      if (file) {
        files.push(file.id);
      }

      this.deleter(files);
  }

  private deleter(files: Array<any>) : void {
    this.deleterCounter = files.length;

    if (this.deleterCounter){
      this.loadingBar.start();
      files.map(id => {
        console.log('delete id with event')
        this.deleteFileFromGui(id);
        /*this.uploadService.deleteFile(id).then(() => {
          this.deleteFileFromGui(id);
          if (--this.deleterCounter <= 0) {
            this.loadingBar.complete();
          }
        }).catch(err => {
          this._logger.error(err);
          if (--this.deleterCounter <= 0) {
            this.loadingBar.complete();
          }
        });*/
      });
    }
  }

  private deleteFileFromGui(id: number) : void {
    this.uploads = this.uploads.filter(val => +val.id !== +id);
    this.changed.emit(this.uploads);
    $('.row-file-' + id).remove();
  }
}
