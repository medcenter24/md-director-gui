/*
 * Copyright (c) 2017.
 *
 * @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { NgaModule } from '../../theme/nga.module';

import { routing } from './profile.routing';
import { MessagesModule } from 'primeng/primeng';
import { AppTranslationModule } from '../../app.translation.module';
import { ProfileComponent } from './profile.component';

@NgModule({
  imports: [
    CommonModule,
    NgaModule,
    routing,
    MessagesModule,
    AppTranslationModule,
  ],
  declarations: [
    ProfileComponent,
  ],
  providers: [
  ]
})
export class ProfileModule {}
