/*
 * Copyright (c) 2017.
 *
 * @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import { Component, ViewChild, Output, EventEmitter, OnInit } from '@angular/core';
import { User } from '../user';
import { UsersService } from '../users.service';
import { UserSelectComponent } from '../select';
import { LoadableComponent } from '../../core/components/componentLoader';

@Component({
  selector: 'nga-user-editor',
  templateUrl: './user.editor.html',
})
export class UserEditorComponent extends LoadableComponent implements OnInit {

  protected componentName: string = 'UserEditorComponent';

  user: User;

  @Output() saved: EventEmitter<User> = new EventEmitter<User>();

  @ViewChild(UserSelectComponent)
  private userSelectorComponent: UserSelectComponent;

  constructor(private service: UsersService) {
    super();
  }

  ngOnInit(): void {
    this.setEmptyUser();
  }

  onSubmit(): void {
    let service;
    const postfix = 'Submit';
    this.startLoader(postfix);
    if (this.user.id) {
      service = this.service.update(this.user);
    } else {
      service = this.service.create(this.user);
    }

    service.then((user: User) => {
      this.stopLoader(postfix);
      this.setUser(user);
      this.saved.emit(user);
    }).catch(() => this.stopLoader(postfix));
  }

  onUserChanged(user: User): void {
    this.setUser(user);
  }

  onUserCreated(): void {
    this.setEmptyUser();
  }

  private setUser(user: User): void {
    this.user = user;
  }

  private setEmptyUser(): void {
    this.user = new User();
  }

  loadUser(id: number): void {
    if (+id) {
      const postfix = 'User';
      this.startLoader(postfix);
      this.service.getUser(id).then((user: User) => {
        this.stopLoader(postfix);
        this.setUser(user);
      }).catch(() => this.stopLoader(postfix));
    } else {
      this.setEmptyUser();
    }
  }
}
