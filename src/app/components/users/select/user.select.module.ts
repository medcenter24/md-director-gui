/*
 * Copyright (c) 2018.
 *
 * @author Zagovorychev Olexandr <zagovorichev@gmail.com>
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserSelectComponent } from './user.select.component';
import { UsersService } from '../users.service';
import { AutoCompleteModule } from '../../ui/autosuggest';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AutoCompleteModule,
  ],
  providers: [
    UsersService,
  ],
  declarations: [
    UserSelectComponent,
  ],
  exports: [
    UserSelectComponent,
  ],
})
export class UserSelectModule {
}
