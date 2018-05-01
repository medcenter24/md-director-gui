/*
 * Copyright (c) 2017.
 *
 * @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import { Component, Input, Output, EventEmitter } from '@angular/core';
import { User } from '../user';
import { UsersService } from '../users.service';
import { TranslateService } from '@ngx-translate/core';
import { AbstractAutoCompleteController } from '../../ui/abstract.auto.complete.controller';

@Component({
  selector: 'nga-user-selector',
  templateUrl: './user.selector.html',
})
export class UserSelectorComponent extends AbstractAutoCompleteController {
  protected componentName: string = 'UserSelectorComponent';

  user: User;
  isLoaded: boolean = false;

  @Input()
  set userId(id: number) {
    // todo this.changeUser(id);
    console.error('user in selector needs to be changed');
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

 /* ngOnInit(): void {
    const postfix = 'Reload';
    this.startLoader(postfix);
    this.service.getUsers().then((data: User[]) => {
      this.stopLoader(postfix);
      this.users = [];
      this.users.push(new User());
      data.map(_user => {
        this.users.push(_user);
      });
      this.isLoaded = true;
    }).catch(() => this.stopLoader(postfix));
  }

  changeUser(id: number = 0): User {
    let changed = false;
    _.forEach(this.users, (cat: User) => {
      if (cat && id === cat.id) {
        this.user = cat;
        changed = true;
      }
    });

    if (!changed) {
      this.user = new User();
    }

    return this.user;
  }

  reloadWithUserId(id: number): void {
    this.reload().then(() => {
      if (!id && this.users.length) {
        this.directChange = true;
        this.user = this.users[0];
      } else {
        this.user = this.changeUser(id);
      }
    });
  }

  modelChanged(user: User): void {
    console.log(user);
    if (!this.directChange) {
      this.directChange = false;
      if (!user) {
        user = new User();
      }

      this.userChanged.emit(user);
    }
  }*/
}
