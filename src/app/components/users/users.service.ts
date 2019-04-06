/*
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU General Public License
 * as published by the Free Software Foundation; under version 2
 * of the License (non-upgradable).
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
 *
 * Copyright (c) 2019 (original work) MedCenter24.com;
 */

import { Injectable } from '@angular/core';
import { User } from './user';
import { HttpService } from '../core/http/http.service';

@Injectable()
export class UsersService extends HttpService {

  protected getPrefix (): string {
    return 'director/users';
  }

  getUsers(): Promise<User[]> {
    return this.get().then(response => response.data as User[]);
  }

  getUser(id: number): Promise<User> {
    return this.get(id).then(response => response.data as User);
  }

  delete(id: number): Promise<void> {
    return this.remove(id);
  }

  create(user: User): Promise<User> {
    return this.store(user).then(res => res as User);
  }

  update(user: User): Promise<User> {
    return this.put(user.id, user).then(res => res.data as User);
  }

  deletePhoto(userId: number): Promise<void> {
      return this.remove(`${userId}/photo`);
  }
}
