/*
 * Copyright (c) 2017.
 *
 * @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';
import { saveAs } from 'file-saver';
import {RequestOptions, ResponseContentType} from "@angular/http";
@Injectable()
export class ExporterService extends HttpService {

  protected getPrefix(): string {
    return 'director/export';
  }

  public form1(params: Object): void {
    /*$http({
      method: 'POST',
      url: '/api/v1/download',
      dataType: 'json',
      data: {
        data:data
      },
      responseType: 'arraybuffer',
      headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    }).success(function (data) {
      var blob = new Blob([data], {type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"});

      saveAs(blob, title + ".xlsx");
    }).error(function (data) {
      console.log("failed");
    });*/
    const options = new RequestOptions({ responseType: ResponseContentType.Blob, headers: this.getAuthHeaders() });
    this.http
      .post(this.getUrl('form1'), JSON.stringify(params), options)
      .map(res => res.blob())
      .subscribe(data => saveAs(data, 'Form1CasesExport.xlsx'), err => this.handleError(err));
      /*.then(response => {
        const mediaType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
        const filename = 'test.xlsx';
        saveAs(new Blob([response], { type: mediaType }), filename);
      })
      .catch(error => this.handleError(error));*/
  }
}
