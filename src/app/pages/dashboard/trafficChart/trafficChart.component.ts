import { AfterViewInit, Component } from '@angular/core';

import { TrafficChartService } from './trafficChart.service';
import * as Chart from 'chart.js';

import 'style-loader!./trafficChart.scss';
import { TrafficChartData } from './trafficChart.data';
import { BaThemeConfigProvider } from '../../../theme/theme.configProvider';
import { colorHelper } from '../../../theme/theme.constants';

@Component({
  selector: 'nga-traffic-chart',
  templateUrl: './trafficChart.html',
})

export class TrafficChartComponent implements AfterViewInit {

  doughnutData: Object[];
  total: number = 0;

  constructor (
    private trafficChartService: TrafficChartService,
    private _baConfig: BaThemeConfigProvider,
  ) {
  }

  ngAfterViewInit(): void {
    this.trafficChartService.loadStatistic().then(
      trafficData => {
        this.doughnutData = this.transformTrafficChartData(trafficData);
        this._loadDoughnutCharts();
      });
  }

  private transformTrafficChartData(data: TrafficChartData[]): Object[] {
    this.total = 0;
    data.forEach(row => this.total += row.casesCount);
    const result = [];
    let index = 0;
    data.forEach(row => {
      index++;
      result.push({
        value: row.casesCount,
        color: this.getColor(index),
        highlight: this.getColor(index, 15),
        label: row.doctorName,
        percentage: ((row.casesCount / this.total) * 100).toFixed(2),
        order: 1,
      });
    });
    return result;
  }

  private getColor(pp: number, weight: number = 0) {
    const colors = this._baConfig.get().colors;
    let color = '';
    switch (pp) {
      case 1:
        color = colorHelper.shade(colors.success, weight);
        break;
      case 2:
        color = colorHelper.shade(colors.dashboard.gossip, weight);
        break;
      case 3:
        color = colorHelper.shade(colors.dashboard.silverTree, weight);
        break;
      case 4:
        color = colorHelper.shade(colors.dashboard.surfieGreen, weight);
        break;
      case 5:
        color = colorHelper.shade(colors.dashboard.blueStone, weight);
        break;
      default:
        color = colorHelper.shade(colors.borderDark, weight);
    }
    return color;
  }

  private _loadDoughnutCharts (): void {
    const el = jQuery('.chart-area').get(0) as HTMLCanvasElement;
    new Chart(el.getContext('2d')).Doughnut(this.doughnutData, {
      segmentShowStroke: false,
      percentageInnerCutout: 64,
      responsive: true,
    });
  }
}
