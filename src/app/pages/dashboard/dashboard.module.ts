import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';

import { DashboardComponent } from './dashboard.component';
import { routing } from './dashboard.routing';

import { PopularApp } from './popularApp';
import { PieChart } from './pieChart';
import { Feed } from './feed';
import { Todo } from './todo';
import { CalendarComponent } from './calendar';
import { CalendarService } from './calendar/calendar.service';
import { FeedService } from './feed/feed.service';
import { PieChartService } from './pieChart/pieChart.service';
import { TodoService } from './todo/todo.service';
import { AppTranslationModule } from '../../app.translation.module';
import { StatusColorMapService } from '../../components/accident/components/status/colormap.service';
import { TrafficChartComponent } from '../../components/statistics/trafficChart';
import { StatisticsService } from '../../components/statistics/statistics.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgaModule,
    routing,
    AppTranslationModule,
  ],
  declarations: [
    PopularApp,
    PieChart,
    TrafficChartComponent,
    Feed,
    Todo,
    CalendarComponent,
    DashboardComponent,
  ],
  providers: [
    CalendarService,
    FeedService,
    PieChartService,
    TodoService,
    StatusColorMapService,
    StatisticsService,
  ],
})
export class DashboardModule {}
