/*
 * Copyright (c) 2018.
 *
 * @author Zagovorychev Oleksandr <zagovorichev@gmail.com>
 */

import { NgModule } from '@angular/core';
import { DevelopmentPageComponent } from './development.page.component';
import { routing } from './development.page.routing';
import { DevelopmentGuiModule } from './gui';
import { DevelopmentGuiMultiselectModule } from './gui/multiselect';
import { MultiselectImplementationsModule } from './gui/multiselect/implementations';

@NgModule({
  imports: [
    routing,
    DevelopmentGuiModule,
    DevelopmentGuiMultiselectModule,
    MultiselectImplementationsModule,
  ],
  declarations: [
    DevelopmentPageComponent,
  ],
})
export class DevelopmentPageModule {
}
