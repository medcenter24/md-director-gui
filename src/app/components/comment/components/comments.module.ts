/*
 * Copyright (c) 2018.
 *
 * @author Zagovorychev Olexandr <zagovorichev@gmail.com>
 */

import { NgModule } from '@angular/core';
import { CommentsComponent } from './comments.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppTranslationModule } from '../../../app.translation.module';
import { ButtonModule } from 'primeng/button';
import { InputTextareaModule } from 'primeng/primeng';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AppTranslationModule,
    ButtonModule,
    InputTextareaModule,
  ],
  declarations: [
    CommentsComponent,
  ],
  exports: [
    CommentsComponent,
  ],
})
export class CommentsModule {
}
