/*
 * Copyright (c) 2018
 *
 *  @author Oleksander  Zagovorychev <zagovorichev@gmail.com>
 */

import { Component, Input } from '@angular/core';
import { Message } from 'primeng/primeng';
import { LoadableComponent } from '../../../core/components/componentLoader';
import { Upload } from '../../upload';
import { UploadService } from '../../upload.service';

@Component({
  selector: 'nga-file-download',
  template: `<p-button
          [disabled]="!file"
          (onClick)="downloadFile()"
          label="{{ 'Download' | translate }}"
          icon="fa fa-download"></p-button>`,
})
export class DownloadFileComponent extends LoadableComponent {
  protected componentName: string = 'DownloadFileComponent';

  msgs: Message[] = [];
  url: string = '';

  @Input() file: Upload;

  constructor(
    private uploadService: UploadService,
  ) {
    super();
  }

  downloadFile(): void {
    this.uploadService.download(this.file);
  }
}
