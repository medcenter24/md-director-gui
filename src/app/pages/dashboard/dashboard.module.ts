import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';

import { DashboardComponent } from './dashboard.component';
import { routing } from './dashboard.routing';

import { PopularApp } from './popularApp';
import { PieChart } from './pieChart';
import { TrafficChart } from './trafficChart';
import { Feed } from './feed';
import { Todo } from './todo';
import { CalendarComponent } from './calendar';
import { CalendarService } from './calendar/calendar.service';
import { FeedService } from './feed/feed.service';
import { PieChartService } from './pieChart/pieChart.service';
import { TodoService } from './todo/todo.service';
import { TrafficChartService } from './trafficChart/trafficChart.service';
import { AppTranslationModule } from '../../app.translation.module';
import { StatusColorMapService } from '../../components/accident/components/status/colormap.service';

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
    TrafficChart,
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
    TrafficChartService,
    StatusColorMapService,
  ],
})
export class DashboardModule {}
