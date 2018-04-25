/*
 * Copyright (c) 2018.
 *
 * @author Zagovorychev Olexandr <zagovorichev@gmail.com>
 */

import { NgModule } from '@angular/core';
import { UserEditorComponent } from './user.editor.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppTranslationModule } from '../../../app.translation.module';
import { UserSelectorModule } from '../selector';
import { NgaModule } from '../../../theme/nga.module';
import { ButtonModule } from 'primeng/button';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AppTranslationModule,
    UserSelectorModule,
    NgaModule,
    ButtonModule,
  ],
  exports: [
    UserEditorComponent,
  ],
  declarations: [
    UserEditorComponent,
  ],
})
export class UserEditorModule {
}
