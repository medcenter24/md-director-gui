import { Injectable } from '@angular/core';
import { BaThemeConfigProvider } from '../../../theme';

@Injectable()
export class CalendarService {

  constructor(private _baConfig: BaThemeConfigProvider) {
  }

  getData() {
    const dashboardColors = this._baConfig.get().colors.dashboard;
    return {
      buttonIcons: {
        prev: 'left-single-arrow',
        next: 'right-single-arrow',
        prevYear: 'left-double-arrow',
        nextYear: 'right-double-arrow',
      },
      buttonText: {
        today: 'Today',
        month: 'Month',
        week: 'Week',
        day: 'Day',
      },
      header: {
        left: 'prevYear,prev,next,nextYear today',
        center: 'title',
        right: 'month,agendaWeek,agendaDay',
      },
      locale: 'ru',
      defaultDate: '2016-03-08',
      selectable: true,
      selectHelper: true,
      editable: false,
      eventLimit: false,
      events: [
        {
          title: 'All Day Event',
          start: '2016-03-01',
          color: dashboardColors.silverTree,
        },
        {
          title: 'Long Event',
          start: '2016-03-07',
          end: '2016-03-10',
          color: dashboardColors.blueStone,
        },
        {
          title: 'Dinner',
          start: '2016-03-14T20:00:00',
          color: dashboardColors.surfieGreen,
        },
        {
          title: 'Birthday Party',
          start: '2016-04-01T07:00:00',
          color: dashboardColors.gossip,
        },
      ],
    };
  }
}
