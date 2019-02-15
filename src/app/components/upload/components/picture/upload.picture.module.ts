/*
 * Copyright (c) 2018.
 *
 * @author Zagovorychev Olexandr <zagovorichev@gmail.com>
 */

import { NgModule } from '@angular/core';
import { UploadPictureComponent } from './upload.picture.component';
import { CommonModule } from '@angular/common';
import { NgUploaderModule } from 'ngx-uploader';

@NgModule({
  imports: [
    CommonModule,
    NgUploaderModule,
  ],
  declarations: [
    UploadPictureComponent,
  ],
  exports: [
    UploadPictureComponent,
  ],
})
export class UploadPictureModule {
}
