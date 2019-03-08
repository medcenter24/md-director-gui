/*
 * Copyright (c) 2018.
 *
 * @author Zagovorychev Olexandr <zagovorichev@gmail.com>
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SelectButtonModule } from 'primeng/primeng';
import { AccidentTypeSelectComponent } from './accident.type.select.component';
import { AccidentTypesService } from '../types.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SelectButtonModule,
  ],
  declarations: [AccidentTypeSelectComponent],
  exports: [AccidentTypeSelectComponent],
  providers: [
    AccidentTypesService,
  ],
})
export class AccidentTypeSelectModule {
}
