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
import { LoggerComponent } from '../../../core/logger/LoggerComponent';
import { AuthenticationService } from '../../../auth/authentication.service';
import { Message } from 'primeng/primeng';
import { LoadableComponent } from '../../../core/components/componentLoader';
import { Upload } from '../../upload';
import { UploadService } from '../../upload.service';
import { HttpHeaders } from '@angular/common/http';
import { forEach } from '@angular/router/src/utils/collection';
import { UiToastService } from '../../../ui/toast/ui.toast.service';

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
              [headers]="httpHeaders"
              [withCredentials]="true"
              auto="true"
              [chooseLabel]="'Browse' | translate"></p-fileUpload>`,
})
export class UploadFileComponent extends LoadableComponent implements OnInit {
  protected componentName: string = 'UploadFileComponent';

  msgs: Message[] = [];
  url: string = '';
  httpHeaders: HttpHeaders;
  file: Upload;

  @Output() changed: EventEmitter<Upload> = new EventEmitter<Upload>();

  constructor(
    private translate: TranslateService,
    private _logger: LoggerComponent,
    private _state: GlobalState,
    private authenticationService: AuthenticationService,
    private uploadService: UploadService,
    private uiToastService: UiToastService,
  ) {
    super();
    this.httpHeaders = new HttpHeaders().set('Authorization', `Bearer ${this.authenticationService.getToken()}`);
  }

  ngOnInit(): void {
    this.url = this.uploadService.getUrl();
  }

  handleBeforeUpload(): void {
    this.startLoader('Uploader');
  }

  handleUpload(event): void {
    this.stopLoader('Uploader');
    this.msgs = [];
    this.file = event.originalEvent.body as Upload;
    this.uiToastService.saved();
    this.changed.emit(this.file);
  }

  // used by the template uploader.html
  handleError(event): void {
    this.uiToastService.error();
    if (event.hasOwnProperty('xhr')) {
      this._logger.error( `Error: Upload to ${event.xhr.responseURL}
        [${event.xhr.status}: ${event.xhr.statusText}]` );
    } else {
      this._logger.error(event.message);
    }
    this.stopLoader('Uploader');
  }
}
