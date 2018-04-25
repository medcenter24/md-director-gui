/*
 * Copyright (c) 2017.
 *
 * @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { User } from '../user';
import { UsersService } from '../users.service';
import * as _ from 'lodash';

@Component({
    selector: 'nga-user-selector',
    template: `
        <select class="form-control" name="user" [(ngModel)]="user" (ngModelChange)="modelChanged($event)">
            <option [ngValue]="_user" *ngFor="let _user of users">{{ _user.name }}</option>
        </select>
    `,
})
export class UserSelectorComponent implements OnInit {

    user: User;

    @Input()
    set userId(id: number) {
        this.user = this.changeUser(id);
    }

    @Output() userChanged: EventEmitter<number> = new EventEmitter<number>();
    @Output() loading: EventEmitter<any> = new EventEmitter<any>();
    @Output() loaded: EventEmitter<any> = new EventEmitter<any>();

    users: User[] = [];

    constructor(private service: UsersService) {
    }

    ngOnInit(): void {
        this.reload(this.user);
    }

    changeUser(id): User {
        let changed = false;
        _.forEach(this.users, (cat) => {
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

    reload(user: User): User {
        this.loading.emit();
        this.service.getUsers().then((data: User[]) => {
            this.users = [];
            this.users.push(new User());
            data.map(_user => {
                this.users.push(_user);
            });

            if (!this.user) {
                if ((!user || !user.id) && this.users.length) {
                    this.user = this.users[0];
                } else {
                    this.user = this.changeUser(user.id);
                }
            } else {
                this.user = this.changeUser(this.user.id);
            }
            this.loaded.emit();
        });

         return this.user;
    }

    reloadWithUserId(id: number): void {
        const user = this.users.filter(_user => +_user.id === +id);
        this.reload(user[0]);
    }

    modelChanged(user): void {
        if (!user) {
            user = new User();
        }

        this.userChanged.emit(user.id);
    }
}
