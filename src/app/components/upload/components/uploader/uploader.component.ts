/*
 * Copyright (c) 2017
 *
 *  @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Message } from 'primeng/primeng';
import { TranslateService } from '@ngx-translate/core';
import { Logger } from 'angular2-logger/core';
import { GlobalState } from '../../../../global.state';
import { AuthenticationService } from '../../../auth/authentication.service';
import { DocumentsService } from '../../../document/documents.service';
import { Document } from '../../../document/document';
@Component({
  selector: 'nga-file-uploader',
  templateUrl: './uploader.html',
})
export class FileUploaderComponent implements OnInit {

  @Input() documents: Document[] = [];
  @Input() url: string = '';
  @Output() changed: EventEmitter<any[]> = new EventEmitter<any[]>();
  @Output() init: EventEmitter<string> = new EventEmitter<string>();
  @Output() loaded: EventEmitter<string> = new EventEmitter<string>();

  msgs: Array<Message> = [];

  // preload translations for the component
  private translateLoaded: string;
  private translateErrorLoad: string;
  private deleterCounter: number = 0;

  constructor(
              private translate: TranslateService,
              private _logger: Logger, private _state: GlobalState,
              private authenticationService: AuthenticationService,
              private documentsService: DocumentsService) {
  }

  ngOnInit() {
    this.translate.get('File Uploaded').subscribe(res => {
      this.translateLoaded = res;
    });
    this.translate.get('Upload Error').subscribe(res => {
      this.translateErrorLoad = res;
    });
  }

  handleBeforeUpload(event): void {
    this.msgs = [];
    this._state.notifyDataChanged('growl', this.msgs);
    this.init.emit('FileUploaderComponent');
  }

  handleBeforeSend(event): void {
    event.xhr.setRequestHeader('Authorization', 'Bearer ' + this.authenticationService.token);
  }

  handleUpload(event): void {
    this.msgs = [];
    const loadedFiles = JSON.parse(event.xhr.response).data as Document[];
    for (const file of loadedFiles) {
      this.documents.push(file);
      this.msgs.push({ severity: 'info', summary: this.translateLoaded, detail: file.title });
    }
    this._state.notifyDataChanged('growl', this.msgs);
    this.changed.emit(this.documents);
    this.loaded.emit('FileUploaderComponent');
  }

  handleError(event): void {
    for (const file of event.files) {
      this.msgs.push({ severity: 'error', summary: this.translateErrorLoad, detail: file.name });
    }
    this._state.notifyDataChanged('growl', this.msgs);
    this._logger.error('Error: Upload to ' + event.xhr.responseURL
      + ' [' + event.xhr.status + ': ' + event.xhr.statusText + ']');
    this.loaded.emit('FileUploaderComponent');
  }

  handleClear(event): void {
    this.msgs = [];
    this._state.notifyDataChanged('growl', []);
    // this will clean all data
    // this.documents = [];
    // this.changed.emit(this.documents);
  }

  downloadFile(file): void {
    this.documentsService.download(file);
  }

  deleteFile(file): void {
    const files = [];

    if (file) {
      files.push(file.id);
    }

    this.deleter(files);
  }

  private deleter(files: Array<any>): void {
    this.deleterCounter = files.length;

    if (this.deleterCounter) {
      this.init.emit('FileUploaderComponent');
      files.map(id => {
        this.documentsService.deleteDocument(id).then(() => {
          this.deleteFileFromGui(id);
          if (--this.deleterCounter <= 0) {
            this.loaded.emit('FileUploaderComponent');
          }
        }).catch(err => {
          this._logger.error(err);
          if (--this.deleterCounter <= 0) {
            this.loaded.emit('FileUploaderComponent');
          }
        });
      });
    }
  }

  private deleteFileFromGui(id: number): void {
    this.documents = this.documents.filter(val => +val.id !== +id);
    this.changed.emit(this.documents);
    $('.row-file-' + id).remove();
  }
}
