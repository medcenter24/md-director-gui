/*
 * Copyright (c) 2018.
 *
 * @author Zagovorychev Olexandr <zagovorichev@gmail.com>
 */

import { Injectable } from '@angular/core';
import { HttpService } from '../../../components/http/http.service';
import { TrafficChartData } from './trafficChart.data';

@Injectable()
export class TrafficChartService extends HttpService {

  protected getPrefix (): string {
    return 'director/statistics/traffic';
  }

  /**
   * @returns {Promise<any>}
   */
  loadStatistic(year: string = ''): Promise<TrafficChartData[]> {
    return this.get(null, `year=${year}`)
      .then(response => response.json().data as TrafficChartData[]);
  }
}
