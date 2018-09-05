/*
 * Copyright (c) 2018
 *
 *  @author Oleksander  Zagovorychev <zagovorichev@gmail.com>
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule, InputTextModule } from 'primeng/primeng';
import { AppTranslationModule } from '../../../../app.translation.module';
import { FormService } from '../../../forms';
import { AutocompleterModule } from '../../../ui/selector/components/autocompleter';
import { DownloadFileModule } from '../../../upload/components/download';
import { UploadFileModule } from '../../../upload/components/file';
import { InvoiceService } from '../../invoice.service';
import { InvoiceEditorComponent } from './invoice.editor.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AppTranslationModule,
    InputTextModule,
    AutocompleterModule,
    UploadFileModule,
    DownloadFileModule,
    ButtonModule,
  ],
  declarations: [
    InvoiceEditorComponent,
  ],
  exports: [
    InvoiceEditorComponent,
  ],
  providers: [
    FormService,
    InvoiceService,
  ],
})
export class InvoiceEditorModule {

}
