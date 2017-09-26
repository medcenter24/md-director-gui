/*
 * Copyright (c) 2017.
 *
 * @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import { Level } from 'angular2-logger/core';
export const environment = {
  production: true,
  // prod
  apiHost: 'http://api.medical.company.dhv24.com',
  // test preprod nginx
  // apiHost: 'http://mydoctors24.api.loc',
  logger: {
    level: Level.WARN,
  },
};
