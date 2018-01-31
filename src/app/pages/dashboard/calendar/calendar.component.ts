import { Component, OnInit } from '@angular/core';
import { CalendarService } from './calendar.service';
import * as jQuery from 'jquery';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'nga-calendar',
  templateUrl: './calendar.html',
  styleUrls: ['./calendar.scss'],
})
export class CalendarComponent implements OnInit {

  calendarConfiguration: any = false;
  private _calendar: Object;

  constructor(private _calendarService: CalendarService, private _translateService: TranslateService) {
  }

  ngOnInit() {
    this._translateService.get('Today').subscribe(() => {
      this.calendarConfiguration = {
        buttonIcons: {
          prev: 'left-single-arrow',
          next: 'right-single-arrow',
          prevYear: 'left-double-arrow',
          nextYear: 'right-double-arrow',
        },
        buttonText: {
          today: this._translateService.instant('Today'),
          month: this._translateService.instant('Month'),
          week: this._translateService.instant('Week'),
          day: this._translateService.instant('Day'),
        },
        header: {
          left: 'prevYear,prev,next,nextYear today',
          center: 'title',
          right: 'month,agendaWeek,agendaDay',
        },
        locale: this._translateService.currentLang,
        defaultDate: new Date(),
        selectable: true,
        selectHelper: true,
        editable: false,
        eventLimit: false,
        events: (start, end, timezone, callback) => {
          this._calendarService
            .loadEvents(start, end)
            .then(events => {
              callback(events);
            });
        },
      };
    });

    // jQuery(this._calendar).fullCalendar( { events: this._calendarService.getUrl() });

    // this._calendarService.loadCalendar('').then(config => {
      // console.log(config)
      // this.calendarConfiguration = this._calendarService.getData();
      // this.calendarConfiguration.select = (start, end) => this._onSelect(start, end);
    // }).catch();
  }

  onCalendarReady(calendar): void {
    this._calendar = calendar;
  }

  private _onSelect(start, end): void {

    if (this._calendar !== null) {
      const title = prompt('Event Title:');
      let eventData;
      if (title) {
        eventData = { title, start, end };
        jQuery(this._calendar).fullCalendar('renderEvent', eventData, true);
      }
      jQuery(this._calendar).fullCalendar('unselect');
    }
  }
}
