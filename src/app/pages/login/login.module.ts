/*
 *  Copyright (c) 2017.
 *
 *  @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';
import { Login } from './login.component';
import { routing } from './login.routing';
import { AuthenticationService } from '../../components/auth/authentication.service';
import { MessagesModule } from 'primeng/primeng';
import { AppTranslationModule } from '../../app.translation.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgaModule,
    routing,
    MessagesModule,
    AppTranslationModule,
  ],
  declarations: [
    Login,
  ],
  providers: [
    AuthenticationService,
  ],
})
export class LoginModule {}
