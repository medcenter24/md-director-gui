import { Component, OnInit } from '@angular/core';
import { TrafficChartData } from '../../components/statistics/trafficChart/trafficChart.data';
import { LoadingComponent } from '../../components/core/components/componentLoader';
import { StatisticsService } from '../../components/statistics/statistics.service';
import { Logger } from 'angular2-logger/core';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { GlobalState } from '../../global.state';

@Component({
  selector: 'nga-dashboard',
  styleUrls: ['./dashboard.scss'],
  templateUrl: './dashboard.html',
})
export class DashboardComponent extends LoadingComponent implements OnInit {

  protected componentName: string = 'DashboardComponent';

  doctorActivities: TrafficChartData[] = [];
  assistantActivities: TrafficChartData[] = [];
  /**
   * if we need to hide all dashboard items
   * for example on the first loading
   * @type {boolean}
   */
  hidden: boolean = true;

  constructor(
    private _statService: StatisticsService,
    protected _logger: Logger,
    protected loadingBar: SlimLoadingBarService,
    protected _state: GlobalState,
  ) {
    super();
  }

  ngOnInit(): void {
    this.loadDoctorsTraffic();
    this.loadAssistantTraffic();
  }

  protected onComponentsLoadingCompleted(): void {
    this.hidden = false;
  }

  private loadDoctorsTraffic(): void {
    const loadingName = 'LoadingDoctorsTraffic';
    this.startLoader(loadingName);
    this._statService.loadDoctorsTraffic().then(
      (trafficData: TrafficChartData[]) => {
        this.stopLoader(loadingName);
        this.doctorActivities = trafficData;
      }).catch(() => this.stopLoader(loadingName));
  }

  private loadAssistantTraffic(): void {
    const loadingName = 'LoadingAssistantsTraffic';
    this.startLoader(loadingName);
    this._statService.loadAssistantsTraffic().then(
      (trafficData: TrafficChartData[]) => {
        this.stopLoader(loadingName);
        this.assistantActivities = trafficData;
      }).catch(() => this.stopLoader(loadingName));
  }

}
