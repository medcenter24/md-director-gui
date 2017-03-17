/*
 * Copyright (c) 2017.
 *
 * @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import {Component, Input, ViewChild, Output, EventEmitter} from "@angular/core";
import {User} from "../user";
import {UsersService} from "../users.service";
import {SlimLoadingBarComponent} from "ng2-slim-loading-bar";
import {UserSelectorComponent} from "../selector/selector.component";
@Component({
    selector: 'user-editor',
    templateUrl: './editor.html',
})
export class UserEditorComponent {

    user: User;

    @Input()
    set userId(id: number) {
        this.loadUser(id);
    }

    @Output() changedUser: EventEmitter<null> = new EventEmitter<null>();

    @ViewChild('loadingBarUserEditor')
        private loadingBar: SlimLoadingBarComponent;

    @ViewChild(UserSelectorComponent)
        private userSelectorComponent: UserSelectorComponent;

    constructor (private service: UsersService) {};

    ngOnInit(): void {
        this.setEmptyUser();
    }

    startLoading(): void {
        this.loadingBar.color = '#209e91';
        this.loadingBar.show = true;
        this.loadingBar.service.reset();
        this.loadingBar.service.start();
    }

    completeLoading(): void {
        this.loadingBar.service.complete();
        this.loadingBar.show = false;
    }

    errorLoading(): void {
        this.loadingBar.color = '#f89711';
    }

    onSubmit(): void {
        this.startLoading();

        if (this.user.id) {
            this.service.update(this.user).then((user: User) => {
                this.completeLoading();
                this.user = this.userSelectorComponent.reload(user);
                this.changedUser.emit();
            }).catch(() => {
                this.errorLoading();
                this.completeLoading();
            });
        } else {
            this.service.create(this.user).then((user: User) => {
                this.completeLoading();
                this.user = this.userSelectorComponent.reload(user);
                this.changedUser.emit();
            }).catch(() => {
                this.errorLoading();
                this.completeLoading();
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
        this.completeLoading();
    }

    onSelectorLoading(): void {
        this.startLoading();
    }

    private setEmptyUser(): void {
        this.user = new User(0, '', '', '');
    }

    private loadUser(id: number): void {
        if (id) {
            this.startLoading();
            this.service.getUser(id).then((user) => {
                this.user = user;
                this.completeLoading();
            }).catch(() => {
                this.errorLoading();
                this.completeLoading();
            });
        }
    }
}
