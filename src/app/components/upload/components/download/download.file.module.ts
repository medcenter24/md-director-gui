/*
 * Copyright (c) 2018
 *
 *  @author Oleksander  Zagovorychev <zagovorichev@gmail.com>
 */

import { NgModule } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { AppTranslationModule } from '../../../../app.translation.module';
import { UploadService } from '../../upload.service';
import { DownloadFileComponent } from './download.file.component';

@NgModule({
  imports: [
    AppTranslationModule,
    ButtonModule,
  ],
  declarations: [
    DownloadFileComponent,
  ],
  exports: [
    DownloadFileComponent,
  ],
  providers: [
    UploadService,
  ],
})
export class DownloadFileModule {

}
