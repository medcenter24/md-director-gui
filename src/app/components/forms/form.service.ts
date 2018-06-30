/*
 * Copyright (c) 2018.
 *
 * @author Zagovorychev Olexandr <zagovorichev@gmail.com>
 */

import { Injectable } from '@angular/core';
import { HttpService } from '../core/http/http.service';
import { LoadableServiceInterface } from '../core/loadable';
import { Form } from './form';

@Injectable()
export class FormService extends HttpService implements LoadableServiceInterface {
  protected getPrefix(): string {
    return 'director/forms';
  }

  getForm(id: number): Promise<Form> {
    return this.get(id).then(response => response.data as Form);
  }

  save (form: Form): Promise<Form> {
    const action = form.id ? this.put(form.id, form) : this.store(form);
    return action.then(response => response.data as Form);
  }

  destroy (form: Form): Promise<any> {
    return this.remove(form);
  }
}
