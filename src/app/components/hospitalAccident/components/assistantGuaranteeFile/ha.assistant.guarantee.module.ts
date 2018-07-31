/*
 * Copyright (c) 2018
 *
 *  @author Oleksander  Zagovorychev <zagovorichev@gmail.com>
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DownloadFileModule } from '../../../upload/components/download';
import { UploadFileModule } from '../../../upload/components/file';
import { HaAssistantGuaranteeComponent } from './ha.assistant.guarantee.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    UploadFileModule,
    DownloadFileModule,
  ],
  declarations: [
    HaAssistantGuaranteeComponent,
  ],
  exports: [
    HaAssistantGuaranteeComponent,
  ],
})
export class HaAssistantGuaranteeModule {}
