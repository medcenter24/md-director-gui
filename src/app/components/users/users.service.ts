/*
 * Copyright (c) 2017. 
 *
 * @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import {Injectable} from '@angular/core';
import {Headers, Http} from "@angular/http";
import {User} from "./user";
import { HttpService } from '../http/http.service';

@Injectable()
export class UsersService extends HttpService {

  protected getPrefix (): string {
    return 'director/users';
  }
  getUsers(): Promise<User[]> {

    return this.http.get(this.getUrl(), {headers: this.getAuthHeaders()})
        .toPromise()
        .then(response => response.json().data as User[])
        .catch(this.handleError);
  }


  getUser(id: number): Promise<User> {
    const url = `${this.getUrl()}/${id}`;
    return this.http.get(url, {headers: this.getAuthHeaders()})
        .toPromise()
        .then(response => response.json().data as User)
        .catch(this.handleError);
  }

  delete(id: number): Promise<void> {
    const url = `${this.getUrl()}/${id}`;
    return this.http.delete(url, {headers: this.getAuthHeaders()})
        .toPromise()
        .then(() => null)
        .catch(this.handleError);
  }

  create(user: User): Promise<User> {
    return this.http
        .post(this.getUrl(), JSON.stringify(user), {headers: this.getAuthHeaders()})
        .toPromise()
        .then(res => res.json() as User)
        .catch(this.handleError);
  }

  update(user: User): Promise<User> {
    const url = `${this.getUrl()}/${user.id}`;
    return this.http
        .put(url, JSON.stringify(user), {headers: this.getAuthHeaders()})
        .toPromise()
        .then(() => user)
        .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }
}
