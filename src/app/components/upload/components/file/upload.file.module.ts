/*
 * Copyright (c) 2018.
 *
 * @author Zagovorychev Olexandr <zagovorichev@gmail.com>
 */

import { NgModule } from '@angular/core';
import { FileUploadModule } from 'primeng/primeng';
import { UploadFileComponent } from './upload.file.component';
import { AppTranslationModule } from '../../../../app.translation.module';
import { UploadService } from '../../upload.service';

@NgModule({
  imports: [
    AppTranslationModule,
    FileUploadModule,
  ],
  declarations: [
    UploadFileComponent,
  ],
  exports: [
    UploadFileComponent,
  ],
  providers: [
    UploadService,
  ],
})
export class UploadFileModule {

}
