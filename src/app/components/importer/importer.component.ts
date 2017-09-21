/*
 * Copyright (c) 2017
 *
 *  @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import { Component, Input, OnInit } from '@angular/core';
import { ConfirmationService, Message } from 'primeng/primeng';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { TranslateService } from '@ngx-translate/core';
import { GlobalState } from '../../global.state';
import { Logger } from 'angular2-logger/core';
import { AuthenticationService } from '../auth/authentication.service';
import { ImporterService } from './importer.service';
@Component({
  selector: 'nga-importer',
  templateUrl: './importer.html',
})
export class ImporterComponent implements OnInit {

  @Input() url: string = '';

  display: boolean = false;
  msgs: Message[] = [];
  uploadedFiles: any[] = [];
  selectedFormat: string = '.docx';
  selectedFiles: any[] = [];
  importedFiles: any[] = [];

  // preload translations for the component
  private translateLoaded: string;
  private translateErrorLoad: string;
  private transDeleteQuestion: string;
  private transDeleteConfirmation: string;
  private transReport: string;

  private deleterCounter: number = 0;
  private importerCounter: number = 0;

  constructor (private loadingBar: SlimLoadingBarService, private translate: TranslateService,
               private _logger: Logger, private _state: GlobalState,
               private authenticationService: AuthenticationService,
               private importerService: ImporterService,
               private confirmationService: ConfirmationService,
  ) { }

  ngOnInit() {
    this.translate.get('File Uploaded').subscribe(res => {
      this.translateLoaded = res;
    });
    this.translate.get('Upload Error').subscribe(res => {
      this.translateErrorLoad = res;
    });
    this.translate.get('Do you want to delete this record(s)?').subscribe(res => {
      this.transDeleteQuestion = res;
    });
    this.translate.get('Delete confirmation').subscribe(res => {
      this.transDeleteConfirmation = res;
    });
    this.translate.get('Report').subscribe(res => {
      this.transReport = res;
    });

    this.loadImportQueue();
  }

  private loadImportQueue(): void {
    this.loadingBar.start();
    this.importerService.getQueue(this.url).then(uploads => {
      this.uploadedFiles = uploads.data;
      this.loadingBar.complete();
    }).catch((err) => {
      this.loadingBar.complete();
      this._logger.error(err);
    });
  }

  showImporter (): void {
    this.display = true;
  }

  handleBeforeSend(event): void {
    event.xhr.setRequestHeader('Authorization', 'Bearer ' + this.authenticationService.token);
  }

  handleBeforeUpload(event): void {
    this.msgs = [];
    this._state.notifyDataChanged('growl', []);
    this.loadingBar.start();
  }

  handleClear(event): void {
    this.msgs = [];
    this._state.notifyDataChanged('growl', []);
  }

  handleUpload(event): void {
    for (const file of event.files) {
      this.msgs.push({ severity: 'info', summary: this.translateLoaded, detail: file.name });
    }
    this._state.notifyDataChanged('growl', this.msgs);
    this.loadingBar.complete();

    this.loadImportQueue();
  }

  handleError(event): void {
    for (const file of event.files) {
      this.msgs.push({ severity: 'error', summary: this.translateErrorLoad, detail: file.name });
    }
    this._state.notifyDataChanged('growl', this.msgs);
    this._logger.error('Error: Upload to ' + event.xhr.responseURL
      + ' [' + event.xhr.status + ': ' + event.xhr.statusText + ']');
    this.loadingBar.complete();
  }

  importFile (file): void {
    let files = [];

    if (file) {
      files.push(file.id);
    } else {
      files = this.selectedFiles;
    }

    this.importer(files);
  }

  deleteFile (file): void {
    if (this.isImported(file.id)) {
      this.deleteFileFromGui(file.id);
    } else {
      this.confirmationService.confirm({
        message: this.transDeleteQuestion,
        header: this.transDeleteConfirmation,
        icon: 'fa fa-trash',
        acceptVisible: true,
        accept: () => {
          let files = [];

          if (file) {
            files.push(file.id);
          } else {
            files = this.selectedFiles;
          }

          this.deleter(files);
        },
      });
    }
  }

  report (file): void {
    const result = this.importedFiles.filter(val => +val.id === +file.id)[0];

    this.confirmationService.confirm({
      message: result.response,
      header: this.transReport,
      icon: result.success ? 'fa fa-check-circle-o' : 'fa fa-exclamation-triangle',
      acceptVisible: false,
    });
  }

  isImported(id: number): boolean {
    const is = this.importedFiles.filter(val => +val.id === +id);
    return !!is.length;
  }

  private importer(files: Array<any>): void {
    this.importerCounter = files.length;

    if (this.importerCounter) {
      this.loadingBar.start();
      files.map(id => {
        this.importerService.importFile(this.url, id).then(resp => {
          this.selectedFiles = this.selectedFiles.filter(val => +val !== +id);
          $('.row-file-' + id).addClass('is-success');
          this.importedFiles.push({
            id: +id,
            success: true,
            response: resp.accidentId,
          });
          this.loadingBar.complete();
        }).catch(err => {
          this.selectedFiles = this.selectedFiles.filter(val => +val !== +id);
          $('.row-file-' + id).addClass('error');
          this.importedFiles.push({
            id: +id,
            success: false,
            response: err.json().message,
          });
          this._logger.error(err);
          this.loadingBar.complete();
        });
      });
    }
  }

  private deleter(files: Array<any>): void {
    this.deleterCounter = files.length;

    if (this.deleterCounter) {
      this.loadingBar.start();
      files.map(id => {
        this.importerService.deleteFile(this.url, id).then(() => {
          this.deleteFileFromGui(id);
          if (--this.deleterCounter <= 0) {
            this.loadingBar.complete();
          }
        }).catch(err => {
          this._logger.error(err);
          this.loadingBar.complete();
        });
      });
    }
  }

  private deleteFileFromGui(id: number): void {
    this.selectedFiles = this.selectedFiles.filter(val => +val !== +id);
    this.uploadedFiles = this.uploadedFiles.filter(val => +val.id !== +id);

    $('.row-file-' + id).remove();
  }

}
