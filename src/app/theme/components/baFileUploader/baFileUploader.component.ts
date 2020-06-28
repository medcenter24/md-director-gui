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

import { Component, ViewChild, Input, Output, EventEmitter, ElementRef, Renderer2 } from '@angular/core';
import { UploaderOptions } from 'ngx-uploader';

// todo check if it is needed and refactor if it is
@Component({
  selector: 'ba-file-uploader',
  styleUrls: ['./baFileUploader.scss'],
  templateUrl: './baFileUploader.html',
})
export class BaFileUploader {
  @Input() fileUploaderOptions: UploaderOptions;
  @Output() onFileUpload = new EventEmitter<any>();
  @Output() onFileUploadCompleted = new EventEmitter<any>();
  @Input() defaultValue: string = '';

  @ViewChild('fileUpload') _fileUpload: ElementRef;
  @ViewChild('inputText') _inputText: ElementRef;

  uploadFileInProgress: boolean;
  constructor(private renderer: Renderer2) {
  }

  bringFileSelector(): boolean {
    console.error('renderer was not tested when switched to v2, this part should be rewritten if needed')
    // this.renderer..invokeElementMethod(this._fileUpload.nativeElement, 'click');
    return false;
  }

  beforeFileUpload(uploadingFile): void {
    let files = this._fileUpload.nativeElement.files;
    if (files.length) {
      const file = files[0];
      this._onChangeFileSelect(files[0])
      if (!this._canFleUploadOnServer()) {
        uploadingFile.setAbort();
      } else {
        this.uploadFileInProgress = true;
      }
    }
  }

  _onChangeFileSelect(file) {
    this._inputText.nativeElement.value = file.name
  }

  _onFileUpload(data): void {
    if (data['done'] || data['abort'] || data['error']) {
      this._onFileUploadCompleted(data);
    } else {
      this.onFileUpload.emit(data);
    }
  }

  _onFileUploadCompleted(data): void {
    this.uploadFileInProgress = false;
    this.onFileUploadCompleted.emit(data);
  }

  _canFleUploadOnServer(): boolean {
    return !!this.fileUploaderOptions['url'];
  }
}
