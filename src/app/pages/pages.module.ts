import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';

import { routing }       from './pages.routing';
import { NgaModule } from '../theme/nga.module';

import { Pages } from './pages.component';

import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';

@NgModule({
  imports: [
    CommonModule,
    NgaModule,
    routing,
    SlimLoadingBarModule.forRoot()
  ],
  exports: [ SlimLoadingBarModule ],
  declarations: [ Pages ]
})
export class PagesModule {
}
