/*
 * Copyright (c) 2018.
 *
 * @author Zagovorychev Olexandr <zagovorichev@gmail.com>
 */

import { NgModule } from '@angular/core';
import { SelectButtonModule } from 'primeng/primeng';
import { CaseTypeSelectComponent } from './case.type.select.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    FormsModule,
    SelectButtonModule,
  ],
  declarations: [
    CaseTypeSelectComponent,
  ],
  exports: [
    CaseTypeSelectComponent,
  ],
})
export class CaseTypeSelectModule {
}
