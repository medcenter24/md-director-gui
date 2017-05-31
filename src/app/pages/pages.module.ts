import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';

import { routing }       from './pages.routing';
import { NgaModule } from '../theme/nga.module';
import { AppTranslationModule } from '../app.translation.module';
import { AUTH_PROVIDERS } from 'angular2-jwt';
import { Pages } from './pages.component';
import { AuthGuard } from '../components/auth/auth.guard';

@NgModule({
  imports: [
    CommonModule,
    AppTranslationModule,
    NgaModule,
    routing,
  ],
  declarations: [ Pages ],
  providers: [ // expose our Services and Providers into Angular's dependency injection
    AuthGuard,
    ...AUTH_PROVIDERS
  ],
})
export class PagesModule {
}
