/*
 * Copyright (c) 2018.
 *
 * @author Zagovorychev Olexandr <zagovorichev@gmail.com>
 */

import { NgModule } from '@angular/core';
import { UploadPictureComponent } from './upload.picture.component';
import { CommonModule } from '@angular/common';
import { NgxUploaderModule } from 'ngx-uploader';

@NgModule({
  imports: [
    CommonModule,
    NgxUploaderModule,
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
