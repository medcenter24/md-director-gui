/*
 * Copyright (c) 2017.
 *
 * @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import {Injectable} from '@angular/core';

@Injectable()
export class DiagnosticsService {

  DiagnosticsData = [
    {
      id: 1,
      title: 'Mark',
      description: 'Otto'
    },
    {
      id: 2,
      title: 'Mark',
      description: 'Otto'
    },
    {
      id: 3,
      title: 'Mark',
      description: 'Otto'
    },
    {
      id: 4,
      title: 'Mark',
      description: 'Otto'
    },
    {
      id: 5,
      title: 'Mark',
      description: 'Otto'
    },
    {
      id: 6,
      title: 'Mark',
      description: 'Otto'
    },
    {
      id: 7,
      title: 'Mark',
      description: 'Otto'
    },
    {
      id: 8,
      title: 'Mark',
      description: 'Otto'
    },
    {
      id: 9,
      title: 'Mark',
      description: 'Otto'
    },
    {
      id: 10,
      title: 'Mark',
      description: 'Otto'
    }
  ];



  getData(): Promise<any> {
    return new Promise((resolve, reject) => {
      // todo check if dev than return fake else return by url
        resolve(this.DiagnosticsData);
    });
  }
}
