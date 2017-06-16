/*
 * Copyright (c) 2017.
 *
 * @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

/*
 * Copyright (c) 2017.
 *
 * @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import { Component, Input, Output, EventEmitter } from '@angular/core';
import { User } from '../user';
import { UsersService } from '../users.service';
import * as _ from 'lodash';

@Component({
  selector: 'user-selector',
  template: `
      <label for="users" translate>User</label>
      <select id="users" class="form-control" name="user" [(ngModel)]="user" (ngModelChange)="onChange($event)">
          <option [ngValue]="_user" *ngFor="let _user of users">{{ _user.name }}</option>
      </select>
  `
})
export class UserSelectorComponent {

  user: User;

  @Input()
  set userId (id: number) {
    this.user = this.changeUser(id);
  }

  @Output() userChanged: EventEmitter<number> = new EventEmitter<number>();
  @Output() loading: EventEmitter<any> = new EventEmitter<any>();
  @Output() loaded: EventEmitter<any> = new EventEmitter<any>();

  users: User[] = [];

  constructor (private service: UsersService) {
  }

  ngOnInit (): void {
    this.reload(this.user);
  }

  changeUser (id): User {
    let changed = false;
    _.forEach(this.users, (cat) => {
      if (cat && id === cat.id) {
        this.user = cat;
        changed = true;
      }
    });

    if (!changed) {
      this.user = new User(0, '', '', '');
    }

    return this.user;
  }

  reload (user: User): User {
    this.loading.emit();
    this.service.getUsers().then((data: User[]) => {
      this.users = [];
      this.users.push(new User(0,'','',''));
      data.map(_user => {
        this.users.push(_user);
      });
      if ((!user || !user.id) && this.users.length) {
        this.user = this.users[ 0 ];
      } else {
        this.user = this.changeUser(user.id);
      }
      this.loaded.emit();
    });
    return user;
  }

  reloadWithUserId (id: number): void {
    let user = this.users.filter(_user => +_user.id === +id);
    this.reload(user[0]);
  }

  onChange (): void {
    if (!this.user) {
      this.user = new User(0, '', '', '');
    }

    this.userChanged.emit(this.user.id);
  }
}
