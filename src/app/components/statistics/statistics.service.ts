/*
 * Copyright (c) 2018.
 *
 * @author Zagovorychev Olexandr <zagovorichev@gmail.com>
 */

/*
 * Copyright (c) 2018.
 *
 * @author Zagovorychev Olexandr <zagovorichev@gmail.com>
 */

import { Injectable } from '@angular/core';
import { TrafficChartData } from './trafficChart/trafficChart.data';
import { HttpService } from '../http/http.service';

@Injectable()
export class StatisticsService extends HttpService {

  protected getPrefix (): string {
    return 'director/statistics';
  }

  /**
   * @returns {Promise<any>}
   */
  loadDoctorsTraffic(year: string = ''): Promise<TrafficChartData[]> {
    return this.get('doctorsTraffic', `year=${year}`)
      .then(response => response.json().data as TrafficChartData[]);
  }

  loadAssistantsTraffic(year: string = ''): Promise<TrafficChartData[]> {
    return this.get('assistantsTraffic', `year=${year}`)
      .then(response => response.json().data as TrafficChartData[]);
  }
}
