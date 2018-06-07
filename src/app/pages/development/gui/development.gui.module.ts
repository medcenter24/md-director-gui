/*
 * Copyright (c) 2018.
 *
 * @author Zagovorychev Oleksandr <zagovorichev@gmail.com>
 */

import { NgModule } from '@angular/core';
import { DevelopmentGuiComponent } from './development.gui.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule,
  ],
  declarations: [
    DevelopmentGuiComponent,
  ],
  exports: [
    DevelopmentGuiComponent,
  ],
})
export class DevelopmentGuiModule {

}
