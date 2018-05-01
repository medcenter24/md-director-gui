/*
 * Copyright (c) 2017.
 *
 * @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import { Component, Input, ViewChild, Output, EventEmitter, OnInit } from '@angular/core';
import { User } from '../user';
import { UsersService } from '../users.service';
import { UserSelectorComponent } from '../selector';
import { LoadableComponent } from '../../core/components/componentLoader/LoadableComponent';

@Component({
  selector: 'nga-user-editor',
  templateUrl: './user.editor.html',
})
export class UserEditorComponent extends LoadableComponent implements OnInit {

  protected componentName: string = 'UserEditorComponent';

  user: User;

  @Input()
  set userId(id: number) {
    this.loadUser(id);
  }

  @Output() changedUser: EventEmitter<null> = new EventEmitter<null>();

  @ViewChild(UserSelectorComponent)
  private userSelectorComponent: UserSelectorComponent;

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
      // todo this.userSelectorComponent.reloadWithUserId(user.id);
      this.user = user;
      this.changedUser.emit();
    }).catch(() => this.stopLoader(postfix));
  }

  onUserChanged(userId): void {
    this.loadUser(userId);
  }

  onUserCreated(): void {
    this.setEmptyUser();
  }

  private setEmptyUser(): void {
    this.user = new User();
  }

  private loadUser(id: number): void {
    if (+id) {
      const postfix = 'User';
      this.startLoader(postfix);
      this.service.getUser(id).then((user) => {
        this.user = user;
      }).catch(() => this.stopLoader(postfix));
    } else {
      this.setEmptyUser();
    }
  }
}
