/*
 * Copyright (c) 2018.
 *
 * @author Zagovorychev Olexandr <zagovorichev@gmail.com>
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserSelectorComponent } from './user.selector.component';
import { UsersService } from '../users.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
  ],
  providers: [
    UsersService,
  ],
  declarations: [
    UserSelectorComponent,
  ],
  exports: [
    UserSelectorComponent,
  ],
})
export class UserSelectorModule {
}
