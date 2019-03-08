/*
 * Copyright (c) 2018.
 *
 * @author Zagovorychev Olexandr <zagovorichev@gmail.com>
 */
import { NgModule } from '@angular/core';
import { ImporterComponent } from './importer.component';
import { ImporterService } from './importer.service';
import { ButtonModule, CheckboxModule, ConfirmDialogModule, DialogModule, FileUploadModule } from 'primeng/primeng';
import { AppTranslationModule } from '../../app.translation.module';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AppTranslationModule,
    DialogModule,
    FileUploadModule,
    ConfirmDialogModule,
    ButtonModule,
    CheckboxModule,
  ],
  declarations: [
    ImporterComponent,
  ],
  providers: [
    ImporterService,
  ],
  exports: [
    ImporterComponent,
  ],
})
export class ImporterModule {
}
