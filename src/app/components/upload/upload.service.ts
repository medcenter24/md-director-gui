/*
 * Copyright (c) 2017
 *
 *  @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import {Injectable} from '@angular/core';
import { HttpService } from '../http/http.service';

@Injectable()
export class UploadService extends HttpService {

  protected getPrefix(): string {
    return 'director/uploads';
  }

  /**
   * To using in the separate page with uploaded files
   * @returns {Promise<any|TResult2|TResult1>}
   */
  getUploaded(): Promise<any> {

    return this.http.get(this.getUrl(), {headers: this.getAuthHeaders()})
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  /**
   * Delete uploaded files
   * @param id
   * @returns {Promise<any|TResult2|TResult1>}
   */
  deleteFile(id: number): Promise<void> {
    let url = `${this.getUrl()}/${id}`;
    return this.http.delete(url, {headers: this.getAuthHeaders()})
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }
}
