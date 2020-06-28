/*
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU General Public License
 * as published by the Free Software Foundation; under version 2
 * of the License (non-upgradable).
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
 *
 * Copyright (c) 2019 (original work) MedCenter24.com;
 */

import { Component, Input, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { Message } from 'primeng/api';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { TranslateService } from '@ngx-translate/core';
import { GlobalState } from '../../global.state';
import { AuthenticationService } from '../auth/authentication.service';
import { ImporterService } from './importer.service';
import { LoggerComponent } from '../core/logger/LoggerComponent';
import { UiToastService } from '../ui/toast/ui.toast.service';

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

  private deleterCounter: number = 0;
  private importerCounter: number = 0;

  constructor (private loadingBar: SlimLoadingBarService, private translate: TranslateService,
               private _logger: LoggerComponent, private _state: GlobalState,
               private authenticationService: AuthenticationService,
               private importerService: ImporterService,
               private confirmationService: ConfirmationService,
               private uiToastService: UiToastService,
  ) { }

  ngOnInit() {
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
    event.xhr.setRequestHeader('Authorization', `Bearer ${this.authenticationService.getToken()}`);
  }

  handleBeforeUpload(): void {
    this.loadingBar.start();
  }

  handleClear(): void {
  }

  handleUpload(event): void {
    this.loadingBar.complete();
    this.loadImportQueue();
  }

  handleError(event): void {
    for (const file of event.files) {
      this.uiToastService.errorMessage(file.name);
    }
    this._logger.error(`Error: Upload to ${event.xhr.responseURL} [${event.xhr.status}:${event.xhr.statusText}]`);
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

      this.translate.get('Do you want to delete this record(s)?').subscribe(msg => {
        this.confirmationService.confirm({
          message: msg,
          header: this.translate.instant('Delete confirmation'),
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
      });
    }
  }

  report (file): void {
    const result = this.importedFiles.filter(val => +val.id === +file.id)[0];

    this.translate.get('Report').subscribe(msg => {
      this.confirmationService.confirm({
        message: result.response,
        header: msg,
        icon: result.success ? 'fa fa-check-circle-o' : 'fa fa-exclamation-triangle',
        acceptVisible: false,
      });
    });
  }

  getUrl(): string {
    return this.importerService.getUrl(this.url);
  }

  isImported(id: number): boolean {
    const is = this.importedFiles.filter(val => +val.id === +id);
    return !!is.length;
  }

  private importer(files: any[]): void {
    this.importerCounter = files.length;

    if (this.importerCounter) {
      this.loadingBar.start();
      files.map(id => {
        this.importerService.importFile(this.url, id).then(resp => {
          this.selectedFiles = this.selectedFiles.filter(val => +val !== +id);
          $(`.row-file-${id}`).addClass('is-success');
          this.importedFiles.push({
            id: +id,
            success: true,
            response: resp.accidentId,
          });
          this.loadingBar.complete();
        }).catch(response => {
          this.selectedFiles = this.selectedFiles.filter(val => +val !== +id);
          $(`.row-file-${id}`).addClass('error');
          this.importedFiles.push({
            id: +id,
            success: false,
            response: response.error.message,
          });
          this._logger.info(response);
          this.loadingBar.complete();
        });
      });
    }
  }

  private deleter(files: any[]): void {
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

    $(`.row-file-${id}`).remove();
  }

}
