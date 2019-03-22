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

import {
    Component,
    ViewChild,
    Input,
    Output,
    ElementRef,
    EventEmitter
} from '@angular/core';

import * as Chartist from 'chartist';

@Component({
  selector: 'ba-chartist-chart',
  templateUrl: './baChartistChart.html',
  providers: [],
})
export class BaChartistChart {

  @Input() baChartistChartType:string;
  @Input() baChartistChartData:Object;
  @Input() baChartistChartOptions:Object;
  @Input() baChartistChartResponsive:Object;
  @Input() baChartistChartClass:string;
  @Output() onChartReady = new EventEmitter<any>();

  @ViewChild('baChartistChart') public _selector: ElementRef;

  private chart;

  ngAfterViewInit() {
    this.chart = new Chartist[this.baChartistChartType](this._selector.nativeElement, this.baChartistChartData, this.baChartistChartOptions, this.baChartistChartResponsive);
    this.onChartReady.emit(this.chart);
  }

  ngOnChanges(changes) {
    if (this.chart) {
      (<any>this.chart).update(this.baChartistChartData, this.baChartistChartOptions);
    }
  }

  ngOnDestroy():void {
    if (this.chart) {
      this.chart.detach();
    }
  }
}
