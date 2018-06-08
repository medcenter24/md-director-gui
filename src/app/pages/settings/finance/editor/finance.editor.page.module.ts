/*
 * Copyright (c) 2018.
 *
 * @author Zagovorychev Oleksandr <zagovorichev@gmail.com>
 */

import { NgModule } from '@angular/core';
import { FinanceEditorPageComponent } from './finance.editor.page.component';
import { FinanceEditorModule } from '../../../../components/finance/components/editor';
import { AppTranslationModule } from '../../../../app.translation.module';
import { ButtonModule } from 'primeng/button';
import { NgaModule } from '../../../../theme/nga.module';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    AppTranslationModule,
    ButtonModule,
    NgaModule,
    FinanceEditorModule,
    RouterModule,
  ],
  exports: [FinanceEditorPageComponent],
  declarations: [FinanceEditorPageComponent],
})
export class FinanceEditorPageModule {
}
