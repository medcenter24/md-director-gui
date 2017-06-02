/*
 * Copyright (c) 2017. 
 *
 * @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import {Injectable} from '@angular/core';
import {AccidentType} from "./type";
import { HttpService } from '../../../http/http.service';

@Injectable()
export class AccidentTypesService extends HttpService {

  protected getPrefix(): string {
    return 'director/types';
  }
  
  getTypes(): Promise<AccidentType[]> {
    return this.http.get(this.getUrl(), {headers: this.getAuthHeaders()})
        .toPromise()
        .then(response => response.json().data as AccidentType[])
        .catch(this.handleError);
  }


  getType(id: number): Promise<AccidentType> {
    const url = `${this.getUrl()}/${id}`;
    return this.http.get(url, {headers: this.getAuthHeaders()})
        .toPromise()
        .then(response => response.json().data as AccidentType)
        .catch(this.handleError);
  }

  delete(id: number): Promise<void> {
    const url = `${this.getUrl()}/${id}`;
    return this.http.delete(url, {headers: this.getAuthHeaders()})
        .toPromise()
        .then(() => null)
        .catch(this.handleError);
  }

  create(type: AccidentType): Promise<AccidentType> {
    return this.http
        .post(this.getUrl(), JSON.stringify(type), {headers: this.getAuthHeaders()})
        .toPromise()
        .then(res => res.json().data)
        .catch(this.handleError);
  }

  update(type: AccidentType): Promise<AccidentType> {
    const url = `${this.getUrl()}/${type.id}`;
    return this.http
        .put(url, JSON.stringify(type), {headers: this.getAuthHeaders()})
        .toPromise()
        .then(() => type)
        .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }
}
