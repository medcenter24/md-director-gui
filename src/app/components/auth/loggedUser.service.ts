/*
 * Copyright (c) 2017.
 *
 * @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';
import { User } from '../users/user';

@Injectable()
export class LoggedUserService extends HttpService {

  protected getPrefix(): string {
    return 'user';
  }

  getUser(): Promise <User> {
    return this.get()
      .then(response => response.json().data as User);
  }
}
