/*
 * Copyright (c) 2017. 
 *
 * @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import {Injectable} from '@angular/core';
import {Headers, Http} from "@angular/http";
import {User} from "./user";

@Injectable()
export class UsersService {

  private headers = new Headers({'Content-Type': 'application/json'});
  private doctorUrl = 'director/users';  // URL to web api

  constructor(private http: Http) { }

  getUsers(): Promise<User[]> {

    return this.http.get(this.doctorUrl)
        .toPromise()
        .then(response => response.json().data as User[])
        .catch(this.handleError);
  }


  getUser(id: number): Promise<User> {
    const url = `${this.doctorUrl}/${id}`;
    return this.http.get(url)
        .toPromise()
        .then(response => response.json().data as User)
        .catch(this.handleError);
  }

  delete(id: number): Promise<void> {
    const url = `${this.doctorUrl}/${id}`;
    return this.http.delete(url, {headers: this.headers})
        .toPromise()
        .then(() => null)
        .catch(this.handleError);
  }

  create(user: User): Promise<User> {
    return this.http
        .post(this.doctorUrl, JSON.stringify(user), {headers: this.headers})
        .toPromise()
        .then(res => res.json().data)
        .catch(this.handleError);
  }

  update(user: User): Promise<User> {
    const url = `${this.doctorUrl}/${user.id}`;
    return this.http
        .put(url, JSON.stringify(user), {headers: this.headers})
        .toPromise()
        .then(() => user)
        .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }
}
