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
      <label for="users">User</label>
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
      if (id === cat.id) {
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
    this.service.getUsers().then((data) => {
      this.users = data;
      if (!user && this.users.length) {
        this.user = this.users[ 0 ];
      } else {
        this.user = this.changeUser(user.id);
      }
      this.loaded.emit();
    });
    return user;
  }

  reloadWithUserId (id: number): void {
    this.loading.emit();
    this.service.getUsers().then((data) => {
      this.users = data;
      this.user = this.changeUser(id);
      this.loaded.emit();
    });
  }

  onChange (): void {
    this.userChanged.emit(this.user.id);
  }
}
