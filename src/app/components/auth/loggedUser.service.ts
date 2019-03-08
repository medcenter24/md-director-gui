/*
 * Copyright (c) 2017.
 *
 * @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import { Injectable } from '@angular/core';
import { HttpService } from '../core/http/http.service';
import { User } from '../users/user';
import { Company } from '../company/company';

@Injectable()
export class LoggedUserService extends HttpService {

  protected getPrefix(): string {
    return 'user';
  }

  getUser(): Promise <User> {
    return this.get()
      .then(response => response.data as User);
  }

  getCompany(): Promise <Company> {
    return this.get('company')
        .then(response => response.data as Company);
  }
}
