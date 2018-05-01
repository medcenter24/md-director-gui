/*
 * Copyright (c) 2018.
 *
 * @author Zagovorychev Olexandr <zagovorichev@gmail.com>
 */

import { NgModule } from '@angular/core';
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {AppTranslationModule} from "../../../../app.translation.module";
import {ServiceSelectModule} from "../select";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AppTranslationModule,
    ServiceSelectModule,
  ],
  providers: [],
  declarations: [],
  exports: [],
})
export class ServiceSelectorModule {
}
