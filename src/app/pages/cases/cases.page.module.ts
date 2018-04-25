/*
 * Copyright (c) 2017.
 *
 * @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import { NgModule } from '@angular/core';
import { CasesPageComponent } from './cases.page.component';
import { routing } from './cases.page.routing';
import { CaseEditorModule } from '../../components/case/components/editor/case.editor.module';
import { CaseDatatableModule } from '../../components/case/components/datatable';


// todo clean this imports list
@NgModule({
  imports: [
    routing,
    CaseEditorModule,
    CaseDatatableModule,
  ],
  declarations: [
    CasesPageComponent,
  ],
  providers: [
  ],
})
export class CasesPageModule {
}
