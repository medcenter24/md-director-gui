/*
 * Copyright (c) 2017.
 *
 * @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import { Component, Input, Output, EventEmitter } from '@angular/core';
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

  @Output() userChanged: EventEmitter<User> = new EventEmitter<User>();

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

  onChanged(event): void {
    this.userChanged.emit(event);
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
