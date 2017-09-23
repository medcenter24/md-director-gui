/*
 * Copyright (c) 2017.
 *
 * @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import { Level } from 'angular2-logger/core';
export const environment = {
  production: true,
  apiHost: 'http://medical.company.dhv24.com/api',
  logger: {
    level: Level.WARN,
  },
};
