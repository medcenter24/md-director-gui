/*
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU General Public License
 * as published by the Free Software Foundation; under version 2
 * of the License (non-upgradable).
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
 *
 * Copyright (c) 2019 (original work) MedCenter24.com;
 */

import { Component } from '@angular/core';
import { NGXLogger, NgxLoggerLevel } from 'ngx-logger';

@Component( {
  selector: 'nga-logger-component',
  // we can even show logs somewhere on page or in the tooltip
  template: ``,
})
export class LoggerComponent {

  level: string;

  constructor (private logger: NGXLogger) {
  }

  debug(message: string): void {
    this.logger.debug(message);
  }

  error(message: string): void {
    this.logger.error(message);
  }

  warn(message: string): void {
    this.logger.warn(message);
  }

  fatal(m: string): void {
    this.logger.fatal(m);
  }

  info(m: string): void {
    this.logger.info(m);
  }

  setLevel(l: string): void {
    this.logger.updateConfig({ level: l === 'debug' ? NgxLoggerLevel.DEBUG : NgxLoggerLevel.ERROR });
  }
}
