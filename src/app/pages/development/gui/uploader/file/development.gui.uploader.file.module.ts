/*
 * Copyright (c) 2018
 *
 *  @author Oleksander  Zagovorychev <zagovorichev@gmail.com>
 */

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DownloadFileModule } from '../../../../../components/upload/components/download';
import { UploadFileModule } from '../../../../../components/upload/components/file';
import { NgaModule } from '../../../../../theme/nga.module';
import { DevelopmentGuiUploaderFileComponent } from './development.gui.uploader.file.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    NgaModule,
    UploadFileModule,
    DownloadFileModule,
  ],
  declarations: [
    DevelopmentGuiUploaderFileComponent,
  ],
  exports: [
    DevelopmentGuiUploaderFileComponent,
  ],
  providers: [
  ],
})
export class DevelopmentGuiUploaderFileModule {

}
