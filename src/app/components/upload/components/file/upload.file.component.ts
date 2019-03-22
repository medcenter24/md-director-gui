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

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { GlobalState } from '../../../../global.state';
import { Logger } from 'angular2-logger/core';
import { AuthenticationService } from '../../../auth/authentication.service';
import { Message } from 'primeng/primeng';
import { LoadableComponent } from '../../../core/components/componentLoader';
import { Upload } from '../../upload';
import { UploadService } from '../../upload.service';

@Component({
  selector: 'nga-file-upload',
  template: `
      <p-fileUpload
              #fubauto
              mode="basic"
              name="uploadFile"
              [url]="url"
              maxFileSize="1000000"
              (onUpload)="handleUpload($event)"
              (onError)="handleError($event)"
              (onBeforeUpload)="handleBeforeUpload()"
              (onBeforeSend)="handleBeforeSend($event)"
              auto="true"
              [chooseLabel]="'Browse' | translate"></p-fileUpload>`,
})
export class UploadFileComponent extends LoadableComponent implements OnInit {
  protected componentName: string = 'UploadFileComponent';

  msgs: Message[] = [];
  url: string = '';

  file: Upload;
  @Output() changed: EventEmitter<Upload> = new EventEmitter<Upload>();

  constructor(
    private translate: TranslateService,
    private _logger: Logger,
    private _state: GlobalState,
    private authenticationService: AuthenticationService,
    private uploadService: UploadService,
  ) {
    super();
  }

  ngOnInit(): void {
    this.url = this.uploadService.getUrl();
  }

  handleBeforeUpload(): void {
    this.msgs = [];
    this._state.notifyDataChanged('growl', this.msgs);
    this.startLoader('Uploader');
  }

  handleBeforeSend(event): void {
    event.xhr.setRequestHeader('Authorization', `Bearer ${this.authenticationService.getToken()}`);
  }

  handleUpload(event): void {
    this.stopLoader('Uploader');
    this.msgs = [];
    this.file = JSON.parse(event.xhr.response) as Upload;
    this.msgs.push({ severity: 'info', summary: 'this.translateLoaded', detail: this.file.name });
    this._state.notifyDataChanged('growl', this.msgs);
    this.changed.emit(this.file);
  }

  // used by the template uploader.html
  handleError(event): void {
    for (const file of event.files) {
      this.msgs.push({ severity: 'error', summary: 'this.translateErrorLoad', detail: file.name });
    }
    this._state.notifyDataChanged('growl', this.msgs);
    this._logger.error(`Error: Upload to ${event.xhr.responseURL}
        [${event.xhr.status}: ${event.xhr.statusText}]`);
    this.stopLoader('Uploader');
  }
}
