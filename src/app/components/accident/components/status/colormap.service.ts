/*
 * Copyright (c) 2019.
 *
 *  @author Zagovorychev Oleksandr <zagovorichev@gmail.com>
 */

import { Injectable } from '@angular/core';
import { BaThemeConfigProvider } from '../../../../theme';

@Injectable()
export class StatusColorMapService {

  constructor (private _baConfig: BaThemeConfigProvider) {}

  getStatuses(): string[] {
    return [
      'new',
      'assigned',
      'in_progress',
      'sent',
      'sended',
      'paid',
      'closed',
      'reject',
    ];
  }

  getColorByStatus(status: string) {
    let color;
    switch (status) {
      case 'new':
        color = this._baConfig.get().colors.success;
        break;
      case 'in_progress':
        color = this._baConfig.get().colors.info;
        break;
      case 'assigned':
        color = this._baConfig.get().colors.primary;
        break;
      case 'sended':
        color = this._baConfig.get().colors.dashboard.silverTree;
        break;
      case 'sent':
        color = this._baConfig.get().colors.warning;
        break;
      case 'paid':
        color = this._baConfig.get().colors.dashboard.gossip;
        break;
      case 'closed':
        color = this._baConfig.get().colors.borderDark;
        break;
      case 'reject':
        color = this._baConfig.get().colors.danger;
        break;
      default:
        console.warn(`Undefined status ${status}`);
        color = this._baConfig.get().colors.danger;
    }

    return color;
  }
}
