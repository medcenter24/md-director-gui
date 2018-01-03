/*
 * Copyright (c) 2017. 
 *
 * @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import { Injectable } from '@angular/core';
import { User } from './user';
import { HttpService } from '../http/http.service';

@Injectable()
export class UsersService extends HttpService {

  protected getPrefix (): string {
    return 'director/users';
  }

  getUsers(): Promise<User[]> {
    return this.get().then(response => response.json().data as User[]);
  }

  getUser(id: number): Promise<User> {
    return this.get(id).then(response => response.json().data as User);
  }

  delete(id: number): Promise<void> {
    return this.remove(id);
  }

  create(user: User): Promise<User> {
    return this.store(user).then(res => res.json() as User);
  }

  update(user: User): Promise<User> {
    return this.put(user.id, user);
  }

  deletePhoto(userId: number): Promise<void> {
      return this.remove(`${userId}/photo`);
  }
}
