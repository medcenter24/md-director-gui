/*
 * Copyright (c) 2017.
 *
 * @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgaModule } from '../../theme/nga.module';

import { routing } from './profile.routing';
import { MessagesModule, DropdownModule, ButtonModule, InputTextModule } from 'primeng/primeng';
import { AppTranslationModule } from '../../app.translation.module';
import { ProfileComponent } from './profile.component';
import { FormsModule } from '@angular/forms';
import { UsersService } from '../../components/users/users.service';
import { LoggedUserService } from '../../components/auth/loggedUser.service';
import { MediaService } from '../../components/media/media.service';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    NgaModule,
    routing,
    MessagesModule,
    AppTranslationModule,
    DropdownModule,
    ButtonModule,
    InputTextModule,
  ],
  declarations: [
    ProfileComponent,
  ],
  providers: [
    UsersService,
    LoggedUserService,
    MediaService,
  ],
})
export class ProfileModule {}
