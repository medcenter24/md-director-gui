/*
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU General Public License
 * as published by the Free Software Foundation; under version 2
 * of the License (non-upgradable).
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
 *
 * Copyright (c) 2019 (original work) MedCenter24.com;
 */

import { Component, Input } from '@angular/core';
import { User } from '../user';
import { UsersService } from '../users.service';
import { TranslateService } from '@ngx-translate/core';
import { AbstractAutoCompleteController } from '../../ui/autocompleter/abstract.auto.complete.controller';

@Component({
  selector: 'nga-user-select',
  templateUrl: '../../ui/autocompleter/autocompleter.tpl.html',
})
export class UserSelectComponent extends AbstractAutoCompleteController {
  protected componentName: string = 'UserSelectorComponent';

  user: User;
  isLoaded: boolean = false;

  @Input()
  set userId(id: number) {
    this.setUserById(id);
  }

  users: User[] = [];

  constructor(
    private service: UsersService,
    protected translateService: TranslateService,
    ) {
    super(translateService);
  }

  getService() {
    return this.service;
  }

  getFieldKey(): string {
    return 'name';
  }

  setUserById(userId: number): void {
    const user = new User();
    const hasUser = +userId;
    if (hasUser) {
      const postfix = 'GetUser';
      this.startLoader(postfix);
      this.service.getUser(userId).then((mUser: User) => {
        this.stopLoader(postfix);
        this.selectItems(mUser);
      }).catch(() => {
        this.stopLoader(postfix);
        this.selectItems(user);
      });
    } else {
      this.selectItems(user);
    }
  }
}
