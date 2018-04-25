/*
 * Copyright (c) 2017.
 *
 * @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import { Component, Input, ViewChild, Output, EventEmitter, OnInit } from '@angular/core';
import { User } from '../user';
import { UsersService } from '../users.service';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { UserSelectorComponent } from '../selector';
@Component({
  selector: 'nga-user-editor',
  templateUrl: './user.editor.html',
})
export class UserEditorComponent implements OnInit {

  user: User;

  @Input()
  set userId(id: number) {
    this.loadUser(id);
  }

  @Output() changedUser: EventEmitter<null> = new EventEmitter<null>();

  @ViewChild(UserSelectorComponent)
  private userSelectorComponent: UserSelectorComponent;

  constructor(private service: UsersService,
              private loadingBar: SlimLoadingBarService) {
  }

  ngOnInit(): void {
    this.setEmptyUser();
  }

  onSubmit(): void {
    this.loadingBar.start();
    if (this.user.id) {
      this.service.update(this.user).then((user: User) => {
        this.loadingBar.complete();
        this.user = this.userSelectorComponent.reload(user);
        this.changedUser.emit();
      }).catch(() => {
        this.loadingBar.complete();
      });
    } else {
      this.service.create(this.user).then((user: User) => {
        this.loadingBar.complete();
        this.user = this.userSelectorComponent.reload(user);
        this.changedUser.emit();
      }).catch(() => {
        this.loadingBar.complete();
      });
    }
  }

  onUserChanged(userId): void {
    this.loadUser(userId);
  }

  onUserCreated(): void {
    this.setEmptyUser();
  }

  onSelectorLoaded(): void {
    this.loadingBar.complete();
  }

  onSelectorLoading(): void {
    this.loadingBar.start();
  }

  private setEmptyUser(): void {
    this.user = new User(0, '', '', '');
  }

  private loadUser(id: number): void {
    if (+id) {
      this.loadingBar.start();
      this.service.getUser(id).then((user) => {
        this.user = user;
        this.loadingBar.complete();
      }).catch(() => {
        this.loadingBar.complete();
      });
    } else {
      this.setEmptyUser();
    }
  }
}
